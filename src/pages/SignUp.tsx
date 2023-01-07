import { useEffect } from 'react';
import { Link as LinkRRD, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { Box, Input, Typography } from '@mui/material';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { HiBadgeCheck } from 'react-icons/hi';

import '../styles/signUp.css';
import { useForm } from '../hooks/useForm';
import { signUp_thunk } from '../store/auth/thunks';
import { findBusinessById_thunk } from '../store/business/thunks';
import { clearErrorBusinessReducer } from '../store/business/businessSlice';
import ModalError from '../components/ModalError';

export const SignUp = () => {

    const navigate = useNavigate();

    const dispatch: Dispatch<any> = useDispatch();
    const { businessName, businessId: businessID, businessErrorMessage } = useSelector((state: any) => state.business);

    const { status, errorMessage } = useSelector((state: any) => state.auth);

    const { formState, onInputChange, onResetForm, name, lastName, email, password, phone, businessId } = useForm({
        name: '',
        lastName: '',
        email: '',
        password: '',
        phone: '', 
        businessId: ''
    });

    const searchBusiness = async () => {
        if( businessId.length < 5 ) return;

        dispatch( findBusinessById_thunk( businessId ) );
    }

    const onSubmit = (event: any) => {
        event.preventDefault();

        if( !name || 
            !lastName ||
            !email ||
            !password ||
            !phone ||
            !businessId ) return;

        onResetForm();
        
        dispatch( signUp_thunk({
            name,
            lastName,
            email,
            password,
            phone,
            businessId
        }) );
    }

    useEffect(() => {
        if( !businessErrorMessage || businessName ) return;

        const timer = setTimeout(() => {
            dispatch( clearErrorBusinessReducer() );
        }, 4500);

        return () => {
            clearTimeout( timer );
        }
    }, [ businessErrorMessage ]);

    useEffect(() => {
        if( status === 'not-authenticated' ) return;

        return navigate('/private', { replace: true }); 
    }, [ status ]);


    return (
        <div className='container-page'>
            {
                errorMessage ? (
                    <ModalError
                        title='Error de Registro'
                        descriptionError={ errorMessage }
                    />
                ) : null
            }
            <Box 
                component='section'
                className='go-to-back-container'
            >
                <LinkRRD to='/' className='go-to-back-icon'>
                    <AiOutlineArrowLeft />
                </LinkRRD>
            </Box>

            <Box 
                component='section'
                className='sign-up-page-container'
            >
                <form
                    onSubmit={ onSubmit }
                    className='form-container'
                >
                    <Box className='container-header-form'>
                        <h1>Registro</h1>
                        {
                            typeof businessName === 'string' 
                                ?   (
                                        <Box className='container-business-name'>
                                            <p className='business-name'>{ businessName.length >= 15 ? businessName.substring(0, 15) + '...' : businessName }</p>
                                            <HiBadgeCheck className='business-found-icon' />
                                        </Box>
                                    ) 
                                : null
                        }
                    </Box>

                    <Input 
                        placeholder='Nombre'
                        className='form-input'
                        type='text'
                        autoComplete='off'
                        name='name'
                        value={ name }
                        onChange={ onInputChange }
                    />
                    <Input 
                        placeholder='Apellidos'
                        className='form-input'
                        type='text'
                        autoComplete='off'
                        name='lastName'
                        value={ lastName }
                        onChange={ onInputChange }
                    />
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
                    <Input 
                        placeholder='ID de la empresa para la que trabajas'
                        className='form-input'
                        type='text'
                        autoComplete='off'
                        name='businessId'
                        value={ businessId ? businessId : businessID }
                        onChange={ onInputChange }
                        onBlur={ searchBusiness }
                        disabled={ businessName }
                    />
                    <Input 
                        placeholder='Celular'
                        className='form-input'
                        type='number'
                        autoComplete='off'
                        name='phone'
                        value={ phone }
                        onChange={ onInputChange }
                    />
                    <Typography sx={{ color: 'red' }}>{ businessErrorMessage ? businessErrorMessage : null }</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            className='btn-sign-up'
                            type='submit'
                            // disabled={}
                        >
                            Registrarme
                        </button>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '2rem 0'}}>
                        <hr style={{ width: '50%', height: '2px', margin: 'auto 0' }} />
                        <Typography sx={{padding: '0 .5rem'}}>O</Typography>
                        <hr style={{ width: '50%', height: '2px', margin: 'auto 0' }} />
                    </Box>
                    
                    <LinkRRD to='/login'>
                        <p className='login-link'>¿Ya tienes cuenta? ¡Inicia sesión!</p>
                    </LinkRRD>
                </form>
            </Box>
        </div>
    );
}
