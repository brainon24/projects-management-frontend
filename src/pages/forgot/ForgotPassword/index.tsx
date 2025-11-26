import { useEffect, useState } from 'react';
import { Link as LinkRRD, Navigate, useNavigate } from 'react-router-dom';
import { Box, Input, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useForm } from '../../../hooks/useForm';
import { Icon } from '../../../components/Icons';
import { Button } from '../../../components/Button';
import ModalError from '../../../components/ModalError';
import '../../../styles/login.css';
import projectsManagement from '../../../api/api';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
    const { status } = useSelector((state: any) => state.auth);

    const { onInputChange, onResetForm, email } = useForm({
        email: '',
    });

    const successFeedback = () => toast("En un momento recibirás un correo electrónico para recuperar tu contraseña.", {type: "success", autoClose: 6000});

    const forgotPassword = async (email: string) => {
        await projectsManagement.post('/auth/forgotPassword', { email });
    }
  
    const onSubmit = async (event: any) => {
        event.preventDefault();

        if(!email) return;

        setIsLoading(true);
        setErrorMessage('');

        try {
            await forgotPassword(email);
            onResetForm();
            successFeedback();
        } catch (error: any) {
            console.error('Error al enviar correo de recuperación:', error);
            setErrorMessage(error.response?.data?.message || 'Ocurrió un error al enviar el correo de recuperación.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if( status === 'not-authenticated' ) return;

        return navigate('/private', { replace: true }); 
    }, [ status ]);

  return (
    <>
        {
            status === 'authenticated'
            ? <Navigate to='/private' />
            : (
                <div className='container-page'>
                    {
                        errorMessage ? (
                            <ModalError
                                title='Ocurrió un error...'
                                descriptionError={ errorMessage }
                            />
                        ) : null
                    }
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <div className='go-to-back-icon'>
                            <div onClick={ () => navigate(-1) } style={{ cursor: 'pointer' }}>
                                <Icon name='flecha-derecha' />
                            </div>
                        </div>
                    </Box>

                    <Box 
                        component='section'
                        className='login-page-container'
                    >
                        <form
                            onSubmit={ onSubmit }
                            className='form-container'
                        >
                            <h1>Recuperar contraseña</h1>
                            <p>Ingresa el correo electrónico asociado a tu cuenta</p>
                            <Input
                                placeholder='Correo Electrónico'
                                className='form-input'
                                type='email'
                                autoComplete='off'
                                name='email'
                                value={ email }
                                onChange={ onInputChange }
                                style={{ marginTop: 40 }}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                                <Button type='submit' style={{width: '100%', padding: '12px 0'}} disabled={isLoading}>
                                    {isLoading ? 'Enviando...' : 'Recuperar contraseña'}
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '2rem 0'}}>
                                <hr style={{ width: '50%', height: '2px', margin: 'auto 0' }} />
                                <Typography sx={{padding: '0 .5rem'}}>O</Typography>
                                <hr style={{ width: '50%', height: '2px', margin: 'auto 0' }} />
                            </Box>
                            
                            <LinkRRD to='/sign-up'>
                                <p className='sign-up-link'>¿No tienes cuenta? ¡Crea una gratis!</p>
                            </LinkRRD>
                        </form>
                    </Box>
                </div>
            )
        }
    </>
  )
}
