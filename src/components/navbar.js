import React from 'react';
import { Link } from 'react-router-dom';
import { AuthCalls } from '../auth-calls';

export default function NavBar(props) {

    function logOut(e) {
        try {
            AuthCalls.logOut();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <h1>
                        <img src="/logo.png" alt="ExecutiveFollowUp Logo" className="logo" />
                    </h1>
                </Link>
            {/* <a
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </> */}
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        {!AuthCalls.getCurrentUsername() ? (
                            <div className="buttons">
                                <Link className="button is-primary" to="/register">
                                    <strong>Sign up</strong>
                                </Link>
                                <Link className="button is-light" to="/login">
                                    Log in
                                </Link>
                            </div>
                        ) : (
                            <div className="buttons">
                                <Link className="button is-primary" to="/dashboard">
                                    dashboard
                                </Link>
                                <Link className="button is-primary" to="/profile">
                                    profile
                                </Link>
                                <a className="button is-light" href="/logout" onClick={logOut}>
                                    Log out
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}




    
   