import { Box, Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeSidemenu } from '../store/ui/uiSlice';
import { FiLogIn } from 'react-icons/fi';
import { VscHome } from 'react-icons/vsc';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { BsKey } from 'react-icons/bs';
import { Link as LinkRRD, } from 'react-router-dom';

import './styles/sidebar.css';

export const Sidebar = () => {

    const { sidemenuOpen } = useSelector((state: any) => state.ui);
    const dispatch = useDispatch();

    return (
        <Drawer
            open={ sidemenuOpen }
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

                    <ListItem>
                        <LinkRRD to='/'>
                            <Link display='flex' alignItems='center'>
                                <ListItemIcon>
                                    <VscHome className='icon' />
                                </ListItemIcon>
                                <ListItemText primary='Inicio' />
                            </Link>
                        </LinkRRD>
                    </ListItem>

                    <ListItem>
                        <LinkRRD to='/login'>
                            <ListItemIcon>
                                <FiLogIn className='icon' />
                            </ListItemIcon>
                            <ListItemText primary='Iniciar Sesión' />
                        </LinkRRD>
                    </ListItem>

                    <ListItem>
                        <LinkRRD to='/signUp'>
                            <ListItemIcon>
                                <BsKey className='icon' />
                            </ListItemIcon>
                            <ListItemText primary='Registrarme' />
                        </LinkRRD>
                    </ListItem>

                    {/* <Divider /> */}

                </List>
            </Box>
        </Drawer> 
    )
}
