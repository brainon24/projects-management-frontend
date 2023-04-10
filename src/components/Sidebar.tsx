import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link as LinkRRD, } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { closeSidemenu, openModal } from '../store/ui/uiSlice';
import { logout_thunk } from '../store/auth/thunks';
import { FiLogIn } from 'react-icons/fi';
import { VscHome } from 'react-icons/vsc';
import { SlClose } from 'react-icons/sl';
import { BsKey } from 'react-icons/bs';
import { FaStoreAlt } from 'react-icons/fa';
import { RiGitRepositoryPrivateLine, RiLogoutBoxLine, RiOrganizationChart } from 'react-icons/ri';
import { MdAddBusiness, MdManageAccounts, MdOutlineBusinessCenter, MdOutlineCreateNewFolder } from 'react-icons/md';
import { GrProjects } from 'react-icons/gr';
import { BiUserCircle } from 'react-icons/bi';
import { FcPrivacy } from 'react-icons/fc';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import profilePicture from '../assets/profile-picture.png';

import './styles/sidebar.css';

export const Sidebar = () => {

    const { sidemenuOpen } = useSelector((state: any) => state.ui);
    const { user, status } = useSelector((state: any) => state.auth);

    const dispatch: Dispatch<any> = useDispatch();

    const handleBussines = () => {
        dispatch(openModal())
        
        dispatch( closeSidemenu() )
    }

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
                            <SlClose 
                                className='close-sidebar-icon'
                                onClick={ () => dispatch( closeSidemenu() ) }
                            />
                        </ListItemIcon>
                    </ListItem>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 30, width: '100%', }}>
                        <img src={ profilePicture } alt="Foto de perfil" width={100} style={{ borderRadius: 100}}/>
                    </div>

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
                                                {/*<MdDashboardCustomize className='icon' />*/}
                                                <FcPrivacy />
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
                            </>
                        ) : null
                    }


                    {
                        status === 'authenticated' && user.role === 'ALLY' ? (
                            <>
                                <Divider />

                                <ListSubheader>Panel de Aliados</ListSubheader>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private' className='link'>
                                            <ListItemIcon>
                                                {/* <MdDashboardCustomize className='icon' /> */}
                                                <FcPrivacy className='icon' />
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
                            </>
                        ) : null
                    }


                    {
                        status === 'authenticated' && user.role === 'ADMIN' ? (
                            <>
                                <Divider />

                                <ListSubheader>Panel de Administración</ListSubheader>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private' className='link'>
                                            <ListItemIcon>
                                                {/* <MdDashboardCustomize className='icon' /> */}
                                                <FcPrivacy className='icon' />
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
                                    <LinkRRD to='/private/create-project' className='link'>
                                            <ListItemIcon>
                                                <MdOutlineCreateNewFolder className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Crear proyecto' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/all-projects' className='link'>
                                            <ListItemIcon>
                                                <GrProjects className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Todos los proyectos' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/my-projects-asigned' className='link'>
                                            <ListItemIcon>
                                                <AiOutlineFundProjectionScreen className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mis proyectos asignados' />
                                    </LinkRRD>
                                </ListItem>
                                
                                <ListItem className='list-item' onClick={ handleBussines  }>
                                    <LinkRRD to='/private/management-business' className='link'>
                                            <ListItemIcon>
                                                <MdAddBusiness className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Crear negocio' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/administrative-managment' className='link'>
                                            <ListItemIcon>
                                                <RiGitRepositoryPrivateLine className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Gestión Administrativa' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/management-accounts' className='link'>
                                            <ListItemIcon>
                                                <MdManageAccounts className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Gestionar usuarios' />
                                    </LinkRRD>
                                </ListItem>

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/management-business' className='link'>
                                            <ListItemIcon>
                                                <FaStoreAlt className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Gestionar negocios' />
                                    </LinkRRD>
                                </ListItem>
                            </>
                        ) : null
                    }

                    {
                        status === 'authenticated' && user.role === 'USER' ? (
                            <>
                                <Divider />

                                <ListItem className='list-item' onClick={ () => dispatch( closeSidemenu() ) }>
                                    <LinkRRD to='/private/profile' className='link'>
                                            <ListItemIcon>
                                                <BiUserCircle className='icon' />
                                            </ListItemIcon>
                                            <ListItemText primary='Mi perfil' />
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
                <Box sx={{ position: 'relative', backgroundColor: '#fff', height: '10%', mt: 2 }}>
                    <Box sx={{ bottom: 0, position: 'absolute', width: '100%', backgroundColor: '#fff' }}>
                        <a 
                            href='https://www.linkedin.com/in/david-diaz-herrera-2777ba1a8/' 
                            target='_blank'
                        >
                            <p 
                                style={{
                                    textAlign: 'center', fontSize: 16, textDecoration: 'underline', textUnderlineOffset: 5, textDecorationColor: 'var(--lightBlue)',
                                }}
                            >
                                by. David Diaz H.
                            </p>
                        </a>
                        <p style={{textAlign: 'center', fontSize: 13, marginTop: 5}}>{new Date().getFullYear()}.</p>
                    </Box>
                </Box>
            </Box>
        </Drawer> 
    )
}
