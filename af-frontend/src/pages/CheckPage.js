// src/pages/CheckPage.js
import React, { useEffect, useState} from 'react';
import api from '../api/axios';

function CheckPage(){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the endpoint
        api.get('/test/check')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError("Failed to fetch data.");
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <h1>Check:</h1>
            {error ? (
                <div style={{ color: 'red' }}>{error}</div> // Display error if it exists
            ) : (
                <div>
                    <p>Database: {data?.database || '...'}</p>
                    <p>Backend: {data?.backend || '...'}</p>
                </div>
            )}
        </div>
    );
}

export default CheckPage;
