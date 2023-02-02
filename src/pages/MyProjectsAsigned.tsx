import {MainLayout} from "../layouts/MainLayout";
import { BiTime } from 'react-icons/bi';
import { NoContent } from "../components/NoContent";
import { ProjectsList } from '../components/ProjectsList';
import { useEffect } from "react";
import { findProjectsByResponsibleI_thunk } from '../store/projects/thunks';
import { useSelector, useDispatch } from 'react-redux';

export const MyProjectsAsigned = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);
    const { allProjectsByResponsibleId, errorNotFoundProject } = useSelector((state: any) => state.projects);

    useEffect(() => {
        // if( allProjectsByUserId.length > 0 ) return;

        dispatch( findProjectsByResponsibleI_thunk( user._id ) );
    }, []);

    return (
        <MainLayout>
            <h1>Mis Proyectos Asignados</h1>

            {
                allProjectsByResponsibleId.length <= 0 ? (
                    <div>
                        <NoContent
                            message="Aún no tienes proyectos asignados, pulsa el botón👇 para volver!"
                            icon={ <BiTime /> }
                            messageButton='Ir a Mi Panel'
                            urlRedirect='/private/create-project'
                        />
                    </div>
                ) : (
                    <div className="container-list-projects-mp">
                        <ProjectsList
                            projects={ allProjectsByResponsibleId }
                            title='Pendiente'
                        />

                        <ProjectsList 
                            projects={ allProjectsByResponsibleId }
                            title='En progreso'
                        />

                        <ProjectsList 
                            projects={ allProjectsByResponsibleId }
                            title='Completado'
                        />
                    </div>
                )
            }
        </MainLayout>
    );
}