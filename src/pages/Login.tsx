import { useEffect } from 'react';
import { Link as LinkRRD, Navigate, useNavigate } from 'react-router-dom';
import { Box, Input, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { useForm } from '../hooks/useForm';
import { login_thunk } from '../store/auth/thunks';
import ModalError from '../components/ModalError';

import '../styles/login.css';
import { Icon } from '../components/Icons';
import { Button } from '../components/Button';


export const Login = () => {

    const navigate = useNavigate();

    const dispatch: Dispatch<any> = useDispatch();
    const { status, errorMessage } = useSelector((state: any) => state.auth);

    const { onInputChange, onResetForm, email, password } = useForm({
        email: '',
        password: '',
    });

    const onSubmit = (event: any) => {
        event.preventDefault();

        if(
            !email ||
            !password
        ) return;

        onResetForm();

        dispatch( login_thunk({
            email,
            password
        }) );
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
                                <LinkRRD to='/'>
                                    <Icon name='flecha-derecha' />
                                </LinkRRD>
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
                                <h1>Iniciar Sesión</h1>
                                <Input 
                                    placeholder='Correo Electrónico'
                                    className='form-input'
                                    type='email'
                                    autoComplete='off'
                                    name='email'
                                    value={ email }
                                    onChange={ onInputChange }
                                />
                                <Input 
                                    placeholder='Contraseña'
                                    className='form-input'
                                    type='password'
                                    autoComplete='off'
                                    name='password'
                                    value={ password }
                                    onChange={ onInputChange }
                                />
                                <LinkRRD to='/forgot-password'>
                                    <p className='sign-up-link'>Olvidaste tu contraseña? ¡Recuperala!</p>
                                </LinkRRD>

                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                                    <Button type='submit' style={{width: '100%', padding: '12px 0'}}>
                                        Ingresar
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
