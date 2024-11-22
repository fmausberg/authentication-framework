// src/pages/MyProfile.js
import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // Import your custom axios instance

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/appuser/me'); // Use your axios instance to fetch user data
                
                if (response.status !== 200) {
                    throw new Error('Failed to fetch user data'); // Throw error if response is not OK
                }

                setUser(response.data); // Set user data to state
            } catch (error) {
                setError(error.message); // Set error message to state
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error if fetching fails
    }

    if (!user) {
        return <div>No user data found. Please log in.</div>; // If no user data, prompt login
    }

    // Render user profile data
    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Public Name:</strong> {user.publicName || '-'}</p>
            <p><strong>First Name:</strong> {user.firstName || '-'}</p>
            <p><strong>Last Name:</strong> {user.lastName || '-'}</p>
            <p><strong>Birthday:</strong> {user.birthday ? new Date(user.birthday).toLocaleDateString('en-GB').replace(/\//g, '.') : '-'}</p>
            <p><strong>Email:</strong> {user.mail}</p>
            <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString('en-GB').replace(/\//g, '.') }</p>
            <p><strong>Email Verified At:</strong> {user.mailVerifiedAt ? new Date(user.mailVerifiedAt).toLocaleDateString('en-GB').replace(/\//g, '.') : 'Not verified'}</p>
            <p><strong>Verification Token Created At:</strong> {new Date(user.verificationTokenCreatedAt).toLocaleDateString('en-GB').replace(/\//g, '.')}</p>
            <p><strong>Source:</strong> {user.source || '-'}</p>
            <p><strong>Roles:</strong> {user.roles.join(', ')}</p>
            <p><strong>OAuth Provider ID:</strong> {user.oauthProviderID || '-'}</p>
        </div>
    );
};

export default MyProfile;
