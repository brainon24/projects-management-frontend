import { useEffect } from 'react';
import {MainLayout} from "../layouts/MainLayout";
import { useSelector, useDispatch } from 'react-redux';
import { findProjectsByUserId_thunk } from '../store/projects/thunks';

import '../styles/myProjects.css';
import { ProjectsList } from '../components/ProjectsList';
import { NoContent } from '../components/NoContent';
import { BiTime } from 'react-icons/bi';

export const MyProjects = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);
    const { allProjectsByUserId, errorNotFoundProject } = useSelector((state: any) => state.projects);

    useEffect(() => {
        // if( allProjectsByUserId.length > 0 ) return;

        dispatch( findProjectsByUserId_thunk( user._id ) );
    }, []);

    return (
        <MainLayout>
            <h1>Mis Proyectos</h1>

            {
                allProjectsByUserId.length <= 0 ? (
                    <div>
                        <NoContent
                            message="Aún no tienes proyectos creados, si deseas pulsa el botón👇 para crear uno!"
                            icon={ <BiTime /> }
                            messageButton='Crear Proyecto'
                            urlRedirect='/private/create-project'
                        />
                    </div>
                ) : (
                    <div className="container-list-projects-mp">
                        <ProjectsList 
                            projects={ allProjectsByUserId }
                            title='Pendiente'
                        />

                        <ProjectsList 
                            projects={ allProjectsByUserId }
                            title='En progreso'
                        />

                        <ProjectsList 
                            projects={ allProjectsByUserId } 
                            title='Completado'
                        />
                    </div>
                )
            }
        </MainLayout>
    );
}