import React from 'react';

import './css/home-page.css';

class LoginForm extends React.Component {

    render() {
        return (
            <React.Fragment>
                <form action="/" onSubmit = {e => {e.preventDefault(); this.props.onSubmit()}} >
                    <h3 className="heading">Login</h3>

                    {this.props.errors.summary && <p className="error-message">{this.props.errors.summary}</p>}

                    
                    <div className="form-row">
                        <label>Username:</label>
                        <input
                            placeholder="username"
                            type="text"
                            name="username"
                            onChange={this.props.onChange}
                            className="validate"
                            value={this.props.user.username}
                            aria-label="username"
                        />
                    </div>
                    <div className="form-row">
                        <label>Password:</label>
                        <input
                            placeholder="password"
                            type="password"
                            name="password"
                            onChange={this.props.onChange}
                            className="validate"
                            value={this.props.user.password}
                            aria-label="password"
                        />
                    </div>
                    <div className="button-row">
                        <button type="submit" className="btn is-primary">Login</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default LoginForm;
