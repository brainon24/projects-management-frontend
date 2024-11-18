import React, { useEffect, useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import projectsManagement from '../api/api';
import styles from '../styles/messages.module.css'
import { HiOutlineFolderOpen } from 'react-icons/hi';
import { MdOutlineOpenInNew } from 'react-icons/md';
import useFormatDate from '../hooks/useFormatDate';
import { getComplementHours } from '../helpers/dates';

export const Messages = () => {

    const [businesses, setBusinesses] = useState([]);
    const [businessId, setBusinessId] = useState(undefined);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(undefined);
    const [messages, setMessages] = useState([]);

    const { formatDate } = useFormatDate();

    const getBusiness = async () => {
        const { data } = await projectsManagement.get(`/business/findAll`);
        setBusinesses(data)
    }

    const getUsers = async () => {
        const { data } = await projectsManagement.get(`/user/findByBusinessId/${businessId}`);
        setUsers(data)
    }

    const getMessages = async () => {
        const { data } = await projectsManagement.get(`/message/findAll/${userId}`);
        setMessages(data)
    }

    useEffect(() => {
        getBusiness()
    }, [])

    useEffect(() => {
        if (businessId) {
            setUserId(undefined)
            setMessages([])
            getUsers()
        }
    }, [businessId])

    useEffect(() => {
        if (userId) {
            setMessages([])
            getMessages()
        }
    }, [userId])

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
                        users?.map((user: any) => (
                            <div key={user?.id} onClick={() => setUserId(user?.id)} className={`${styles.text} ${userId === user?.id && styles.active}`}>
                                <p>{ user?.fullName }</p>
                                <p>{ user?.role }</p>
                            </div>
                        ))
                    }
                </div>
                {
                    messages?.length > 0 && (
                        <div className={styles.messagesContainer} style={{paddingTop: 20}}>
                            {
                                messages?.map((message: any) => (
                                    <div key={message?.id} className={styles.messageContainer}>
                                        {
                                            message?.content?.length ? <p className={styles.content}>{ message?.content }</p> : null
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
                                                {
                                                    message?.attachmentType === 'mp4' && (
                                                        <video src={message?.attachment} width={300} controls />
                                                    )
                                                }
                                                {
                                                    message?.attachmentType === 'mpeg' && (
                                                        <video src={message?.attachment} width={300} height={40} controls />
                                                    )
                                                }
                                                {
                                                    message?.attachmentType === 'png' || message?.attachmentType === 'jpg' || message?.attachmentType === 'jpeg' && (
                                                        <img src={message?.attachment} alt='Imagen' width={300} />
                                                    )
                                                }
                                                {
                                                    message?.attachmentType === 'mp3' && (
                                                        <audio src={message?.attachment} controls />
                                                    )
                                                }
                                                {
                                                    message?.attachmentType === 'pdf' && (
                                                        <iframe
                                                            src={message?.attachment}
                                                            title="Documento PDF"
                                                            width="500px"
                                                            height="500px"
                                                        />
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <p
                                            style={{
                                                fontWeight: 400,
                                                fontSize: 13,
                                                color: 'var(--grayDark)',
                                                paddingTop: 0,
                                                cursor: 'pointer',
                                                textAlign: 'right',
                                            }}
                                        >
                                            { formatDate(message?.createdAt) } 
                                            <span> · { getComplementHours(new Date(message?.createdAt)) }</span>
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                {
                    userId && !messages?.length ? <p>No hay mensajes</p> : null
                }
            </div>
        </MainLayout>
    </>
  )
}
