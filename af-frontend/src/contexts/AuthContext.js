// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correctly importing jwt-decode
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const jwttoken = localStorage.getItem('jwttoken');
        if (jwttoken) {
            // Attempt to decode the jwttoken to extract user information
            try {
                const decodedToken = jwtDecode(jwttoken); // Decoding the JWT token
                const fetchedUser = { username: decodedToken.username }; // Adjust according to your token structure
                setUser(fetchedUser);
            } catch (error) {
                console.error('JWTToken is invalid or expired', error);
                localStorage.removeItem('jwttoken'); // Clear invalid token
                toast.error('Your session has expired. Please log in again.');
            }
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('jwttoken');
        toast.info('You have been logged out.');
        navigate('/'); // Redirect to home page on logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
            <ToastContainer /> {/* Add the toast container */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
