import { useSelector } from "react-redux";
import { Box, Chip, Typography } from '@mui/material';
import { Link as LinkRRD } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { PrivateUser } from "../components/private/PrivateUser";
import { Icon } from '../components/Icons';
import '../components/styles/privateClient.css';

interface MenuCard {
    title: string;
    description: string;
    link: string;
    icon: string;
    external?: boolean;
}

const commonMenuItems = {
    profile: {
        title: 'Visitar Mi Perfil',
        description: 'Puedes visitar tu perfil y actualizar tus datos personales si así lo deseas.',
        link: '/private/profile',
        icon: 'usuario-circulo'
    },
    myBusiness: {
        title: 'Ver Mi Compañia',
        description: 'Visita el perfil de la compañia donde trabajas.',
        link: '/private/my-business',
        icon: 'edificio-02'
    },
    myBusinessLowercase: {
        title: 'Ver mi compañia',
        description: 'Visita el perfil de la compañia donde trabajas.',
        link: '/private/my-business',
        icon: 'edificio-02'
    },
    createProject: {
        title: 'Crear Nuevo Proyecto',
        description: 'Acá podrás crear un nuevo proyecto donde te ayudaremos a resolver tus necesidades',
        link: '/private/create-project',
        icon: 'file-shield-02'
    },
    myProjects: {
        title: 'Listar mis proyectos',
        description: 'Acá podrás listar todos los proyectos que creaste.',
        link: '/private/my-projects',
        icon: 'laptop-01'
    },
    myProjectsClient: {
        title: 'Listar Mis Proyectos',
        description: 'Acá podrás listar todos los proyectos que creaste.',
        link: '/private/my-projects',
        icon: 'puntos'
    },
    myBusinessProjects: {
        title: 'Listar los proyectos de mi compañia',
        description: 'Acá podrás listar todos los proyectos de tu empresa.',
        link: '/private/my-business-projects',
        icon: 'archivo'
    },
    myBusinessProjectsClient: {
        title: 'Listar Los Proyectos de Mi Compañia',
        description: 'Acá podrás listar todos los proyectos de tu empresa.',
        link: '/private/my-business-projects',
        icon: 'archivo'
    },
    driveFiles: {
        title: 'Mis archivos con brainon24',
        description: 'Ahora puedes acceder a tus archivos con brainon24 desde aquí.',
        link: 'https://drive.google.com/drive/folders/1ZAZLeZKxY1vwoNgxD610vqLbAsNY55c_?usp=sharing',
        icon: 'usb-flash-drive',
        external: true
    },
    calendar: {
        title: 'Mi agenda con brainon24',
        description: 'Puedes ingresar a tu agenda con brainon24 desde aquí.',
        link: 'https://calendar.google.com/calendar/u/0/r/week',
        icon: 'calendario',
        external: true
    }
};

const specificMenuItems = {
    ADMIN: {
        administrativeManagement: {
            title: 'Gestión Administrativa',
            description: 'Desde esta sección puedes gestionar usuarios y negocios.',
            link: '/private/administrative-managment',
            icon: 'users-edit'
        },
        whatsappMessages: {
            title: 'Mensajes de WhatsApp',
            description: 'Acá podrás visualizar los mensajes recibidos por WhatsApp por cada cliente',
            link: '/private/messages',
            icon: 'mail-04'
        },
        allProjects: {
            title: 'Listar todos los proyectos',
            description: 'Acá podrás listar todos los proyectos de tu empresa.',
            link: '/private/all-projects',
            icon: 'puntos'
        }
    },
    ALLY: {
        assignedProjects: {
            title: 'Mis proyectos asignados',
            description: 'Acá podrás listar todos los proyectos que tienes asignados.',
            link: '/private/my-projects-asigned',
            icon: 'puntos'
        }
    }
};

// Configuración de menú por rol usando elementos comunes y específicos
const menuConfig: Record<string, MenuCard[]> = {
    ADMIN: [
        commonMenuItems.profile,
        specificMenuItems.ADMIN.administrativeManagement,
        commonMenuItems.createProject,
        specificMenuItems.ADMIN.whatsappMessages,
        commonMenuItems.myProjects,
        commonMenuItems.myBusinessProjects,
        specificMenuItems.ADMIN.allProjects,
        commonMenuItems.driveFiles,
        commonMenuItems.calendar
    ],
    CLIENT: [
        commonMenuItems.profile,
        commonMenuItems.myBusiness,
        commonMenuItems.createProject,
        commonMenuItems.myProjectsClient,
        commonMenuItems.myBusinessProjectsClient,
        commonMenuItems.driveFiles,
        commonMenuItems.calendar
    ],
    ALLY: [
        commonMenuItems.profile,
        commonMenuItems.myBusinessLowercase,
        specificMenuItems.ALLY.assignedProjects,
        commonMenuItems.driveFiles,
        commonMenuItems.calendar
    ]
};

export const Private = () => {
    const { user } = useSelector((state: any) => state.auth);

    const renderMenuCards = (cards: MenuCard[]) => (
        <Box className='cards-client'>
            {cards.map((card, index) => (
                <Box key={index} className='card-client'>
                    <Box className='container-header-card'>
                        <LinkRRD 
                            to={card.link} 
                            target={card.external ? '_blank' : undefined}
                        >
                            <p className='card-client_title'>{card.title}</p>
                        </LinkRRD>
                        <Icon name={card.icon} size={17} />
                    </Box>
                    <p className='card-client_description'>{card.description}</p>
                </Box>
            ))}
        </Box>
    );

    const renderRoleContent = () => {
        if (user.role === 'USER') {
            return <PrivateUser />;
        }

        const menuCards = menuConfig[user.role];
        if (!menuCards) {
            return <Typography>Rol no reconocido</Typography>;
        }

        return (
            <Box>
                <Typography sx={{ textAlign: 'center' }}>
                    Hola, {user.fullName.split(' ')[0]}
                </Typography>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-start', 
                    alignItems: 'center', 
                    margin: '20px 0 10px 0' 
                }}>
                    <h1>Menú</h1>
                    <Chip
                        label='Beta'
                        className='fadeIn'
                        style={{ 
                            color: 'var(--darkPink)', 
                            backgroundColor: 'var(--lightPink)', 
                            marginLeft: 10, 
                            width: 55, 
                            height: 22 
                        }}
                    />
                </Box>
                {renderMenuCards(menuCards)}
            </Box>
        );
    };

    return (
        <MainLayout>
            {renderRoleContent()}
        </MainLayout>
    );
};
