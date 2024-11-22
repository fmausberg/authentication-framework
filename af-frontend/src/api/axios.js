// src/api/axios.js
import axios from 'axios';

let logoutCallback = null;

export const setLogoutCallback = (callback) => {
	logoutCallback = callback;
};

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Attach the Bearer token to each request if the token exists
api.interceptors.request.use(
	(config) => {
		const jwttoken = localStorage.getItem('jwttoken');
		if (jwttoken) {
			config.headers['Authorization'] = `Bearer ${jwttoken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Handle errors globally
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401 || error.response?.status === 403) {
            if (logoutCallback) {
                logoutCallback(); 
            } else {
                console.warn('logoutCallback is not set');
            }
		}
		return Promise.reject(error); // Forward the error for specific handling in components
	}
);

export default api;
