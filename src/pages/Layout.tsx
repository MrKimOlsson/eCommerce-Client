import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import '../styles/globalStyles.scss';
import { Footer } from '../components/layout/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;