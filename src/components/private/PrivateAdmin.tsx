import { useSelector } from 'react-redux';
import { Box, Chip, Typography } from '@mui/material'
import { Link as LinkRRD, } from 'react-router-dom';
import '../../components/styles/privateClient.css'
import { Icon } from '../Icons';

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
                        <LinkRRD to='/private/profile'>
                            <p className='card-client_title'>Visitar Mi Perfil</p>
                        </LinkRRD>
                        <Icon name='usuario-circulo' size={17} />
                    </Box>
                    <p className='card-client_description'>Puedes visitar tu perfil y actualizar tus datos personales si así lo deseas.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <LinkRRD to='/private/administrative-managment'>
                            <p className='card-client_title'>Gestión Administrativa</p>
                        </LinkRRD>
                        <Icon name='users-edit' size={17} />
                    </Box>
                    <p className='card-client_description'>Desde esta sección puedes gestionar usuarios y negocios.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <LinkRRD to='/private/create-project'>
                            <p className='card-client_title'>Crear Nuevo Proyecto</p>
                        </LinkRRD>
                        <Icon name='file-shield-02' size={17} />
                    </Box>
                    <p className='card-client_description'>Acá podrás crear un nuevo proyecto donde te ayudaremos a resolver tus necesidades</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <LinkRRD to='/private/messages'>
                            <p className='card-client_title'>Mensajes de WhatsApp</p>
                        </LinkRRD>
                        {/* <TbMessage className='icon-card' /> */}
                        <Icon name='mail-04' size={17} />
                    </Box>
                    <p className='card-client_description'>Acá podrás visualizar los mensajes recibidos por WhatsApp por cada cliente</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <LinkRRD to='/private/my-projects'>
                            <p className='card-client_title'>Listar mis proyectos</p>
                        </LinkRRD>
                        <Icon name='laptop-01' size={17} />
                    </Box>
                    <p className='card-client_description'>Acá podrás listar todos los proyectos que creaste.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <LinkRRD to='/private/my-business-projects'>
                            <p className='card-client_title'>Listar los proyectos de mi compañia</p>
                        </LinkRRD>
                        <Icon name='archivo' size={17} />
                    </Box>
                    <p className='card-client_description'>Acá podrás listar todos los proyectos de tu empresa.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <LinkRRD to='/private/all-projects'>
                            <p className='card-client_title'>Listar todos los proyectos</p>
                        </LinkRRD>
                        <Icon name='puntos' size={17} />
                    </Box>
                    <p className='card-client_description'>Acá podrás listar todos los proyectos de tu empresa.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <LinkRRD to='https://drive.google.com/drive/folders/1ZAZLeZKxY1vwoNgxD610vqLbAsNY55c_?usp=sharing' target='_blank'>
                            <p className='card-client_title'>Mis archivos con brainon24</p>
                        </LinkRRD>
                        <Icon name='usb-flash-drive' size={17} />
                    </Box>
                    <p className='card-client_description'>Ahora puedes acceder a tus archivos con brainon24 desde aquí.</p>
                </Box>
                <Box className='card-client'>
                    <Box className='container-header-card'>
                        <LinkRRD to='https://calendar.google.com/calendar/u/0/r/week' target='_blank'>
                            <p className='card-client_title'>Mi agenda con brainon24</p>
                        </LinkRRD>
                        <Icon name='calendario' size={17} />
                    </Box>
                    <p className='card-client_description'>Puedes ingresar a tu agenda con brainon24 desde aquí.</p>
                </Box>
            </Box>
        </Box>
    )
}
