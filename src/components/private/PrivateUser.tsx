import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { Dispatch } from '@reduxjs/toolkit';
import { logout_thunk } from '../../store/auth/thunks';

import '../styles/privateUser.css';
import accessDenied from '../../assets/access-denied.png'

export const PrivateUser = () => {
    const { user } = useSelector((state: any) => state.auth);

    const dispatch: Dispatch<any> = useDispatch();

    return (
        <Box className='container-private-user-page'>
            <Box>
                <Box sx={{ margin: '0 auto', width: '150px' }}>
                    <img 
                        src={accessDenied} 
                        alt="Logo de brainon24" 
                        width={150}
                    />
                </Box>
                <br />
                <span className='user-name'>Hola, { user.fullName.split(' ')[0]}</span>
                <p className='text-permissions'>Por favor comunicate con el administrador de la App para que te otorgue los permisos y puedas navegar en ella!</p>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <button 
                        className='btn-login'
                        onClick={ () => dispatch( logout_thunk() ) }
                    >
                        Cerrar sesión
                    </button>
                </Box>
            </Box>
        </Box>
    )
}
