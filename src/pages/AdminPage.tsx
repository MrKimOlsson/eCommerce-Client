import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import ProductManagement from '../components/admin/ProductManagement';
import CustomerManagement from '../components/admin/CustomerManagement';
import OrderManagement from '../components/admin/OrderManagement';
import '../styles/pages/admin.scss';

const AdminPage = () => {
    const [selectedComponent, setSelectedComponent] = React.useState<string>('products');

    const renderContent = () => {
        switch (selectedComponent) {
            case 'products':
                return <ProductManagement />;
            case 'customers':
                return <CustomerManagement />;
            case 'orders':
                return <OrderManagement />;
            default:
                return <ProductManagement />;
        }
    };

    return (
        <div className="admin-page" style={{ display: 'flex', height: '100vh' }}>
            <Sidebar setSelectedComponent={setSelectedComponent} />
            <div className="admin-content" style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminPage;