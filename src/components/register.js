import React from 'react';

import Navbar from './navbar';

export default function RegistrationPage(props) {

    function submitRegistrationForm(e) {
        e.preventDefault();
        let user = {
            firstName: e.currentTarget.firstname.value,
            lastName: e.currentTarget.lastname.value,
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value
        };
        props.submitRegistration(user);
    }
    
   
    return (
        <main>
            <Navbar {...props} />
            <div className="container">
                <h2>ExecutiveFollowup Register</h2>
                <form onSubmit={submitRegistrationForm}>
                    <div className="input-field">
                        <input
                            placeholder="firstname"
                            type="text"
                            name="firstname"
                            className="validate"
                            aria-label="firstname"
                        />
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="lastname"
                            type="text"
                            name="lastname"
                            className="validate"
                            aria-label="lastname"
                        />
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="username"
                            type="username"
                            name="username"
                            className="validate"
                            aria-label="username"
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
                    <button
                        type="submit"
                        className="button is-primary"
                    >
                        Register
                    </button>
                </form>
            </div>
        </main>
    );
}
