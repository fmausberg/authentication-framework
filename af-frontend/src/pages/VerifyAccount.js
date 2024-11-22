import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

const VerifyAccount = () => {
    const [status, setStatus] = useState('Verifying...');
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const { login } = useAuth(); // Access login from AuthContext

    const hasVerified = useRef(false); // Ref to track if verification is already done

    useEffect(() => {
        const verifyToken = async () => {
            if (hasVerified.current) return; // Exit if already verified
            hasVerified.current = true;

            try {
                const response = await api.post('/auth/verifyMail', token, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.status === 200) {
                    const { jwttoken, appUser } = response.data;

                    // Save JWT token
                    localStorage.setItem('jwttoken', jwttoken);

                    // Update AuthContext with logged-in user details
                    login({
                        mail: appUser.mail,
                        firstName: appUser.firstName,
                        lastName: appUser.lastName,
                        roles: appUser.roles,
                    });

                    // Set status to success
                    setStatus('Verification successful! Hello ' + appUser.firstName);
                } else {
                    setStatus('Verification failed. The link may be invalid or expired.');
                }
            } catch (error) {
                setStatus('An error occurred during verification. Please try again later.');
            }
        };

        if (token) {
            verifyToken();
        } else {
            setStatus('Invalid token.');
        }
    }, [token, login]);

    return (
        <div>
            <p>{status}</p>
            {status === 'Verification successful! Hello' && (
                <p>
                    <Link to="/">Go to Home</Link>
                </p>
            )}
        </div>
    );
};

export default VerifyAccount;
