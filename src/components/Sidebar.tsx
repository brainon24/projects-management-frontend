import { Box, Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeSidemenu } from '../store/ui/uiSlice';
import { FiLogIn } from 'react-icons/fi';
import { VscHome } from 'react-icons/vsc';
import { SlClose } from 'react-icons/sl';
import { BsKey } from 'react-icons/bs';
import { Link as LinkRRD, } from 'react-router-dom';

import './styles/sidebar.css';
import { logout_thunk } from '../store/auth/thunks';
import { Dispatch } from '@reduxjs/toolkit';
import { RiLogoutBoxLine, RiOrganizationChart } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';
import { MdOutlineBusinessCenter, MdOutlineCreateNewFolder } from 'react-icons/md';
import { GrProjects } from 'react-icons/gr';
import { GoCommentDiscussion } from 'react-icons/go';

export const Sidebar = () => {

    const { sidemenuOpen } = useSelector((state: any) => state.ui);
    const { user, status } = useSelector((state: any) => state.auth);

    const dispatch: Dispatch<any> = useDispatch();

    return (
        <Drawer
            open={ sidemenuOpen }
            onClose={ () => dispatch( closeSidemenu() ) }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }} 
        >
            <Box sx={{ width: 250, paddingTop: 3 }}>                
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <SlClose 
                                className='close-sidebar-icon'
                                onClick={ () => dispatch( closeSidemenu() ) }
                            />
                        </ListItemIcon>
                    </ListItem>

                    {/* <Divider /> */}

                    {
                        status === 'not-authenticated'
                        ? (
                            <>
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
                            </>
                        ) : null
                    }


                    {
                        status === 'authenticated' && user.role === 'CLIENT' ? (
                            <>
                                {/* <Divider /> */}

                                <ListItem className='list-item' onClick={() => dispatch( logout_thunk() )}>
                                    <LinkRRD to='/profile'>
                                        <Link className='link'>
                                            <ListItemIcon>
                                                <BiUserCircle className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mi perfil' />
                                        </Link>
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={() => dispatch( logout_thunk() )}>
                                    <LinkRRD to='/my-business'>
                                        <Link className='link'>
                                            <ListItemIcon>
                                                <MdOutlineBusinessCenter className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mi negocio' />
                                        </Link>
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={() => dispatch( logout_thunk() )}>
                                    <LinkRRD to='/create-project'>
                                        <Link className='link'>
                                            <ListItemIcon>
                                                <MdOutlineCreateNewFolder className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Crear proyecto' />
                                        </Link>
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={() => dispatch( logout_thunk() )}>
                                    <LinkRRD to='/my-projects'>
                                        <Link className='link'>
                                            <ListItemIcon>
                                                <GrProjects className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mis proyectos' />
                                        </Link>
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={() => dispatch( logout_thunk() )}>
                                    <LinkRRD to='/my-business-projects'>
                                        <Link className='link'>
                                            <ListItemIcon>
                                                <RiOrganizationChart className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Proyectos de mi negocio' />
                                        </Link>
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={() => dispatch( logout_thunk() )}>
                                    <LinkRRD to='/my-commentaries'>
                                        <Link className='link'>
                                            <ListItemIcon>
                                                <GoCommentDiscussion className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mis comentarios' />
                                        </Link>
                                    </LinkRRD>
                                </ListItem>

                            </>
                        ) : null
                    }
                    

                    {
                        status === 'authenticated' ? (
                            <>
                                <Divider />

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
