import { useSelector } from 'react-redux';
import { Box, Chip, Typography } from '@mui/material'
import { Link as LinkRRD, } from 'react-router-dom';
import { BiRightArrowAlt, BiUserCircle } from 'react-icons/bi';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { GrProjects } from 'react-icons/gr';
import { RiOrganizationChart, RiGitRepositoryPrivateLine } from 'react-icons/ri';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { TbMessage } from 'react-icons/tb';
import { VscFileSymlinkDirectory } from 'react-icons/vsc';
import { IoCalendarNumberOutline } from 'react-icons/io5';

export const PrivateAdmin = () => {

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
                            <LinkRRD to='/private/administrative-managment' className='card-client_title'>
                                <p>Gestión Administrativa</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <RiGitRepositoryPrivateLine className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Desde esta sección puedes gestionar usuarios y negocios.</p>
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
                            <LinkRRD to='/private/messages' className='card-client_title'>
                                <p>Mensajes de WhatsApp</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <TbMessage className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Acá podrás visualizar los mensajes recibidos por WhatsApp por cada cliente</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <Box display='flex' alignItems='center'>
                            <LinkRRD to='/private/my-projects' className='card-client_title'>
                                <p>Listar Mis Proyectos</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <AiOutlineFundProjectionScreen className='icon-card' />
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
                            <LinkRRD to='/private/all-projects' className='card-client_title'>
                                <p>Listar Todos los Proyectos</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <GrProjects className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Acá podrás listar todos los proyectos de tu empresa.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <Box display='flex' alignItems='center'>
                            <LinkRRD to='https://drive.google.com/drive/folders/1ZAZLeZKxY1vwoNgxD610vqLbAsNY55c_?usp=sharing' target='_blank' className='card-client_title'>
                                <p>Mis archivos con brainon24</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <VscFileSymlinkDirectory className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Ahora puedes acceder a tus archivos con brainon24 desde aquí.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <Box display='flex' alignItems='center'>
                            <LinkRRD to='https://calendar.google.com/calendar/u/0/r/week' target='_blank' className='card-client_title'>
                                <p>Mi agenda con brainon24</p>
                            </LinkRRD>
                            <BiRightArrowAlt className='icon-link' />
                        </Box>
                        <IoCalendarNumberOutline className='icon-card' />
                    </Box>
                    <p className='card-client_description'>Puedes ingresar a tu agenda con brainon24 desde aquí.</p>
                </Box>
            </Box>
        </Box>
    )
}
