import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import { useLocation, useNavigate } from 'react-router';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Get the login function from context
    const location = useLocation(); // Get the location object
    const navigate = useNavigate(); // Use to navigate programmatically

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const successfulLogin = await login(username, password);
            console.log(successfulLogin);
            
            // Save user data and token to local storage
            localStorage.setItem('userData', JSON.stringify(successfulLogin.user));
            localStorage.setItem('token', successfulLogin.token); 

            // Check if there is a previous location to navigate to
            const from = location.state?.from || '/'; // Default to home if no previous page
            navigate(from, { replace: true }); // Navigate to the previous page or home
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
