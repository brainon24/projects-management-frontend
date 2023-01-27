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
                            <p>{ project.createdAt }</p>
                            <div dangerouslySetInnerHTML={{ __html: project.description }}></div>
                            <p>{ project.status }</p>
                        </div>
                    ))
                }
            </div>
        </MainLayout>
    );
}