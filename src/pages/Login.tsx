import { useEffect } from 'react';
import { Link as LinkRRD, Navigate, useNavigate } from 'react-router-dom';
import { Box, Link, Input, Typography } from '@mui/material';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { useForm } from '../hooks/useForm';
import { login_thunk } from '../store/auth/thunks';
import ModalError from '../components/ModalError';

import '../styles/login.css';
import gestionImage from '../assets/Gestion-1.png';
import { Icon } from '../components/Icons';


export const Login = () => {

    const navigate = useNavigate();

    const dispatch: Dispatch<any> = useDispatch();
    const { status, errorMessage } = useSelector((state: any) => state.auth);

    const { formState, onInputChange, onResetForm, email, password } = useForm({
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

                        {/* <Box
                            component='section'
                            className='go-to-back-container'
                        >
                            <LinkRRD to='https://brainon24.com/'>
                                <Link className='go-to-back-icon'>
                                    <AiOutlineArrowLeft />
                                </Link>
                            </LinkRRD>
                        </Box> */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            {/* <Box
                                component='section'
                                className='go-to-back-container'
                            >
                                <Link 
                                    component={LinkRRD} 
                                    to="/" 
                                    className='go-to-back-icon'
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                                >
                                    <AiOutlineArrowLeft />
                                    <Typography fontSize={20}>Inicio</Typography>
                                </Link>
                            </Box> */}

                            <div className='go-to-back-icon'>
                                <LinkRRD to='/'>
                                    <Icon name='flecha-derecha' />
                                </LinkRRD>
                            </div>

                            {/* <Box sx={{
                                marginRight: 7
                            }}>
                                <img 
                                    src={ gestionImage } 
                                    alt="Gestion | brainon24" 
                                    style={{
                                      width: 90,
                                      paddingTop: 30
                                    }}
                                />
                            </Box> */}
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
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        className='btn-login'
                                        type='submit'
                                    >
                                        Ingresar
                                    </button>
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
