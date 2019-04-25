import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './registration-form';

import './css/registration-page.css';

export function RegistrationPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="registration-page">
            <h2>Register Here</h2>
            <RegistrationForm />
            <Link to="/">Login</Link>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.currentUser !== null,
    } 
};

export default connect(mapStateToProps)(RegistrationPage);
