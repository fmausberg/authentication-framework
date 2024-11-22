// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';
import { Helmet } from 'react-helmet';

function Header() {
    const { user, logout } = useAuth();

    return (
        <header>
            <Helmet>
                <title>Authentication Framework</title>
            </Helmet>
            <nav className="navbar">
                <ul className="nav-left">
                    <li className="menuitem"><Link to="/">Home</Link></li>
                    <li className="menuitem"><Link to="/impressum">Impressum</Link></li>
                    <li className="menuitem"><Link to="/check">Check</Link></li>
                    {user && (
                        <>
                           
                        </>
                    )}
                </ul>
                <ul className="nav-right">
                    {user ? (
                        <>
                            <li className="menuitem"><Link to="/me">My Userdetails</Link></li>
                            <li className="menuitem"><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li className="menuitem"><Link to="/login">Login</Link></li>
                            <li className="menuitem"><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;

