import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';
import { VscHome } from 'react-icons/vsc';
import { useSelector, useDispatch } from 'react-redux';
import { closeSidemenu } from '../store/ui/uiSlice';

export const Sidebar = () => {

    const { sidemenuOpen } = useSelector((state: any) => state.ui);
    const dispatch = useDispatch();

    return (
        <Drawer
            open={ sidemenuOpen }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClick={ () => dispatch( closeSidemenu() ) }
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <VscHome />
                        </ListItemIcon>
                        <ListItemText primary='Inicio' />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <FiLogIn />
                        </ListItemIcon>
                        <ListItemText primary='Iniciar Sesión' />
                    </ListItem>

                    {/* <Divider /> */}

                </List>
            </Box>
        </Drawer> 
    )
}
