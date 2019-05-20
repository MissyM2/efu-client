import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = ({
    onSubmit,
    onChange,
    errors,
    user,
}) => (
        <main>
            <div className="container">
                <h2>ExecutiveFollowup Register</h2>
                <form action="/" onSubmit={onSubmit}>
                    <h3 className="heading">Sign Up</h3>

                    {errors.summary && <p className="error-message">{errors.summary}</p>}

                    <div className="field-line input-field">
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
                    <div className="field-line input-field">
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
                    <div className="field-line input-field">
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
                    <div className="field-line input-field">
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
                    <div className="button-line">
                        <button type="submit" className="btn is-primary" >Create New Account</button>
                    </div>

                    <div>Already have an account? <Link to={'/login'}>Log in</Link></div>
                </form>
            </div>
        </main>
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

