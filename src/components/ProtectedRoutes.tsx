import { PropsWithChildren, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoutes = ({ children }: PropsWithChildren) => {
    const { user, isLoading, refreshTokenHandler } = useAuth();
    const location = useLocation(); // Get the current location

    useEffect(() => {
        const initializeAuth = async () => {
            await refreshTokenHandler();
        };
        initializeAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If the user is not authenticated, redirect to login with the current location
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children; // Render protected content
};

export default ProtectedRoutes;
