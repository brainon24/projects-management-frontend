import { useEffect, useState } from 'react';
import { MainLayout } from "../layouts/MainLayout";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { BiTime } from 'react-icons/bi';
import { ProjectsList } from '../components/ProjectsList';
import { NoContent } from '../components/NoContent';
import { Role } from '../enums/user-role.enum';
import projectsManagement from '../api/api';
import Loading from '../components/Loading';

import '../styles/myProjects.css';

type FilterType = 'all' | 'my-projects' | 'my-business' | 'assigned-to-me';

interface FilterOption {
    value: FilterType;
    label: string;
    description: string;
    adminOnly?: boolean;
}

const filterOptions: FilterOption[] = [
    {
        value: 'all',
        label: 'Todos los Proyectos',
        description: 'Ver todos los proyectos del sistema',
        adminOnly: true
    },
    {
        value: 'my-projects',
        label: 'Mis Proyectos',
        description: 'Proyectos de los que soy dueño'
    },
    {
        value: 'my-business',
        label: 'Proyectos de mi Negocio',
        description: 'Proyectos de mi empresa'
    },
    {
        value: 'assigned-to-me',
        label: 'Proyectos Asignados',
        description: 'Proyectos donde soy responsable'
    }
];

export const Projects = () => {
    const { user } = useSelector((state: any) => state.auth);
    const location = useLocation();
    
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('my-projects');
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const availableFilters = filterOptions.filter(option => 
        !option.adminOnly || user.role === Role.ADMIN
    );

    const getCurrentProjects = () => {
        return projects;
    };

    const getCurrentTitle = () => {
        const option = filterOptions.find(opt => opt.value === selectedFilter);
        return option?.label || 'Proyectos';
    };

    const getNoContentMessage = () => {
        switch (selectedFilter) {
            case 'all':
                return "Aún no hay proyectos creados en el sistema.";
            case 'my-projects':
                return "Aún no tienes proyectos creados, si deseas pulsa el botón👇 para crear uno!";
            case 'my-business':
                return "Aún no tienes proyectos creados en tu negocio, si deseas pulsa el botón👇 para crear uno!";
            case 'assigned-to-me':
                return "Aún no tienes proyectos asignados, pulsa el botón👇 para volver!";
            default:
                return "No se encontraron proyectos.";
        }
    };

    const getNoContentButton = () => {
        switch (selectedFilter) {
            case 'my-projects':
            case 'my-business':
                return {
                    messageButton: 'Crear Proyecto',
                    urlRedirect: '/private/create-project'
                };
            case 'all':
                return {
                    messageButton: 'Crear Proyecto',
                    urlRedirect: '/private/create-project'
                };
            case 'assigned-to-me':
            default:
                return {
                    messageButton: 'Ir a Mi Panel',
                    urlRedirect: '/private'
                };
        }
    };

    const loadProjects = async (filter: FilterType) => {
        setIsLoading(true);
        setError(null);

        try {
            let response;
            
            switch (filter) {
                case 'all':
                    response = await projectsManagement.get('/project/findAll/');
                    break;
                case 'my-projects':
                    response = await projectsManagement.get(`/project/findByUserId/${user._id}`);
                    break;
                case 'my-business':
                    if (user.business?.businessId) {
                        response = await projectsManagement.get(`/project/findByBusinessId/${user.business.businessId}`);
                    } else {
                        setProjects([]);
                        setIsLoading(false);
                        return;
                    }
                    break;
                case 'assigned-to-me':
                    response = await projectsManagement.get(`/project/findByResponsibleId/${user._id}`);
                    break;
                default:
                    setProjects([]);
                    setIsLoading(false);
                    return;
            }

            if (response?.data) {
                setProjects(response.data);
            } else {
                setProjects([]);
            }
        } catch (error: any) {
            console.error('Error loading projects:', error);
            setError(error.response?.data?.message || 'Error al cargar los proyectos');
            setProjects([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (newFilter: FilterType) => {
        setSelectedFilter(newFilter);
        loadProjects(newFilter);
    };

    useEffect(() => {
        loadProjects(selectedFilter);
    }, []);

    // Detectar si viene de una eliminación exitosa y mostrar toast
    useEffect(() => {
        if (location.state?.showSuccessToast) {
            toast.success(location.state.message || 'Operación completada exitosamente');
            // Limpiar el state para evitar que se muestre de nuevo
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const currentProjects = getCurrentProjects();
    const currentTitle = getCurrentTitle();
    const noContentProps = getNoContentButton();

    if (isLoading) {
        return (
            <MainLayout>
                <Loading />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}>
                    <h1>{currentTitle}</h1>
                    {selectedFilter === 'all' && (
                        <Chip
                            label='Solo Admin'
                            className='fadeIn'
                            style={{ 
                                color: '#3483fa', 
                                backgroundColor: '#4189e626', 
                                marginLeft: 10, 
                                width: 93, 
                                height: 22 
                            }}
                        />
                    )}
                </div>

                <FormControl variant="outlined" size="small" style={{ minWidth: 250 }}>
                    <InputLabel id="projects-filter-label">Filtrar por</InputLabel>
                    <Select
                        labelId="projects-filter-label"
                        value={selectedFilter}
                        onChange={(e) => handleFilterChange(e.target.value as FilterType)}
                        label="Filtrar por"
                        disabled={isLoading}
                    >
                        {availableFilters.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                <div>
                                    <div style={{ fontWeight: 500 }}>{option.label}</div>
                                    <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                                        {option.description}
                                    </div>
                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {error && (
                <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#fee', 
                    border: '1px solid #fcc', 
                    borderRadius: '4px', 
                    marginBottom: '20px',
                    color: '#c33'
                }}>
                    Error: {error}
                </div>
            )}

            {currentProjects.length <= 0 && !error ? (
                <div>
                    <NoContent
                        message={getNoContentMessage()}
                        icon={<BiTime />}
                        messageButton={noContentProps.messageButton}
                        urlRedirect={noContentProps.urlRedirect}
                    />
                </div>
            ) : (
                <div className="container-list-projects-mp">
                    <ProjectsList
                        projects={currentProjects}
                        title='Pendiente'
                    />

                    <ProjectsList
                        projects={currentProjects}
                        title='En progreso'
                    />

                    <ProjectsList
                        projects={currentProjects}
                        title='Completado'
                    />
                </div>
            )}
        </MainLayout>
    );
};