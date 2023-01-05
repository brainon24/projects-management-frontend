import { Link as LinkRRD } from 'react-router-dom';
import { Box, Link, Input, Typography } from '@mui/material';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import '../styles/login.css';


export const Login = () => {

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
                className='login-page-container'
            >
                <form
                    onSubmit={ onSubmit }
                    className='form-container'
                >
                    <h1>Iniciar Sesión</h1>
                    <Input 
                        placeholder='Correo Electrínico'
                        className='form-input'
                        autoComplete='off'
                    />
                    <Input 
                        placeholder='Contraseña'
                        className='form-input'
                        type='password'
                        autoComplete='off'
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            className='btn-login'
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
