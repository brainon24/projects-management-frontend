import { ProjectStatus } from './ProjectStatus';
import { Box } from '@mui/material';
import useFormatDate from '../hooks/useFormatDate';

export const ProjectCard = ({ project }: any) => {

    const { formatDate } = useFormatDate();

    return (
        <div key={project._id} className='each-project-mp'>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <p
                    style={{
                        fontWeight: 600,
                        fontSize: 18,
                    }}
                >
                    { project.title.length >= 30 ? project.title.substring(0, 29) + '...' : project.title }
                </p>
                <ProjectStatus status={ project.status } />
            </Box>
            <p
                style={{
                    fontWeight: 400,
                    fontSize: 13,
                    color: 'var(--grayDark)',
                    paddingTop: 0
                }}
            >
                {
                    formatDate(project.createdAt, project.title)
                }
            </p>
            {/* <div dangerouslySetInnerHTML={{ __html: project.description }} /> //TODO: Check it */}

            <p style={{ marginTop: 15 }}>ID: { project._id }</p>
        </div>
    );
}
