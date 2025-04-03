import { Route } from 'react-router';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { ProfilePage } from '../pages/ProfilePage';
import Layout from '../pages/Layout';
import AdminPage from '../pages/AdminPage';
import CheckoutPage from '../pages/CheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ProtectedRoutes from "../components/ProtectedRoutes";

const routes = [
    { path: '/', element: <HomePage /> },
    { path: '/products', element: <ProductPage /> },
    { path: '/cart', element: <CartPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/product/:id', element: <ProductPage /> },
    { path: '/admin', element: <AdminPage /> },
    { path: '/profile', element: <ProtectedRoutes><ProfilePage /></ProtectedRoutes> },
    { path: '/checkout', element:  <ProtectedRoutes><CheckoutPage /></ProtectedRoutes> },
    { path: '/order-confirmation', element: <ConfirmationPage />},
];

const getRoutes = () => {
    return routes.map((route, index) => (
        <Route 
            key={index} 
            path={route.path} 
            element={<Layout>{route.element}</Layout>} 
        />
    ));
}

export default getRoutes;