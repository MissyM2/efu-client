import React from 'react';
import './css/login.css';

import NavBar from './navbar';

export default function Login(props) {
   
    function submitLoginForm(e) {
        e.preventDefault();

        let email = e.currentTarget.email.value;
        let password = e.currentTarget.password.value;
        props.submitlogin(email, password);
    }
    
    return (
        <main>
            <NavBar />
            <div className="container">
                <h2>Login</h2>
                <div className="login-form">
                    <form onSubmit={submitLoginForm}>
                        <div className="input-field">
                            <input  
                                placeholder="email"
                                type="text"
                                name="email"
                                value="sarah@gmail.com"
                                className="validate"
                                aria-label="email"
                            />
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="password"
                                type="password"
                                name="password"
                                value="sarah9515"
                                className="validate"
                                aria-label="password"
                            />
                        </div>

                        <button type="submit" className="btn is-primary">
                            Sign In
                        </button>
                    </form>
                
                </div>
                
            </div>
        </main>
    );
}