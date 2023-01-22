import { useSelector } from 'react-redux';
import { Box, Chip, Typography } from '@mui/material'
import { Link as LinkRRD, } from 'react-router-dom';
import { BiRightArrowAlt, BiUserCircle } from 'react-icons/bi';
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
                            <LinkRRD to='/private/create-project' className='card-client_title'>
                                <p>Crear Nuevo Proyecto</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <MdOutlineCreateNewFolder className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Acá podrás crear un nuevo proyecto donde te ayudaremos a resolver tus necesidades</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <Box display='flex' alignItems='center'>
                            <LinkRRD to='/private/my-projects' className='card-client_title'>
                                <p>Listar Mis Proyectos</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <GrProjects className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Acá podrás listar todos los proyectos que creaste.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <Box display='flex' alignItems='center'>
                            <LinkRRD to='/private/my-business-projects' className='card-client_title'>
                                <p>Listar Los Proyectos de Mi Compañia</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <RiOrganizationChart className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Acá podrás listar todos los proyectos de tu empresa.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <Box display='flex' alignItems='center'>
                            <LinkRRD to='/private/my-commentaries' className='card-client_title'>
                                <p>Ver Mis Últimos Comentarios</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <GoCommentDiscussion className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Si quieres ver todos los comentarios que has hecho, los puedes ver acá</p>
                </Box>
            </Box>
        </Box>
    )
}
