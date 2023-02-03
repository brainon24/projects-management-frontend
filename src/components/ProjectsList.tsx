import { ProjectCard } from './ProjectCard';
import '../styles/myProjects.css';

export const ProjectsList = ({projects = [], title = ''}: any) => {

    return (
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
    );
}
