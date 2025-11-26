import { useEffect, useState } from 'react';
import { Link as Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, Input, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useForm } from '../../../hooks/useForm';
import { Button } from '../../../components/Button';
import '../../../styles/login.css';
import { SuccessModal } from '../../../components/SuccessModal';
import projectsManagement from '../../../api/api';
import ModalError from '../../../components/ModalError';
import { Icon } from '../../../components/Icons';

export const NewPassword = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [isValidatingToken, setIsValidatingToken] = useState(true);
  
    const { status } = useSelector((state: any) => state.auth);

    const { token } = useParams();

    const { onInputChange, onResetForm, password, confirmPassword } = useForm({
        password: '',
        confirmPassword: '',
    });

    const feedback = (message: string, type: "success" | "error") => toast(message, {type, autoClose: 6000});

    const validateToken = async (token: string) => {
        const { data } = await projectsManagement.post('/auth/validateToken', { token });

        if (!data?.valid) {
            setErrorMessage('Token no válido o expirado.');
        }
    }

    const resetPassword = async (token: string, newPassword: string) => {
        await projectsManagement.post('/auth/resetPassword', { token, newPassword });
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();

        if(!password || !confirmPassword) return;

        if(password !== confirmPassword) {
            feedback("Las contraseñas no coinciden.", "error");
            onResetForm();
            return;
        }

        if(!token) {
            setErrorMessage('Token no válido o expirado.');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            await resetPassword(token, password);
            onResetForm();
            setShowSuccess(true);
        } catch (error: any) {
            console.error('Error al restablecer contraseña:', error);
            setErrorMessage(error.response?.data?.message || 'Ocurrió un error al restablecer la contraseña.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if( status === 'not-authenticated' ) return;

        return navigate('/private', { replace: true }); 
    }, [ status ]);

    useEffect(() => {
        const verifyToken = async () => {
            
            if (!token) {
                setErrorMessage('Token no proporcionado. Por favor, verifica el enlace de recuperación.');
                setIsValidatingToken(false);
                return;
            }

            try {
                await validateToken(token);
                setIsValidatingToken(false);
            } catch (error: any) {
                console.error('Error al validar token:', error);
                setErrorMessage(error.response?.data?.message || 'El token no es válido o ha expirado. Por favor, solicita un nuevo enlace de recuperación.');
                setIsValidatingToken(false);
            }
        };

        verifyToken();
    }, [token]);

  return (
    <>
        {
            status === 'authenticated'
            ? <Navigate to='/private' />
            : (
                <div className='container-page'>
                    {
                        showSuccess ? (
                            <SuccessModal
                                textRequestSuccess='Listo, tu contraseña ha sido actualizada exitosamente.'
                                buttonText='Iniciar sesión'
                                onClose={() => navigate('/login')}
                            />
                        ) : null
                    }
                    <Box
                        component='section'
                        className='login-page-container'
                    >
                        {isValidatingToken ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                                <Typography>Estamos trabajando en tú solicitud...</Typography>
                            </Box>
                        ) : errorMessage ? (
                            <Box sx={{ textAlign: 'center', padding: '2rem' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                                    <Icon name='alerta' size={64} color='#f44336' />
                                </Box>
                                <Typography variant="h6" sx={{ marginBottom: 5 }}>Parece que ya expiró el tiempo para restablecer tu contraseña.</Typography>
                                <Button onClick={() => navigate('/login')} style={{padding: '12px 24px'}}>
                                    Iniciar sesión
                                </Button>
                            </Box>
                        ) : (
                            <form
                                onSubmit={ onSubmit }
                                className='form-container'
                            >
                                <h1>Crear nueva contraseña</h1>
                                <Input
                                    placeholder='Nueva Contraseña'
                                    className='form-input'
                                    type='password'
                                    autoComplete='off'
                                    name='password'
                                    value={ password }
                                    onChange={ onInputChange }
                                    style={{ marginTop: 30 }}
                                />
                                <Input
                                    placeholder='Confirmar Contraseña'
                                    className='form-input'
                                    type='password'
                                    autoComplete='off'
                                    name='confirmPassword'
                                    value={ confirmPassword }
                                    onChange={ onInputChange }
                                    style={{ marginTop: 30 }}
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                                    <Button type='submit' style={{width: '100%', padding: '12px 0'}} disabled={isLoading}>
                                        {isLoading ? 'Actualizando...' : 'Crear nueva contraseña'}
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Box>
                </div>
            )
        }
    </>
  )
}
