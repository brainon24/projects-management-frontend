import { Chip } from '@mui/material';
import { MainLayout } from '../layouts/MainLayout';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoMdBusiness } from 'react-icons/io';

import '../styles/administrativeManagement.css';
import { Link as LinkRRD } from 'react-router-dom';

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

            <div className='container-btns-management-am'>
                <div>
                    <p className='p-message-am'>Por favor selecciona una opción. 👇</p>
                    <div className='container-flex-btns'>
                        <LinkRRD to='/private/management-accounts'>
                            <div className='btn-management-am'>
                                <span className='container-icon-management-am'>
                                    <HiOutlineUserCircle className='icon-management-am' />
                                </span>
                                <p className='p-management-am'>Gestionar Usuarios</p>
                            </div>
                        </LinkRRD>

                        <LinkRRD to='/private/management-business'>
                            <div className='btn-management-am'>
                                <span className='container-icon-management-am'>
                                    <IoMdBusiness className='icon-management-am' />
                                </span>
                                <p className='p-management-am'>Gestionar Negocios</p>
                            </div>
                        </LinkRRD>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
