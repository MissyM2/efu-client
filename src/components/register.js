import React, {useState} from 'react';

import Navbar from './navbar';

const RegistrationPage = props => {
    const [name, setname] = useState(null);
    const [email, setemail] = useState(null);
    const [password, setpassword] = useState(null);

    function onRegister() {
        fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .catch(err => {
                const {reason, message, location} = err;
                if (reason === 'ValidationError') {
                    // Convert ValidationErrors into SubmissionErrors for Redux Form
                    return Promise.reject(
                        new SubmissionError({
                            [location]: message
                        })
                    );
                }
            });
        };
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
