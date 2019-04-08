import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import './css/index.css';
import Weeks from './weeks';
//import Profile from './profile';

export default function MainNav(props) {
    return (
            <nav id="top-nav" role="navigation">
                <h3 id="nav-logo">ExecFollowup</h3>
                <h3 id="view-past-weeks">
                <Link to="./weeks">Weeks</Link></h3>
                <h3 id="update-profile"><Link to="./profile">Profile</Link></h3>
                <h3 id="logout">Logout</h3>
            </nav>
        
    );
}



    
   