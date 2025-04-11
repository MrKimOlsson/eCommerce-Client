import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { NavLink, useNavigate } from 'react-router';
import '../styles/forms/form.scss'


const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await registerUser(username, password);
            navigate('/login'); // Redirect to login page after registration
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <section className='section'>
            <div className='column'>
                <h2>Register</h2>
                <form  className="border" onSubmit={handleRegister}>
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
                    <button className="form-button" type="submit">Register</button>

                    <p>Already have an account?</p>
                    <NavLink to="/login">Login</NavLink>
                </form>
            </div>
        </section>

    );
};

export default RegisterPage;