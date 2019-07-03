import React from 'react';

import './css/home-page.css';

//import LoginForm from './login-form';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields:{
                username:"",
                password: ""
            },
            errors: {}
        };
    }

    handleValidation() {
        let username = this.state.fields["username"];
        let pass = this.state.fields["password"];
        let errors = {};
        let formIsValid = true;
        let regularExpression = /\S+@\S+\.\S+/;

        // Username
        errors["username"] = "";
        if (!username) {
            formIsValid = false;
            errors["username"] = "Username cannot be empty.";
        }

        if (typeof username !== "undefined") {
                formIsValid = regularExpression.test(username.toLowerCase());
                if (!formIsValid) {
                    errors["username"]="Username must be in email format.";
                }   
        }

        // Password
        errors["password"] = "";
        if(!pass) {
            formIsValid = false;
            errors["password"] = "Password cannot be empty.";
        }

        if (typeof pass !== "undefined") {
            if (!pass.length > 8) {
                formIsValid = false;
                errors["password"] = "Password must be at least 8 characters long."
            }

        }
        this.setState({
            errors:errors
        });
        return formIsValid;
    }
 
    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field]= e.target.value;
        this.setState({fields});
    }

    loginSubmit(e) {
        e.preventDefault();
        let username = this.state.fields.username.toLowerCase();
        let password = this.state.fields.password;
        username.toLowerCase()
        if(this.handleValidation()){
            this.props.submitlogin(username, password);
          }

    }


    render() {
            return (
                <div className="login-reg-container">
                    <div className="login-reg-content">
                            <div className="login-reg-unit">
                                <form action="/" onSubmit={this.loginSubmit.bind(this)} >
                                    <h2 className="heading">Login</h2>
                                    <div className={this.props.error ? "message-style" : ""}>{this.props.error}</div>
                                    <div className="input-row">
                                        <div className="input-unit">
                                                <input
                                                    className={this.state.errors["username"] ? "error": ""}
                                                    ref="username"
                                                    placeholder="Username"
                                                    type="text"
                                                    size= "30"
                                                    onChange={this.handleChange.bind(this, "username")}
                                                    value={this.state.fields["username"]}
                                                    aria-label="username"
                                                />
                                                <div className="message-style">{this.state.errors["username"]}</div>
                                        </div>
                                    </div>
                                    <div className="input-row">
                                        <div className="input-unit">
                                                <input
                                                    className={this.state.errors["password"] ? "error": ""}
                                                    ref="password"
                                                    placeholder="Password"
                                                    type="password"
                                                    size="30"
                                                    name="password"
                                                    onChange={this.handleChange.bind(this, "password")}
                                                    value={this.state.fields["password"]}
                                                    aria-label="password"
                                                />
                                                <div className="message-style">{this.state.errors["password"]}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="button-row">
                                        <button type="submit" className="green-btn btn-med fivepx-margin">Login</button>
                                    </div>
                                </form>
                            </div>
                            <div className="login-other-unit">
                                    <div className="login-reg-instructions">
                                        <h4>Don't have an account?</h4>
                                        <div>
                                            <button className="green-btn btn-med fivepx-margin" type="button" onClick={e => this.props.setlogin(e)}>
                                                Create One
                                            </button>      
                                        </div>
                                    </div>
                            </div>
                    </div>
                    <div className="test-user-unit">
                                <div className="test-user-title">Test User:  </div>
                                <div className="test-user-info">
                                    <div>username:  sarah@gmail.com</div>
                                    <div>password:  sarah9515</div>
                                </div>
                    </div>
                    
                </div>
                
            ); 
        } 
}

export default LoginPage;


