// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../contexts/AuthContext'; // Import the authentication context

function Login() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login function from context

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/directlogin', { mail, password });
            const { jwttoken } = response.data;
            localStorage.setItem('jwttoken', jwttoken);

            // Call login function from context
            login({ 
                mail, 
                firstName: response.data.appUser.firstName, 
                lastName: response.data.appUser.lastName, 
                roles: response.data.appUser.roles 
            });
            navigate('/me');
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div name="loginform">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;
