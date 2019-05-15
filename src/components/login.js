import React from 'react';

import NavBar from './navbar';

export default function Login(props) {
   
    function submitLoginForm(e) {
        e.preventDefault();

        let email = e.currentTarget.email.value;
        let password = e.currentTarget.password.value;
        props.submitLogin(email, password);
    }
    
    return (
        <main>
           <NavBar />
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={submitLoginForm}>
                    <div className="input-field">
                        <input  
                            placeholder="email"
                            type="text"
                            name="email"
                            className="validate"
                            aria-label="email"
                        />
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="password"
                            type="password"
                            name="password"
                            className="validate"
                            aria-label="password"
                        />
                    </div>

                    <button type="submit" className="button is-primary">
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    );
}