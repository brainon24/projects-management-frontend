import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link as LinkRRD, } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { closeSidemenu } from '../store/ui/uiSlice';
import { logout_thunk } from '../store/auth/thunks';
import { FiLogIn } from 'react-icons/fi';
import { VscHome } from 'react-icons/vsc';
import { SlClose } from 'react-icons/sl';
import { BsKey } from 'react-icons/bs';
import { GoCommentDiscussion } from 'react-icons/go';
import { RiLogoutBoxLine, RiOrganizationChart } from 'react-icons/ri';
import { MdDashboardCustomize, MdOutlineBusinessCenter, MdOutlineCreateNewFolder } from 'react-icons/md';
import { GrProjects } from 'react-icons/gr';
import { BiUserCircle } from 'react-icons/bi';

import './styles/sidebar.css';

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
                                    <LinkRRD to='/' className='link'>
                                            <ListItemIcon>
                                                <VscHome className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Inicio' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/login' className='link'>
                                            <ListItemIcon>
                                                <FiLogIn className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Iniciar sesión' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/sign-up' className='link'>
                                            <ListItemIcon>
                                                <BsKey className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Registrarme' />
                                    </LinkRRD>
                                </ListItem>
                            </>
                        ) : null
                    }


                    {
                        status === 'authenticated' && user.role === 'CLIENT' ? (
                            <>
                                <Divider />

                                <ListSubheader>Panel de Clientes</ListSubheader>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private' className='link'>
                                            <ListItemIcon>
                                                <MdDashboardCustomize className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mi panel' className='item-text-sidebar' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/profile' className='link'>
                                            <ListItemIcon>
                                                <BiUserCircle className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mi perfil' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/my-business' className='link'>
                                            <ListItemIcon>
                                                <MdOutlineBusinessCenter className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mi negocio' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/create-project' className='link'>
                                            <ListItemIcon>
                                                <MdOutlineCreateNewFolder className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Crear proyecto' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/my-projects' className='link'>
                                            <ListItemIcon>
                                                <GrProjects className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mis proyectos' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/my-business-projects' className='link'>
                                            <ListItemIcon>
                                                <RiOrganizationChart className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Proyectos de mi negocio' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/my-commentaries' className='link'>
                                            <ListItemIcon>
                                                <GoCommentDiscussion className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mis comentarios' />
                                    </LinkRRD>
                                </ListItem>

                            </>
                        ) : null
                    }


                    {
                        status === 'authenticated' && user.role === 'EMPLOYEE' ? (
                            <>
                                <Divider />

                                <ListSubheader>Panel de Empleados</ListSubheader>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private' className='link'>
                                            <ListItemIcon>
                                                <MdDashboardCustomize className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mi panel' className='item-text-sidebar' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/profile' className='link'>
                                            <ListItemIcon>
                                                <BiUserCircle className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mi perfil' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/my-business' className='link'>
                                            <ListItemIcon>
                                                <MdOutlineBusinessCenter className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mi negocio' /> {/* CHANGE IT*/}
                                    </LinkRRD>
                                </ListItem> 

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/my-projects-asigned' className='link'>
                                            <ListItemIcon>
                                                <GrProjects className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mis Proyectos Asignados' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/my-commentaries' className='link'>
                                            <ListItemIcon>
                                                <GoCommentDiscussion className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mis comentarios' />
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
                                    <LinkRRD to='/' className='link'>
                                            <ListItemIcon>
                                                <RiLogoutBoxLine className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Cerrar sesión' />
                                    </LinkRRD>
                                </ListItem>

                            </>
                        ) : null
                    }
                </List>
                <Box sx={{ bottom: 100, position: 'absolute', width: '100%' }}>
                    <p style={{textAlign: 'center', fontSize: 17}}>by. David Diaz H</p>
                    <p style={{textAlign: 'center', fontSize: 13}}>{new Date().getFullYear()}</p>
                </Box>
            </Box>
        </Drawer> 
    )
}
