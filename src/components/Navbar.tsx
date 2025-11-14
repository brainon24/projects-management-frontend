import { useDispatch, useSelector } from 'react-redux';
import { openSidemenu } from "../store/ui/uiSlice";
import { BiMenu } from 'react-icons/bi'

import './styles/navbar.css';
import { Typography } from "@mui/material";
import { Link as LinkRRD } from 'react-router-dom';
// import logo from '../assets/brainon24-logo.png'

export const Navbar = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);

    return (
        <div className="container-navbar">
            <LinkRRD to={ user ? '/private' : '/' } style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Typography variant='h6' color='#000'>Gestor Proyectos</Typography>
                {/* <img src={ logo } alt='Logo' width={100} style={{ marginLeft: 6 }} /> */}
                {/* <Typography sx={{ ml: 0.5 }}>brainon24</Typography> */}
            </LinkRRD> 

            
            <BiMenu className="menu-icon" onClick={ () => dispatch( openSidemenu() ) } />
        </div>
    );
}
