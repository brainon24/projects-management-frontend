import { MainLayout } from '../layouts/MainLayout';
import { useDispatch } from 'react-redux';
import { logout_thunk } from '../store/auth/thunks';


export const Home = () => {
    const dispatch: any = useDispatch();

    return (
        <MainLayout>
            <h1>Home</h1>
        </MainLayout>
    )
}
