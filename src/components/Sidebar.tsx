import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';
import { VscHome } from 'react-icons/vsc';

export const Sidebar = () => {
    return (
        <Drawer
            open
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
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
