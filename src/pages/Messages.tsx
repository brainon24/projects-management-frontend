import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import projectsManagement from '../api/api';
import whatsapp from '../api/whatsapp';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { IoSend } from 'react-icons/io5';
import { MdError } from 'react-icons/md';
import { IoTime } from 'react-icons/io5';
import useFormatDate from '../hooks/useFormatDate';
import { getComplementHours } from '../helpers/dates';
import styles from '../styles/messages.module.css'
import { useSelector } from 'react-redux';

export const Messages = () => {

    const [businesses, setBusinesses] = useState([]);
    const [businessId, setBusinessId] = useState(undefined);
    const [users, setUsers] = useState([]);
    const [customer, setCustomer] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [localMessages, setLocalMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const { user } = useSelector((state: any) => state.auth);

    const { formatDate } = useFormatDate();

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const getBusiness = async () => {
        const { data } = await projectsManagement.get(`/business/findAll`);
        setBusinesses(data)
    }

    const getUsers = async () => {
        const { data } = await projectsManagement.get(`/user/findByBusinessId/${businessId}`);
        setUsers(data)
    }

    const getMessages = async () => {
        const { data } = await projectsManagement.get(`/message/findAll/${customer?.id}`); // customer.id as conversationId
        setMessages(data)
    }

    const postMessage = async (message: any) => {
        const { data } = await whatsapp.post('/send-message', {
            phone: customer?.phone,
            content: message?.content,
            author: user?._id,
            conversationId: customer?.id,
        });
        return data;
    }

    const sendMessage = async () => {
        if (!newMessage.trim() || !customer) return;

        const tempId = 'temp_' + new Date().getTime().toString() + Math.random().toString(36).substring(2);
        const tempMessage = {
            id: tempId,
            tempId: tempId, // ID temporal para tracking
            createdAt: new Date().toISOString(),
            content: newMessage,
            author: user?._id,
            conversationId: customer?.id,
            attachmentType: null,
            attachment: null,
            status: 'sending',
        };

        setLocalMessages([...localMessages, tempMessage]);
        setNewMessage('');

        try {
            const data = await postMessage(tempMessage);
            // Remover mensaje temporal y agregar mensaje real del backend
            setLocalMessages(prev => prev.filter(m => m?.tempId !== tempId));
            setMessages(prevMessages => [...prevMessages, { ...data, status: 'sent' }]);
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            // Marcar mensaje como error
            setLocalMessages(prev => prev.map(m => 
                m?.tempId === tempId ? { ...m, status: 'error' } : m
            ));
        }
    };

    const retryMessage = async (messageTempId: string) => {
        const messageToRetry = localMessages.find(m => m.tempId === messageTempId);
        if (!messageToRetry) return;

        // Actualizar estado a 'sending'
        setLocalMessages(prev => prev.map(m => 
            m.tempId === messageTempId ? { ...m, status: 'sending' } : m
        ));

        try {
            const data = await postMessage(messageToRetry);
            // Remover mensaje temporal y agregar mensaje real del backend
            setLocalMessages(prev => prev.filter(m => m.tempId !== messageTempId));
            setMessages(prevMessages => [...prevMessages, { ...data, status: 'sent' }]);
        } catch (error) {
            console.error('Error al reintentar enviar mensaje:', error);
            // Marcar mensaje como error nuevamente
            setLocalMessages(prev => prev.map(m => 
                m.tempId === messageTempId ? { ...m, status: 'error' } : m
            ));
        }
    };

    const renderImagen = (message: any) => {
        if (message?.attachmentType === 'audio') {
            return <audio src={message?.attachment} controls />
        }
        if (message?.attachmentType === 'video') {
            return <video src={message?.attachment} width={300} height="auto" controls />
        }
        if (message?.attachmentType === 'image') {
            return <img src={message?.attachment} alt='Imagen' width={300} height="auto" />
        }
        if (message?.attachmentType === 'document') {
            return <iframe
                src={message?.attachment}
                title="Documento PDF"
                width="500px"
                height="500px"
            />
        }
    }

    useEffect(() => {
        getBusiness()
    }, [])

    useEffect(() => {
        if (businessId) {
            setCustomer(null)
            setMessages([])
            setLocalMessages([])
            getUsers()
        }
    }, [businessId])

    useEffect(() => {
        if (customer?.id) {
            setMessages([])
            setLocalMessages([])
            getMessages()
        }
    }, [customer])

    const allMessages = [...messages, ...localMessages];

    // Posicionar el scroll abajo ANTES de que se pinte el contenido
    useLayoutEffect(() => {
        if (messages.length > 0 && messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Scroll suave solo para mensajes locales (nuevos mensajes enviados)
    useEffect(() => {
        if (localMessages.length > 0) {
            scrollToBottom();
        }
    }, [localMessages]);

  return (
    <>
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.businessContainer}>
                    {
                        businesses?.map((business: any) => (
                            <div key={business?.id} className={`${styles.text} ${businessId === business?.id && styles.active}`}>
                                <p onClick={() => setBusinessId(business?.id)}>{ business?.businessName }</p>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.userContainer}>
                    {
                        users?.map((userItem: any) => (
                            <div key={userItem?.id} onClick={() => setCustomer(userItem)} className={`${styles.text} ${customer?.id === userItem?.id && styles.active}`}>
                                <p>{ userItem?.fullName }</p>
                                <p>{ userItem?.role }</p>
                            </div>
                        ))
                    }
                </div>
                {customer && (
                    <div className={styles.chatContainer}>
                        <div className={styles.messagesContainer} ref={messagesContainerRef}>
                            {
                                allMessages?.length > 0 ? (
                                    allMessages?.map((message: any) => {
                                        const isSent = message?.author === user?._id;
                                        return (
                                            <div key={message?.id || message?.tempId} className={`${styles.messageWrapper} ${isSent ? styles.messageWrapperSent : styles.messageWrapperReceived}`}>
                                                <div className={`${styles.messageContainer} ${isSent ? styles.messageContainerSent : styles.messageContainerReceived}`}>
                                                    {
                                                        message?.content?.length ? (
                                                            <p className={`${styles.content} ${isSent ? styles.contentSent : styles.contentReceived}`}>
                                                                { message?.content }
                                                            </p>
                                                        ) : null
                                                    }
                                                    <div className={styles.flexContainer}>
                                                        {
                                                            message?.attachmentType && (
                                                                <a href={message?.attachment} download target='_blank' className={styles.iconContainer}>
                                                                    <MdOutlineOpenInNew color='#fff' />
                                                                </a>
                                                            )
                                                        }
                                                        <div>
                                                            { renderImagen(message) }
                                                        </div>
                                                    </div>
                                                    <p
                                                        style={{
                                                            fontWeight: 400,
                                                            fontSize: 13,
                                                            color: 'var(--grayDark)',
                                                            paddingTop: 0,
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                        }}
                                                    >
                                                        { formatDate(message?.createdAt ?? '') } 
                                                        <span> · { getComplementHours(new Date(message?.createdAt ?? '')) }</span>
                                                        {isSent && message?.status && (
                                                            <span style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                                                                {message.status === 'sending' && (
                                                                    <IoTime size={16} color='#8696a0' title='Enviando...' />
                                                                )}
                                                                {message.status === 'error' && (
                                                                    <MdError 
                                                                        size={16}
                                                                        color='#f44336' 
                                                                        title='Error al enviar - Click para reintentar'
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() => retryMessage(message.tempId)}
                                                                    />
                                                                )}
                                                                {message.status === 'sent' || !message.status && null}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className={styles.noMessages}>
                                        <p>No hay mensajes</p>
                                    </div>
                                )
                            }
                            <div ref={messagesEndRef} />
                        </div>
                        <form className={styles.inputContainer} onSubmit={sendMessage}>
                            <input
                                type="text"
                                className={styles.messageInput}
                                placeholder="Escribe un mensaje..."
                                value={newMessage}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setNewMessage(value?.startsWith(' ') ? '' : value);
                                }}
                            />
                            <button 
                                className={styles.sendButton}
                                onClick={sendMessage}
                                disabled={!newMessage.trim()}
                                type='submit'
                            >
                                <IoSend size={20} color='#fff' />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </MainLayout>
    </>
  )
}
