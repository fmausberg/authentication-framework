// src/App.js
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import BrowserRouter here
import { setLogoutCallback } from './api/axios';
import { useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Impressum from './pages/ImpressumPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import MyProfile from './pages/MyProfilePage';
import VerifyAccount from './pages/VerifyAccountPage';
import CheckPage from './pages/CheckPage';

function App() {
	const { logout } = useAuth();

  const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
  };

  useEffect(() => {
    // Set the logout callback function when the component mounts
    setLogoutCallback(logout);
  }, [logout]);

	return (
		<div className="App">
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/impressum" element={<Impressum />} />
					<Route path="/check" element={<CheckPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/me" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
					<Route path="/verify" element={<VerifyAccount />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
