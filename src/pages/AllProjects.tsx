import { MainLayout } from '../layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { findAllProjects_thunk } from '../store/projects/thunks';
import { ProjectsList } from '../components/ProjectsList';
import { NoContent } from '../components/NoContent';
import { BiTime } from 'react-icons/bi';
import { Chip } from '@mui/material';

export const AllProjects = () => {

    const dispatch = useDispatch();
    const { allProjects, errorNotFoundProject } = useSelector((state: any) => state.projects);

    useEffect(() => {
        // if( allProjectsByUserId.length > 0 ) return;

        dispatch( findAllProjects_thunk() );
    }, []);

    return (
        <MainLayout>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
                <h1>Todos los Proyectos</h1>
                <Chip
                    label='Only Admin'
                    className='fadeIn'
                    style={{ color: '#3483fa', backgroundColor: '#4189e626', marginLeft: 10, width: 93, height: 22 }}
                />
            </div>

            {
                allProjects.length <= 0 ? (
                    <div>
                        <NoContent
                            message="Aún no hay proyectos creados, pulsa el botón👇 para volver!"
                            icon={ <BiTime /> }
                            messageButton='Ir a Mi Panel'
                            urlRedirect='/private'
                        />
                    </div>
                ) : (
                    <div className="container-list-projects-mp">
                        <ProjectsList
                            projects={ allProjects }
                            title='Pendiente'
                        />

                        <ProjectsList
                            projects={ allProjects }
                            title='En progreso'
                        />

                        <ProjectsList 
                            projects={ allProjects }
                            title='Completado'
                        />
                    </div>
                )
            }
        </MainLayout>
    )
}
