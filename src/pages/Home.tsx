import { MainLayout } from '../layouts/MainLayout';
import { useDispatch } from 'react-redux';


export const Home = () => {
    const dispatch: any = useDispatch();

    return (
        <MainLayout>
            <h1>Home</h1>
        </MainLayout>
    )
}
