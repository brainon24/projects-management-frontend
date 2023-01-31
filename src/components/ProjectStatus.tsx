import React from 'react'
import { Box } from '@mui/system';

export const ProjectStatus = ({ status }: any) => {
    return (
        <Box>
            {
                status === 'Pendiente' && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <div 
                            style={{
                                backgroundColor: '#cecece',
                                width: 8,
                                height: 8,
                                borderRadius: 100,
                                marginRight: 5,
                            }} 
                        />
                        <p
                            style={{
                                fontSize: 14
                            }}
                        >
                            { status }
                        </p>
                    </Box>
                )
            }

            {
                status === 'En progreso' && (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '135px',
                    }}>
                        <div 
                            style={{
                                backgroundColor: 'var(--lightBlue)',
                                width: 8,
                                height: 8,
                                borderRadius: 100,
                                marginRight: 5
                            }} 
                        />
                        <p
                            style={{
                                fontSize: 14,
                            }}
                        >
                            { status }
                        </p>
                    </Box>
                )
            }

            {
                status === 'Completado' && (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '135px',
                    }}>
                        <div 
                            style={{
                                backgroundColor: 'var(--green)',
                                width: 8,
                                height: 8,
                                borderRadius: 100,
                                marginRight: 5
                            }} 
                        />
                        <p
                            style={{
                                fontSize: 14,
                            }}
                        >
                            { status }
                        </p>
                    </Box>
                )
            }
        </Box>
    );
}
