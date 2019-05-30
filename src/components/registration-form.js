import React from 'react';

import './css/home-page.css';

class RegistrationForm extends React.Component {

    render() {
        return (
            <React.Fragment>
                <form action="/" onSubmit={e => {e.preventDefault(); this.props.onSubmit()}}>
                    <h3 className="heading">Register</h3>

                    {this.props.errors.summary && <p className="error-message">{this.props.errors.summary}</p>}

                    <div className="form-row">
                        <label>First Name:</label>
                        <input
                            placeholder="firstname"
                            type="text"
                            name="firstName"
                            onChange={this.props.onChange}
                            className="validate"
                            defaultValue=""
                            aria-label="firstName"
                        />
                    </div>
                    <div className="form-row">
                        <label>Last Name:</label>
                        <input
                            placeholder="lastname"
                            type="text"
                            name="lastName"
                            onChange={this.props.onChange}
                            className="validate"
                            defaultValue=""
                            aria-label="lastName"
                        />
                    </div>
                    <div className="form-row">
                        <label>Username:</label>
                        <input
                            placeholder="username"
                            type="username"
                            name="username"
                            onChange={this.props.onChange}
                            className="validate"
                            defaultValue=""
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
                            defaultValue=""
                            aria-label="password"
                        />
                    </div>
                    <div className="button-row">
                        <button type="submit" className="btn is-primary" >Create New Account</button>
                    </div>
                    </form>
            </React.Fragment>
        );
    }
}
        

export default RegistrationForm;

