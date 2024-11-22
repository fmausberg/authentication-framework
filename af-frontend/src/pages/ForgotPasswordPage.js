// src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordResetRequest = async () => {
        setLoading(true);
        try {
            await api.post('/auth/requestnewpassword', email);
            toast.success('Password reset instructions have been sent.');
            navigate('/login'); // Redirect to the login page after request
        } catch (error) {
            toast.error('Failed to send password reset link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Request Password Reset</h2>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button onClick={handlePasswordResetRequest} disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
        </div>
    );
};

export default ForgotPasswordPage;
