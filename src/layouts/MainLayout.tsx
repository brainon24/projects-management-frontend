import * as React from "react";
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

export const MainLayout = ({ children }: any) => {

    return (
        <div style={{
            backgroundColor: '#fafafa',
            height: '100vh',
            overflowY: 'scroll'
        }}>
            <nav>
                <Navbar />
            </nav>

            <Sidebar />

            <main style={{
                margin: '0px auto',
                maxWidth: '1440px',
                padding: '0px 30px',
            }}>
                { children }
            </main>
        </div>
    );
}
