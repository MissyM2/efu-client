import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit, onChange, errors, user}) =>  (
 
        <main>
            <div className="container">
                <h2>ExecutiveFollowup Login</h2>
                <form action="/" onSubmit={onSubmit}>
                    <h3 className="heading">Login</h3>

                    {errors.summary && <p className="error-message">{errors.summary}</p>}

                    
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
                        <button type="submit" className="btn is-primary">Login</button>
                    </div>

                    <div>Do not have an account? <Link to={'/register'}>Create One</Link></div>
                </form>
            </div>
        </main>
    );
/*
    LoginForm.propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    };
*/
    export default LoginForm;

