import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import '../styles/globalStyles.scss';
import { Footer } from '../components/layout/Footer';
import SearchBar from '../components/layout/SearchBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <SearchBar />
            <Footer />
        </div>
    );
};

export default Layout;