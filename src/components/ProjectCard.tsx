import { ProjectStatus } from './ProjectStatus';
import { Box } from '@mui/material';
import { useDispatch, } from 'react-redux';
import useFormatDate from '../hooks/useFormatDate';
import { findProjectOneReducer } from '../store/projects/projectsSlice';

import { TbExternalLink } from 'react-icons/tb'
import { Link as LinkRRD } from 'react-router-dom';

export const ProjectCard = ({ project }: any) => {

    const { formatDate } = useFormatDate();
    
    const dispatch = useDispatch()

    return (
        <div>
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
                            cursor: 'pointer',
                        }}
                        onClick={ () => dispatch( findProjectOneReducer(project) ) }
                    >
                        { project.title.length >= 27 ? project.title.substring(0, 27) + '...' : project.title }
                    </p>
                    <ProjectStatus status={ project.status } />
                </Box>
                <p
                    style={{
                        fontWeight: 400,
                        fontSize: 13,
                        color: 'var(--grayDark)',
                        paddingTop: 0,
                        cursor: 'pointer'
                    }}
                    onClick={ () => dispatch( findProjectOneReducer(project) ) }
                >
                    {
                        formatDate(project.createdAt)
                    }
                </p>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 15
                    }}
                >
                    <p>ID: { project._id }</p>
                    <LinkRRD to={`/private/project/${ project._id }`}>
                        <span>
                            <TbExternalLink
                                style={{
                                    fontSize: 20,
                                    cursor: 'pointer'
                                }}
                            />
                        </span>
                    </LinkRRD>
                </div>
            </div>
        </div>
    );
}
