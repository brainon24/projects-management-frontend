import { useEffect } from 'react';
import {MainLayout} from "../layouts/MainLayout";
import { useSelector, useDispatch } from 'react-redux';
import { findProjectsByUserId_thunk } from '../store/projects/thunks';

import { Box } from '@mui/system';
import { ProjectStatus } from '../components/ProjectStatus';
import { CgPassword } from 'react-icons/cg'
import '../styles/myProjects.css';

export const MyProjects = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);
    const { allProjectsByUserId, errorNotFoundProject } = useSelector((state: any) => state.projects);
    console.log('allProjectsByUserId: ', allProjectsByUserId)

    const eventDate = (year: any, month: any, day: any) => new Date(Date.UTC(year, month - 1, day));
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        // if( allProjectsByUserId.length > 0 ) return;

        dispatch( findProjectsByUserId_thunk( user._id ) );
    }, []);

    return (
        <MainLayout>
            <h1>Mis Proyectos</h1>
            <div className="container-list-projects-mp">
                <div style={{
                    width: '40%',
                    marginTop: 25,
                }}>
                    <h3>Pendientes</h3>
                    {
                        allProjectsByUserId.filter((project: any) => project.status === 'Pendiente').map((project: any) => (
                            <div key={project._id} className='each-project-mp'>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <p
                                        style={{
                                            fontWeight: 600,
                                            fontSize: 18,
                                            // paddingRight: 100
                                        }}
                                    >
                                        { project.title.length >= 30 ? project.title.substring(0, 29) + '...' : project.title }
                                    </p>
                                    <ProjectStatus status={ project.status } />
                                </Box>
                                <p
                                    style={{
                                        fontWeight: 400,
                                        fontSize: 13,
                                        color: 'var(--grayDark)',
                                        paddingTop: 0
                                    }}
                                >{ eventDate(new Date(project.createdAt).getFullYear(), new Date(project.createdAt).getMonth() + 1, new Date(project.createdAt).getDate()).toLocaleDateString('es-ES', options).slice(0, 1).toUpperCase() + eventDate(new Date(project.createdAt).getFullYear(), new Date(project.createdAt).getMonth() + 1, new Date(project.createdAt).getDate()).toLocaleDateString('es-ES', options).slice(1) }</p>
                                {/* <div dangerouslySetInnerHTML={{ __html: project.description }} /> */}

                                <p style={{ marginTop: 15 }}>ID: { project._id }</p>
                            </div>
                        ))
                    }
                </div>

                <div style={{
                    width: '40%',
                    marginTop: 25,
                }}>
                    <h3>En progreso</h3>
                    {
                        allProjectsByUserId.filter((project: any) => project.status === 'En progreso').map((project: any) => (
                            <div key={project._id} className='each-project-mp'>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <p
                                        style={{
                                            fontWeight: 600,
                                            fontSize: 18,
                                            // paddingRight: 100
                                        }}
                                    >
                                        { project.title.length >= 30 ? project.title.substring(0, 29) + '...' : project.title }
                                    </p>
                                    <ProjectStatus status={ project.status } />
                                </Box>
                                <p
                                    style={{
                                        fontWeight: 400,
                                        fontSize: 13,
                                        color: 'var(--grayDark)',
                                        paddingTop: 0
                                    }}
                                >{ eventDate(new Date(project.createdAt).getFullYear(), new Date(project.createdAt).getMonth() + 1, new Date(project.createdAt).getDate()).toLocaleDateString('es-ES', options).slice(0, 1).toUpperCase() + eventDate(new Date(project.createdAt).getFullYear(), new Date(project.createdAt).getMonth() + 1, new Date(project.createdAt).getDate()).toLocaleDateString('es-ES', options).slice(1) }</p>
                                {/* <div dangerouslySetInnerHTML={{ __html: project.description }}></div> */}

                                <p style={{ marginTop: 15 }}>ID: { project._id }</p>
                            </div>
                        ))
                    }
                </div>

                <div style={{
                    width: '40%',
                    marginTop: 25,
                }}>
                    <h3>Completado</h3>
                    {
                        allProjectsByUserId.filter((project: any) => project.status === 'Completado').map((project: any) => (
                            <div key={project._id} className='each-project-mp'>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <p 
                                        style={{
                                            fontWeight: 600,
                                            fontSize: 18,
                                            // paddingRight: 100
                                        }}
                                    >
                                        { project.title.length >= 30 ? project.title.substring(0, 29) + '...' : project.title }
                                    </p>
                                    <ProjectStatus status={ project.status } />
                                </Box>
                                <p
                                    style={{
                                        fontWeight: 400,
                                        fontSize: 13,
                                        color: 'var(--grayDark)',
                                        paddingTop: 0
                                    }}
                                >{ eventDate(new Date(project.createdAt).getFullYear(), new Date(project.createdAt).getMonth() + 1, new Date(project.createdAt).getDate()).toLocaleDateString('es-ES', options).slice(0, 1).toUpperCase() + eventDate(new Date(project.createdAt).getFullYear(), new Date(project.createdAt).getMonth() + 1, new Date(project.createdAt).getDate()).toLocaleDateString('es-ES', options).slice(1) }</p>
                                {/* <div dangerouslySetInnerHTML={{ __html: project.description }}></div> */}

                                <p style={{ marginTop: 15 }}>ID: { project._id }</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </MainLayout>
    );
}