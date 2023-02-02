import { useSelector } from 'react-redux';
import { Box, Chip, Typography } from '@mui/material'
import { Link as LinkRRD, } from 'react-router-dom';
import { BiRightArrowAlt, BiUserCircle } from 'react-icons/bi';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { GrProjects } from 'react-icons/gr';
import { GoCommentDiscussion } from 'react-icons/go';

import '../styles/privateClient.css';

export const PrivateEmployee = () => {

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
                        <Box display='flex' alignItems='center'>
                            <LinkRRD to='/private/profile' className='card-client_title'>
                                <p>Visitar Mi Perfil</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <BiUserCircle className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Puedes visitar tu perfil y actualizar tus datos personales si así lo deseas.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <Box display='flex' alignItems='center'>
                            <LinkRRD to='/private/my-business' className='card-client_title'>
                                <p>Ver Mi Compañia</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <MdOutlineBusinessCenter className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Visita el perfil de la compañia donde trabajas.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <Box display='flex' alignItems='center'>
                            <LinkRRD to='/private/my-projects-asigned' className='card-client_title'>
                                <p>Mis Proyectos Asignados</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <GrProjects className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Acá podrás listar todos los proyectos que creaste.</p>
                </Box>
            </Box>
        </Box>
    )
}
