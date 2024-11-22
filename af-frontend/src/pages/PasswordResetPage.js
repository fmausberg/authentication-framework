// src/pages/PasswordResetPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axios';
import { toast } from 'react-toastify';
import PasswordChangeForm from '../components/PasswordChangeForm';

const PasswordResetPage = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const { login } = useAuth();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [tokenProcessed, setTokenProcessed] = useState(false); // Track if token has been processed
    const token = new URLSearchParams(search).get('token'); // Extract token from URL

    useEffect(() => {
        // If token is already processed, avoid re-triggering the effect
        const loginWithToken = async () => {
            if (token && !tokenProcessed) {
                setTokenProcessed(true)
                try {
                    const response = await api.post('/auth/loginWithPasswordResetToken', token);
                    if (response.status === 200) {
                        const { jwttoken, appUser } = response.data;
                        localStorage.setItem('jwttoken', jwttoken);
                        localStorage.setItem('appUser', JSON.stringify(appUser));
                
                        // Call login function from context
                        login(appUser);
                    }
                } catch (error) {
                    toast.error('Link not valid!');
                    navigate('/'); // Redirect to login if token is invalid
                }
            }
        };
    
        loginWithToken();
    }, [token, navigate, login, tokenProcessed]); // The effect should only depend on the token

    const handlePasswordReset = async () => {
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        setLoading(true);
        try {
            const pwChangeResponse = await api.post('/auth/reset-password', password);
            localStorage.setItem('appUser', pwChangeResponse.data.appUser);
            toast.success('Password reset successful');
            navigate('/me');  // Redirect to profile page
        } catch (error) {
            toast.error('Password reset failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Reset Your Password</h2>
            <PasswordChangeForm
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
            />
            <button onClick={handlePasswordReset} disabled={loading}>
                {loading ? 'Processing...' : 'Reset Password'}
            </button>
        </div>
    );
};

export default PasswordResetPage;
