import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const Base =({ children }) => (
    <div>
        <div className="top-bar">
            <div className="top-bar-left">
                <Link to="/">React App</Link>
            </div>
            
            <div className="top-bar-right">
                <Link to="/login">Log in</Link>
                <Link to="/register">Sign up</Link>
            </div>
        </div>

        {children}
    </div>
);
/*
Base.propTypes = {
    children: PropTypes.object.isRequired
};
*/
export default Base;