import { useSelector } from "react-redux";
import { MainLayout } from '../layouts/MainLayout';
import { PrivateClient } from "../components/private/PrivateClient";
import { PrivateUser } from "../components/private/PrivateUser";
import { PrivateAlly } from '../components/private/PrivateAlly';
import { PrivateAdmin } from '../components/private/PrivateAdmin';

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
                    user.role === 'ALLY' && <PrivateAlly />
                }

                {
                    user.role === 'ADMIN' && <PrivateAdmin />
                }
            </MainLayout>

        </>
    )
}
