import { Box, Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeSidemenu } from '../store/ui/uiSlice';
import { FiLogIn } from 'react-icons/fi';
import { VscHome } from 'react-icons/vsc';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { BsKey } from 'react-icons/bs';
import { Link as LinkRRD, } from 'react-router-dom';

import './styles/sidebar.css';
import { logout_thunk } from '../store/auth/thunks';
import { Dispatch } from '@reduxjs/toolkit';
import { RiLogoutBoxLine } from 'react-icons/ri';

export const Sidebar = () => {

    const { sidemenuOpen } = useSelector((state: any) => state.ui);
    const { status } = useSelector((state: any) => state.auth);

    const dispatch: Dispatch<any> = useDispatch();

    return (
        <Drawer
            open={ sidemenuOpen }
            onClose={ () => dispatch( closeSidemenu() ) }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }} 
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>                
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <AiOutlineMenuUnfold 
                                className='close-sidebar-icon'
                                onClick={ () => dispatch( closeSidemenu() ) }
                            />
                        </ListItemIcon>
                    </ListItem>

                    {/* <Divider /> */}

                    <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                        <LinkRRD to='/'>
                            <Link className='link'>
                                <ListItemIcon>
                                    <VscHome className='icon' />
                                </ListItemIcon>
                                <ListItemText primary='Inicio' />
                            </Link>
                        </LinkRRD>
                    </ListItem>

                    <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                        <LinkRRD to='/login'>
                            <Link className='link'>
                                <ListItemIcon>
                                    <FiLogIn className='icon' />
                                </ListItemIcon>
                                <ListItemText primary='Iniciar sesión' />
                            </Link>
                        </LinkRRD>
                    </ListItem>

                    <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                        <LinkRRD to='/sign-up'>
                            <Link className='link'>
                                <ListItemIcon>
                                    <BsKey className='icon' />
                                </ListItemIcon>
                                <ListItemText primary='Registrarme' />
                            </Link>
                        </LinkRRD>
                    </ListItem>

                    {/* <Divider /> */}

                    

                    {
                        status === 'authenticated' ? (
                            <>
                                <ListItem className='list-item' onClick={() => dispatch( logout_thunk() )}>
                                    <LinkRRD to='/'>
                                        <Link className='link'>
                                            <ListItemIcon>
                                                <RiLogoutBoxLine className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Cerrar sesión' />
                                        </Link>
                                    </LinkRRD>
                                </ListItem>

                            </>
                        ) : null
                    }
                </List>
            </Box>
        </Drawer> 
    )
}
