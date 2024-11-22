import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // Import your custom axios instance

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(null); // Track which field is being edited
    const [updatedValues, setUpdatedValues] = useState({}); // Store updated attribute values

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

    const handleEditClick = (field) => {
        setEditing(field); // Set the field being edited
        setUpdatedValues({ ...updatedValues, [field]: user[field] }); // Pre-fill the field with current value
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedValues({ ...updatedValues, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await api.post('/appuser/updateme', updatedValues); // Update the user attributes
            if (response.status === 200) {
                setUser({ ...user, ...updatedValues }); // Update the user state with new values
                setEditing(null); // Close the edit frame
            }
        } catch (error) {
            setError('Failed to update attributes.');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error if fetching fails
    }

    if (!user) {
        return <div>No user data found. Please log in.</div>; // If no user data, prompt login
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>

            {/* Editable fields with edit buttons */}
            <div>
                <strong>Public Name:</strong> {editing === 'publicName' ? (
                    <div>
                        <input
                            type="text"
                            name="publicName"
                            value={updatedValues.publicName || user.publicName || ''}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSave}>Save</button>
                    </div>
                ) : (
                    <>
                        {user.publicName || '-'} <button onClick={() => handleEditClick('publicName')}>Edit</button>
                    </>
                )}
            </div>

            <div>
                <strong>First Name:</strong> {editing === 'firstName' ? (
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            value={updatedValues.firstName || user.firstName || ''}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSave}>Save</button>
                    </div>
                ) : (
                    <>
                        {user.firstName || '-'} <button onClick={() => handleEditClick('firstName')}>Edit</button>
                    </>
                )}
            </div>

            <div>
                <strong>Last Name:</strong> {editing === 'lastName' ? (
                    <div>
                        <input
                            type="text"
                            name="lastName"
                            value={updatedValues.lastName || user.lastName || ''}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSave}>Save</button>
                    </div>
                ) : (
                    <>
                        {user.lastName || '-'} <button onClick={() => handleEditClick('lastName')}>Edit</button>
                    </>
                )}
            </div>

            <div>
                <strong>Birthday:</strong> {editing === 'birthday' ? (
                    <div>
                        <input
                            type="date"
                            name="birthday"
                            value={updatedValues.birthday || user.birthday || ''}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSave}>Save</button>
                    </div>
                ) : (
                    <>
                        {user.birthday ? new Date(user.birthday).toLocaleDateString('en-GB').replace(/\//g, '.') : '-'} 
                        <button onClick={() => handleEditClick('birthday')}>Edit</button>
                    </>
                )}
            </div>

            {/* Other user details */}
            <p><strong>Email:</strong> {user.mail}</p>
            <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString('en-GB').replace(/\//g, '.')}</p>
            <p><strong>Email Verified At:</strong> {user.mailVerifiedAt ? new Date(user.mailVerifiedAt).toLocaleDateString('en-GB').replace(/\//g, '.') : 'Not verified'}</p>
            <p><strong>Verification Token Created At:</strong> {new Date(user.verificationTokenCreatedAt).toLocaleDateString('en-GB').replace(/\//g, '.')}</p>
            <p><strong>Source:</strong> {user.source || '-'}</p>
            <p><strong>Roles:</strong> {user.roles.join(', ')}</p>
            <p><strong>OAuth Provider ID:</strong> {user.oauthProviderID || '-'}</p>
        </div>
    );
};

export default MyProfile;
