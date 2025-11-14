import { useEffect } from 'react';
import { Link as LinkRRD, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { Box, Chip, Input, Typography } from '@mui/material';
import { HiBadgeCheck } from 'react-icons/hi';

import '../styles/signUp.css';
import { useForm } from '../hooks/useForm';
import { signUp_thunk } from '../store/auth/thunks';
import { findBusinessById_thunk } from '../store/business/thunks';
import { clearErrorBusinessReducer } from '../store/business/businessSlice';
import ModalError from '../components/ModalError';
import { BiErrorCircle } from 'react-icons/bi';
import { Loading100p } from '../components/Loading100p';
import { Icon } from '../components/Icons';
import { Button } from '../components/Button';

export const SignUp = () => {

    const navigate = useNavigate();

    const dispatch: Dispatch<any> = useDispatch();
    const { businessName, businessId: businessID, businessErrorMessage, isLoadingBusiness } = useSelector((state: any) => state.business);

    const { status, errorMessage } = useSelector((state: any) => state.auth);

    const { onInputChange, onResetForm, fullName, email, password, phone, businessId } = useForm({
        fullName: '',
        email: '',
        password: '',
        phone: '', 
        businessId: ''
    });

    const searchBusiness = async () => {
        if( businessId.length <= 8 ) return;

        dispatch( findBusinessById_thunk( businessId ) );
    }

    const onSubmit = (event: any) => {
        event.preventDefault();

        if( !fullName ||
            !email ||
            !password ||
            !phone ||
            !businessId ) return;

        onResetForm();
        
        dispatch( signUp_thunk({
            fullName,
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
        }, 6000);

        return () => {
            clearTimeout( timer );
        }
    }, [ businessErrorMessage ]);

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
                                    title='Error de Registro'
                                    descriptionError={ errorMessage }
                                />
                            ) : null
                        }
                        <div className='go-to-back-icon'>
                            <LinkRRD to='/'>
                                <Icon name='flecha-derecha' />
                            </LinkRRD>
                        </div>

                        <Box 
                            component='section'
                            className='sign-up-page-container'
                        >
                            <form
                                onSubmit={ onSubmit }
                                className='form-container'
                            >
                                <Box className='chip-desktop'>
                                    <Chip
                                        label={ businessErrorMessage }
                                        color='error'
                                        icon={ <BiErrorCircle size={25} />}
                                        className='fadeIn'
                                        sx={{ display: businessErrorMessage ? 'flex' : 'none' }}
                                        style={{ margin: '5px 0', padding: '20px 0' }}
                                    />
                                </Box>

                                <Box className='container-header-form'>
                                    <h1>Registro</h1>
                                    {
                                        isLoadingBusiness ? (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'end'
                                                }}
                                            >
                                                <Loading100p />
                                            </div>
                                        ) : null
                                    }
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
                                    placeholder='Nombre Completo'
                                    className='form-input'
                                    type='text'
                                    autoComplete='off'
                                    name='fullName'
                                    value={ fullName }
                                    onChange={ onInputChange }
                                />                                
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
                                <Box className='chip-mobile'>
                                    <Chip
                                        label={ businessErrorMessage }
                                        color='error'
                                        icon={ <BiErrorCircle size={20} />}
                                        className='fadeIn'
                                        sx={{ display: businessErrorMessage ? 'flex' : 'none' }}
                                        style={{ margin: '0px 0 5px 0', padding: '20px 0' }}
                                    />
                                </Box>
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

                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                                    <Button type='submit' style={{width: '100%', padding: '12px 0'}}>
                                        Registrarme
                                    </Button>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '1.5rem 0'}}>
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
                )
            }
        </>
    );
}
