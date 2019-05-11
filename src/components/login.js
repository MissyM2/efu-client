import React, { useState } from 'react';
import {Navbar} from './navbar';
//import {required, nonEmpty} from '../validators';

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login() {
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            // Reject any requests which don't return a 200 status, creating
            // errors which follow a consistent format
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(({authToken}) => {
                storeAuthInfo(authToken, dispatch)
                props.history.replace("/dashboard"))
            .catch(err => {
                const {code} = err;
                const message =
                    code === 401
                        ? 'Incorrect username or password'
                        : 'Unable to login, please try again';
                );

    };
    
    return (
        <main>
            <Navbar {...props} />
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={e => e.preventDefault() && false}>
                    <div className="input-field">
                        <input  
                            placeholder="email"
                            type="text"
                            value={email}
                            className="validate"
                            aria-label="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="password"
                            type="password"
                            value={password}
                            className="validate"
                            aria-label="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" cloassName="button is-primary" onClick={login}>
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    );
}