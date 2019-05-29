import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = ({ onSubmit, onChange, errors, user }) => (
        <div>
            <div>
                <form action="/" onSubmit={e => {e.preventDefault(); onSubmit()}}>
                    <h3 className="heading">Register</h3>

                    {errors.summary && <p className="error-message">{errors.summary}</p>}

                    <div className="form-row">
                        <label>First Name:</label>
                        <input
                            placeholder="firstname"
                            type="text"
                            name="firstname"
                            onChange={onChange}
                            className="validate"
                            value={user.firstName}
                            aria-label="firstname"
                        />
                    </div>
                    <div className="form-row">
                        <label>Last Name:</label>
                        <input
                            placeholder="lastname"
                            type="text"
                            name="lastname"
                            onChange={onChange}
                            className="validate"
                            value={user.lastName}
                            aria-label="lastname"
                        />
                    </div>
                    <div className="form-row">
                        <label>Username:</label>
                        <input
                            placeholder="username"
                            type="username"
                            name="username"
                            onChange={onChange}
                            className="validate"
                            value={user.username}
                            aria-label="username"
                        />
                    </div>
                    <div className="form-row">
                        <label>Password:</label>
                        <input
                            placeholder="password"
                            type="password"
                            name="password"
                            onChange={onChange}
                            className="validate"
                            value={user.password}
                            aria-label="password"
                        />
                    </div>
                    <div className="button-row">
                        <button type="submit" className="btn is-primary" >Create New Account</button>
                    </div>
                    </form>
            </div>
        </div>
    );
/*
    RegistrationForm.propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    };
*/
    export default RegistrationForm;

