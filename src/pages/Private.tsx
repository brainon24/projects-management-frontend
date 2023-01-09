import { useSelector } from "react-redux";
import { MainLayout } from '../layouts/MainLayout';

export const Private = () => {

    const { user } = useSelector((state: any) => state.auth);

    return (
        <MainLayout>
            <div>Welcome to Private - { user.fullName }</div>
        </MainLayout>
    )
}
