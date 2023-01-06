import { Link as LinkRRD } from 'react-router-dom';
import { Box, Link, Input, Typography } from '@mui/material';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { HiBadgeCheck } from 'react-icons/hi';

import '../styles/signUp.css';

export const SignUp = () => {

    const onSubmit = (event: any) => {
        event.preventDefault();

        console.log('click');
    }

    return (
        <div className='container-page'>
            <Box 
                component='section'
                className='go-to-back-container'
            >
                <LinkRRD to='/'>
                    <Link className='go-to-back-icon'>
                        <AiOutlineArrowLeft />
                    </Link>
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
                        <Box className='container-business-name'>
                            <p className='business-name'>brainon24</p>
                            <HiBadgeCheck className='business-found-icon' />
                        </Box>
                    </Box>

                    <Input 
                        placeholder='Nombre'
                        className='form-input'
                        type='text'
                        autoComplete='off'
                    />
                    <Input 
                        placeholder='Apellidos'
                        className='form-input'
                        type='text'
                        autoComplete='off'
                    />
                    <Input 
                        placeholder='Correo Electrínico'
                        className='form-input'
                        type='email'
                        autoComplete='off'
                    />
                    <Input 
                        placeholder='Contraseña'
                        className='form-input'
                        type='password'
                        autoComplete='off'
                    />
                    <Input 
                        placeholder='Celular'
                        className='form-input'
                        type='number'
                        autoComplete='off'
                    />
                    <Input 
                        placeholder='ID de la empresa para la que trabajas'
                        className='form-input'
                        type='text'
                        autoComplete='off'
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            className='btn-sign-up'
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
