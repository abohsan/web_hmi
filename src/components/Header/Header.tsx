// src/components/Header/Header.tsx

import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/DashboardPage">Dashboard</Link></li>
                    <li><Link to="/TanksPage">Tanks</Link></li>
                    <li><Link to="/SettingsPage">Settings</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
