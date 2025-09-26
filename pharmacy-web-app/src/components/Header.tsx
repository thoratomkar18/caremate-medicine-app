import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <h1>Pharmacy Web App</h1>
            <nav>
                <ul>
                    <li><Link to="/all-categories">All Categories</Link></li>
                    <li><Link to="/prescription-medicines">Prescription Medicines</Link></li>
                    <li><Link to="/health-devices">Health Devices</Link></li>
                    <li><Link to="/personal-care">Personal Care</Link></li>
                    <li><Link to="/baby-care">Baby Care</Link></li>
                    <li><Link to="/offers">Offers</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;