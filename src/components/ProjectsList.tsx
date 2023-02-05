import { ProjectCard } from './ProjectCard';
import '../styles/myProjects.css';
import { useSelector } from 'react-redux';
import { ProjectModal } from './ProjectModal';

export const ProjectsList = ({projects = [], title = ''}: any) => {

    const { projectById } = useSelector((state: any) => state.projects);

    return (
        <div>
            {
                projectById && <ProjectModal project={ projectById } />
            }
            <div 
                style={{
                    width: '100%',
                    marginTop: 20,
                    backgroundColor: '#f5f5f5',
                    padding: '10px 15px',
                    borderRadius: 6,
                    overflow: 'scroll',
                }}
                className='projects-list-component'
            >
                <h3>{ title }</h3>
                {
                    projects.filter((project: any) => project.status === title).map((project: any) => (
                        <ProjectCard project={ project } />
                    ))
                }
            </div>
        </div>
    );
}
