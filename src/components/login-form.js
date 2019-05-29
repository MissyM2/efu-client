import React from 'react';
import './css/login-form.css';

const LoginForm = ({ onSubmit, onChange, errors, user}) =>  (
 
        <div>
            <div>
                <form action="/" onSubmit = {e => {e.preventDefault(); onSubmit()}} >
                    <h3 className="heading">Login</h3>

                    {errors.summary && <p className="error-message">{errors.summary}</p>}

                    
                    <div className="form-row">
                        <label>Username:</label>
                        <input
                            placeholder="username"
                            type="text"
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
                        <button type="submit" className="btn is-primary">Login</button>
                    </div>
                </form>
                
            </div>
        </div>
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

