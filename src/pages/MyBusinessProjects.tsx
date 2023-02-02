import { useEffect } from "react";
import {MainLayout} from "../layouts/MainLayout";
import { ProjectsList } from '../components/ProjectsList';
import { useDispatch, useSelector } from 'react-redux';
import { findProjectsByBusinessId_thunk } from '../store/projects/thunks';
import { NoContent } from '../components/NoContent';
import { BiTime } from "react-icons/bi";

export const MyBusinessProjects = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);
    const { allProjectsByBusinessId, errorNotFoundProject } = useSelector((state: any) => state.projects);

    useEffect(() => {
        // if( allProjectsByUserId.length > 0 ) return;

        dispatch( findProjectsByBusinessId_thunk( user.business.businessId ) );
    }, []);

    return (
        <MainLayout>
            <h1>Proyectos de mi Negocio</h1>

            {
                allProjectsByBusinessId.length <= 0 ? (
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
                            projects={ allProjectsByBusinessId }
                            title='Pendiente'
                        />

                        <ProjectsList 
                            projects={ allProjectsByBusinessId }
                            title='En progreso'
                        />

                        <ProjectsList 
                            projects={ allProjectsByBusinessId }
                            title='Completado'
                        />
                    </div>
                )
            }
        </MainLayout>
    );
}