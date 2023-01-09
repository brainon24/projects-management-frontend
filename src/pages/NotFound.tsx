import { Box } from '@mui/material';
import logo from '../assets/logo-brainon24.jpeg';
import { Link as LinkRRD } from 'react-router-dom';

import '../styles/notFound.css';

export const NotFound = () => {
    return (
        <Box className='container-not-found-page'>
            <Box>
                <Box className='img-logo'>
                    <img 
                        src={logo} 
                        alt="Logo de brainon24" 
                        width={180}
                    />
                </Box>
                <h1 className='title'>Upss!</h1>
                <p className='text'>Esta página no fue encontrada, haz abajo para volver al home!</p>
                <LinkRRD to='/private' style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='btn-login'>Ir al home</button>
                </LinkRRD>
            </Box>
        </Box>
    )
}
