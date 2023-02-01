import { useEffect } from 'react';
import {MainLayout} from "../layouts/MainLayout";
import { useSelector, useDispatch } from 'react-redux';
import { findProjectsByUserId_thunk } from '../store/projects/thunks';

import '../styles/myProjects.css';
import { ProjectsList } from '../components/ProjectsList';

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
        </MainLayout>
    );
}