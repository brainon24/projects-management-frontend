import { Link as LinkRRD, Navigate, useNavigate } from 'react-router-dom';
import { Box, Link, Input, Typography } from '@mui/material';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import '../styles/login.css';
import { login_thunk } from '../store/auth/thunks';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import ModalError from '../components/ModalError';
import { useEffect } from 'react';


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
                            component='section'
                            className='go-to-back-container'
                        >
                            <a href='https://brainon24.com/' style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 15
                            }}>
                                <Link className='go-to-back-icon'>
                                    <AiOutlineArrowLeft />
                                </Link>
                                <p style={{
                                    fontSize: 25
                                }}>Inicio</p>
                            </a>
                        </Box>

                        <Box 
                            component='section'
                            className='login-page-container'
                        >
                            <form
                                onSubmit={ onSubmit }
                                className='form-container'
                            >
                                <Box  sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                    <LinkRRD to='/' className='link-back-mobile'>
                                        <AiOutlineArrowLeft />
                                    </LinkRRD>
                                    <h1>Iniciar Sesión</h1>
                                </Box>
                                <Input 
                                    placeholder='Correo Electrínico'
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
