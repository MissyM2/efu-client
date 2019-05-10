import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';

import './css/index.css';
import './css/landing-page.css';

export function LandingPage(props) {

    // if user is logged in, then redirect straight to user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return(
            <div className="landingPage">
                <h2> Welcome to ExecutiveFollowup</h2>

                <div>
                        <h3>Take charge of your academic life.</h3>
                        <h3>Plan and track your academic progress with small, achievable goals and collaborating with a mentor.</h3>
                </div>
                <div>
                    <h3>Login here</h3>
                    <LoginForm />
                    <button>
                        <Link to="/register">Register</Link>
                    </button>
                </div>
            </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);