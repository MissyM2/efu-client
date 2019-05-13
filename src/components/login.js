import React, { useState } from 'react';
import AuthCalls from '../auth-calls';

import NavBar from './navbar';

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        try {
            await AuthCalls.login(email,password);
            props.history.replace("/dashboard");
        } catch (error) {
            alert(error.message);
        }
    }
   
    return (
        <main>
            <NavBar {...props} />
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