import {MainLayout} from "../layouts/MainLayout";
import { useSelector } from 'react-redux';

import '../styles/myBusiness.css';
import { Chip } from "@mui/material";

export const MyBusiness = () => {

    const { user } = useSelector((state: any) => state.auth);

    return (
        <MainLayout>
            <h1>Mi negocio</h1>

            <div className="container-mb">
                <h3>
                    { user.business.businessName }
                </h3>
                <Chip
                    label='Beta'
                    className='fadeIn'
                    style={{ color: 'var(--darkPink)', backgroundColor: 'var(--lightPink)', marginLeft: 10, width: 55, height: 22 }}
                />
            </div>
        </MainLayout>
    );
}