import { useSelector } from 'react-redux';
import { Box, Chip, Typography } from '@mui/material'
import { BiUserCircle } from 'react-icons/bi';
import { MdOutlineBusinessCenter, MdOutlineCreateNewFolder } from 'react-icons/md';
import { GrProjects } from 'react-icons/gr';
import { GoCommentDiscussion } from 'react-icons/go';
import { RiOrganizationChart } from 'react-icons/ri';

import '../styles/privateClient.css';

export const PrivateClient = () => {

    const { user } = useSelector((state: any) => state.auth);

    return (
        <Box>
            <Typography sx={{ textAlign: 'center' }}>Hola, { user.fullName.split(' ')[0] }</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', margin: '20px 0 10px 0' }}>
                <h1>Menú</h1>
                <Chip
                    label='Beta'
                    className='fadeIn'
                    style={{ color: 'var(--darkPink)', backgroundColor: 'var(--lightPink)', marginLeft: 10, width: 55, height: 22 }}
                />
            </Box>
            <Box className='cards-client'>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <p className='card-client_title'>Visitar Mi Perfil </p>
                        <BiUserCircle className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Puedes visitar tu perfil y actualizar tus datos personales si así lo deseas.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <p className='card-client_title'>Ver Mi Compañia</p>
                        <MdOutlineBusinessCenter className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Visita el perfil de la compañia donde trabajas.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <p className='card-client_title'>Crear Nuevo Proyecto</p>
                        <MdOutlineCreateNewFolder className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Acá podrás crear un nuevo proyecto donde te ayudaremos a resolver tus necesidades</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <p className='card-client_title'>Listar Mis Proyectos</p>
                        <GrProjects className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Acá podrás listar todos los proyectos que creaste.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <p className='card-client_title'>Listar Los Proyectos de Mi Compañia</p>
                        <RiOrganizationChart className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Acá podrás listar todos los proyectos de tu empresa.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <p className='card-client_title'>Ver Mis Últimos Comentarios</p>
                        <GoCommentDiscussion className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Si quieres ver todos los comentarios que has hecho, los puedes ver acá</p>
                </Box>
            </Box>
        </Box>
    )
}
