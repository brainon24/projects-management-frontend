import { useEffect } from 'react';
import { Link as Navigate, useNavigate } from 'react-router-dom';
import { Box, Input } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useForm } from '../../../hooks/useForm';
import { Button } from '../../../components/Button';
import '../../../styles/login.css';
import { SuccessModal } from '../../../components/SuccessModal';

export const NewPassword = () => {
    const navigate = useNavigate();
  
    const { status } = useSelector((state: any) => state.auth);

    const { onInputChange, onResetForm, password, confirmPassword } = useForm({
        password: '',
        confirmPassword: '',
    });

    const feedback = (message: string, type: "success" | "error") => toast(message, {type, autoClose: 6000});

    const onSubmit = (event: any) => {
        event.preventDefault();

        if(
            !password || !confirmPassword
        ) return;

        if(password !== confirmPassword) {
            feedback("Las contraseñas no coinciden.", "error");
            onResetForm();
            return;
        }

        onResetForm();

        // TODO: Call endpoint to send email for password recovery

        navigate('/login');
        // TODO
        // "Listo, tu contraseña ha sido actualizada exitosamente."
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
                    {/* {
                         ? (
                            <SuccessModal
                                textRequestSuccess='Listo, tu contraseña ha sido actualizada exitosamente.'
                                buttonText='Iniciar sesión'
                                onClose={() => navigate('/login')}
                            />
                        ) : null
                    } */}
                    <Box
                        component='section'
                        className='login-page-container'
                    >
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
                                <Button type='submit' style={{width: '100%', padding: '12px 0'}}>
                                    Crear nueva contraseña
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </div>
            )
        }
    </>
  )
}
