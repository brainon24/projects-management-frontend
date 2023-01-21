import { useSelector } from "react-redux";
import { MainLayout } from '../layouts/MainLayout';
import { PrivateClient } from "../components/private/PrivateClient";
import { PrivateUser } from "../components/private/PrivateUser";
import { PrivateEmployee } from '../components/private/PrivateEmployee';

export const Private = () => {

    const { user } = useSelector((state: any) => state.auth);

    return (
        <>
            <MainLayout>
                {
                    user.role === 'USER' && <PrivateUser />
                }

                {
                    user.role === 'CLIENT' && <PrivateClient />
                }

                {
                    user.role === 'EMPLOYEE' && <PrivateEmployee />
                }
            </MainLayout>

        </>
    )
}
