import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

export const MainLayout = ({ children }: any) => {
    return (
        <>
            <nav>
                <Navbar />
            </nav>

            <Sidebar />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                { children }
            </main>
        </>
    );
}
