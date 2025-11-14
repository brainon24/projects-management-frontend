import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link as LinkRRD, } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { closeSidemenu, openModal } from '../store/ui/uiSlice';
import { logout_thunk } from '../store/auth/thunks';
import profilePicture from '../assets/profile-picture.png';

import './styles/sidebar.css';
import { Icon } from './Icons';
import { useMemo } from 'react';

export const Sidebar = () => {

    const { sidemenuOpen } = useSelector((state: any) => state.ui);
    const { user, status } = useSelector((state: any) => state.auth);

    const dispatch: Dispatch<any> = useDispatch();

    const handleBussines = () => {
        dispatch(openModal())
        
        dispatch( closeSidemenu() )
    }

    const options = useMemo(() => {
        const menuItems = [];

        if (status === 'not-authenticated') {
            menuItems.push(
                { text: 'Inicio', icon: <Icon name='home' size={17} />, to: '/' },
                { text: 'Iniciar sesión', icon: <Icon name='lock-02' size={17} />, to: '/login' },
                { text: 'Registrarme', icon: <Icon name='passcode-lock' size={17} />, to: '/sign-up' },
            );
        }

        if (status === 'authenticated') {
            const commonItems = [
                { text: 'Mi panel', icon: <Icon name='lock-02' size={17} />, to: '/private', subheader: user.role },
                { text: 'Mi perfil', icon: <Icon name='usuario-circulo' size={17} />, to: '/private/profile' },
                { text: 'Mi negocio', icon: <Icon name='edificio-02' size={17} />, to: '/private/my-business' },
            ];

            const roleSpecific = {
                CLIENT: [
                    { text: 'Crear proyecto', icon: <Icon name='file-shield-02' size={17} />, to: '/private/create-project' },
                    { text: 'Mis proyectos', icon: <Icon name='puntos' size={17} />, to: '/private/my-projects' },
                    { text: 'Proyectos de mi negocio', icon: <Icon name='archivo' size={17} />, to: '/private/my-business-projects' },
                ],
                ALLY: [
                    { text: 'Mis Proyectos Asignados', icon: <Icon name='puntos' size={17} />, to: '/private/my-projects-asigned' },
                ],
                ADMIN: [
                    { text: 'Crear proyecto', icon: <Icon name='file-shield-02' size={17} />, to: '/private/create-project' },
                    { text: 'Todos los proyectos', icon: <Icon name='puntos' size={17} />, to: '/private/all-projects' },
                    { text: 'Mis proyectos asignados', icon: <Icon name='puntos' size={17} />, to: '/private/my-projects-asigned' },
                    { text: 'Crear negocio', icon: <Icon name='edificio-02' size={17} />, to: '/private/management-business', onClick: handleBussines },
                    { text: 'Gestión Administrativa', icon: <Icon name='users-edit' size={17} />, to: '/private/administrative-managment' },
                    { text: 'Gestionar negocios', icon: <Icon name='edificio-06' size={17} />, to: '/private/management-business' },
                ],
                USER: [],
            };

            menuItems.push(...commonItems);
            if (user?.role && roleSpecific[user.role as keyof typeof roleSpecific]) {
                menuItems.push(...roleSpecific[user.role as keyof typeof roleSpecific]);
            }

            menuItems.push({
                text: 'Cerrar sesión',
                icon: <Icon name='cerrar-sesion' size={17} />,
                to: '/',
                onClick: () => dispatch(logout_thunk()),
            });

            return menuItems;
        }
    }, [user?.role])

    return (
        <Drawer
            open={ sidemenuOpen }
            onClose={ () => dispatch( closeSidemenu() ) }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }} 
        >
            <Box sx={{ width: 250, paddingTop: 1 }}>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <div onClick={ () => dispatch( closeSidemenu() ) }>
                                <Icon name='x' size={15} />
                            </div>
                        </ListItemIcon>
                    </ListItem>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 30, width: '100%', }}>
                        <img src={ profilePicture } alt="Foto de perfil" width={100} style={{ borderRadius: 100}}/>
                    </div>

                    {/* <Divider /> */}

                    {options?.map((item, idx) => (
                        <div key={idx}>
                            {(item as any)?.subheader && <ListSubheader>{(item as any).subheader === 'CLIENT' ? 'Panel de Clientes' : (item as any).subheader === 'ALLY' ? 'Panel de Aliados' : (item as any).subheader === 'ADMIN' ? 'Panel de Administración' : null}</ListSubheader>}
                            <ListItem 
                                className='list-item' 
                                onClick={() =>{
                                    dispatch( closeSidemenu() );
                                    (item as any).onClick?.();
                                }}>
                                <LinkRRD to={item.to} className='link'>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} className={(item as any).subheader ? 'item-text-sidebar' : undefined} />
                                </LinkRRD>
                            </ListItem>
                        </div>
                    ))}

                </List>
                <Box sx={{ position: 'relative', backgroundColor: 'var(--white)', height: '10%', mt: 6 }}>
                    <Box sx={{ bottom: 0, position: 'absolute', width: '100%', backgroundColor: 'var(--white)' }}>
                        <a 
                            href='https://www.linkedin.com/in/david-diaz-herrera-2777ba1a8/' 
                            target='_blank'
                        >
                            <p
                                style={{
                                    textAlign: 'center', fontSize: 16,
                                }}
                            >Desarrollo de brainon24</p>
                            <p 
                                style={{
                                    textAlign: 'center', fontSize: 16, textDecoration: 'underline', textUnderlineOffset: 5, textDecorationColor: 'var(--black)',
                                }}
                            >
                                por David Diaz H.
                            </p>
                        </a>
                        <p style={{textAlign: 'center', fontSize: 13, marginTop: 5}}>{new Date().getFullYear()}.</p>
                    </Box>
                </Box>
            </Box>
        </Drawer> 
    )
}
