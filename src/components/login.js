import React from 'react';
import './css/login.css';

export default class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
        this.submitLoginForm = this.submitLoginForm.bind(this);
    }
   
    submitLoginForm(e) {
        e.preventDefault();
        this.setState({
            username: e.currentTarget.email.value
        })
        console.log('this.state in login form ', this.state);

        let email = e.currentTarget.email.value;
        let password = e.currentTarget.password.value;
        this.props.submitlogin(email, password);
    }

    render() {
        console.log('in login form state', this.state);
        console.log('in login form ', this.props);

        return (
            <main>
                <div className="container">
                    <h2>Login</h2>
                    <div className="login-form">
                        <form onSubmit={this.submitLoginForm}>
                            <div className="input-field">
                                <input  
                                    placeholder="email"
                                    type="text"
                                    name="email"
                                    value="sarah@gmail.com"
                                    className="validate"
                                    aria-label="email"
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    value="sarah9515"
                                    className="validate"
                                    aria-label="password"
                                />
                            </div>
    
                            <button type="submit" className="btn is-primary">
                                Sign In
                            </button>
                        </form>
                    
                    </div>
                    
                </div>
            </main>
        );

    }
    
    
}