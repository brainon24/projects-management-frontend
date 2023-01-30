import { useEffect } from 'react';
import {MainLayout} from "../layouts/MainLayout";
import { useSelector, useDispatch } from 'react-redux';
import { findProjectsByUserId_thunk } from '../store/projects/thunks';

import '../styles/myProjects.css';

export const MyProjects = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);
    const { allProjectsByUserId, errorNotFoundProject } = useSelector((state: any) => state.projects);
    console.log('allProjectsByUserId: ', allProjectsByUserId)

    const eventDate = (year: any, month: any, day: any) => new Date(Date.UTC(year, month - 1, day));
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const createdAt = allProjectsByUserId.map((project: any) => project.createdAt);
    const year = new Date(createdAt).getFullYear();
    const month = new Date(createdAt).getMonth() + 1;
    const day = new Date(createdAt).getDate();

    useEffect(() => {
        if( allProjectsByUserId.length > 0 ) return;

        dispatch( findProjectsByUserId_thunk( user._id ) );
    }, []);

    return (
        <MainLayout>
            <h1>Mis Proyectos</h1>
            <div className="container-list-projects-mp">
                {
                    allProjectsByUserId.map((project: any) => (
                        <div key={project._id} className='each-project-mp'>
                            <p>{ project.title }</p>
                            <p>{ project.status }</p>
                            <p>{ eventDate(year, month, day).toLocaleDateString('es-ES', options).slice(0, 1).toUpperCase() + eventDate(year, month, day).toLocaleDateString('es-ES', options).slice(1) }</p>
                            <div dangerouslySetInnerHTML={{ __html: project.description }}></div>
                        </div>
                    ))
                }
            </div>
        </MainLayout>
    );
}