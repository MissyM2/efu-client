import React, {useState} from 'react';
import { AuthCalls } from '../auth-calls';

import Navbar from './navbar';

const RegistrationPage = props => {
    const [name, setname] = useState(null);
    const [email, setemail] = useState(null);
    const [password, setpassword] = useState(null);

    async function onRegister() {
        try {
            await AuthCalls.register(name, email, password);
            props.history.replace("/dashboard");
        } catch (error) {
            alert(error.message);
        }
    }
   
    return (
        <main>
            <Navbar {...props} />
            <div className="container">
                <h2>ExecutiveFollowup Register</h2>
                <form onSubmit={e => e.preventDefault() && false}>
                    <div className="input-field">
                        <input
                            placeholder="username"
                            type="text"
                            value={name}
                            aria-label="username"
                            onChange = {e => setname(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="email"
                            type="email"
                            value={email}
                            aria-label="email"
                            onChange={e => setemail(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="password"
                            type="password"
                            value={password}
                            aria-label="password"
                            onChange={e => setpassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="button is-primary"
                        onClick={onRegister}
                    >
                        Register
                    </button>
                </form>
            </div>
        </main>
    );
}



export default RegistrationPage;
