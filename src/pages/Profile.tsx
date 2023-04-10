import { MainLayout } from "../layouts/MainLayout"
import {useSelector} from "react-redux";
import profilePicture from '../assets/profile-picture.png';
import { Box, Input } from "@mui/material";

export const Profile = () => {

    const { user } = useSelector((state: any) => state.auth);

    const usersRole: any = {
        ADMIN: 'Administrador',
        CLIENT: 'Cliente',
        ALLY: 'Aliado',
        USER: 'Usuario sin permisos',
    }

    return (
        <MainLayout>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
                <img src={ profilePicture } alt="Foto de perfil" width={150} style={{ borderRadius: 100, marginRight: 50 }}/>
                <div>
                    <h1 style={{ textAlign: 'center' }}>{ user.fullName }</h1>
                    <p style={{ textAlign: 'center' }}>Rol:<span style={{ marginLeft: 5, fontWeight: 500, }}>{ usersRole[user.role] }</span></p>
                </div>
            </div>
            <Box sx={{
                margin: '0 auto',
                marginTop: 10,
                maxWidth: 500,
            }}>
                <p style={{ textAlign: 'center', border: '1px solid #cecece', padding: '10px 0', margin: ' 15px 0' }}>
                    Correo Electrónico: 
                    <span style={{ marginLeft: 5, fontWeight: 500, }}>
                        { user.email }
                    </span>
                </p>
                <p style={{ textAlign: 'center', border: '1px solid #cecece', padding: '10px 0', margin: ' 15px 0' }}>
                    Celular: 
                    <span style={{ marginLeft: 5, fontWeight: 500 }}>
                        { user.phone }
                    </span>
                </p>
                <p style={{ textAlign: 'center', border: '1px solid #cecece', padding: '10px 0', margin: ' 15px 0' }}>
                    Nombre de empresa: 
                    <span style={{ marginLeft: 5, fontWeight: 500 }}>
                        { user.business.businessName }
                    </span>
                </p>
                <p style={{ textAlign: 'center', border: '1px solid #cecece', padding: '10px 0', margin: ' 15px 0' }}>
                    ID de la empresa: 
                    <span style={{ marginLeft: 5, fontWeight: 500 }}>
                        { user.business.businessId }
                    </span>
                </p>
            </Box>
        </MainLayout>
    );
}
