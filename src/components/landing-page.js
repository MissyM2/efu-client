import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const LandingPage =() => (
    <div>hello
        <div className="top-bar">hello there
            <div className="top-bar-left">asdfasf
                <Link to="/">React App</Link>
            </div>
            
            <div className="top-bar-right">hello
                <Link to="/login">Log in</Link>
                <Link to="/register">Sign up</Link>
            </div>
        </div>
        child components that change will appear here
    </div>
);
/*
Base.propTypes = {
    children: PropTypes.object.isRequired
};
*/
export default LandingPage;