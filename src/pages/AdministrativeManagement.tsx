import { Chip } from '@mui/material';
import { MainLayout } from '../layouts/MainLayout';

export const AdministrativeManagement = () => {
    return (
        <MainLayout>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
                <h1>Gestión Administrativa</h1>
                <Chip
                    label='Only Admin'
                    className='fadeIn'
                    style={{ color: '#3483fa', backgroundColor: '#4189e626', marginLeft: 10, width: 93, height: 22 }}
                />
            </div>
        </MainLayout>
    );
}
