import { ProjectCard } from './ProjectCard';
import '../styles/myProjects.css';

export const ProjectsList = ({projects = [], title = ''}: any) => {

    return (
        <div style={{
            width: '100%',
            marginTop: 25,
            backgroundColor: '#f5f5f5',
            padding: '10px 15px',
            borderRadius: 6,
            overflow: 'scroll'
        }}>
            <h3>{ title }</h3>
            {
                projects.filter((project: any) => project.status === title).map((project: any) => (
                    <ProjectCard project={ project } />
                ))
            }
        </div>
    );
}
