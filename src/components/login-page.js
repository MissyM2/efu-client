import React from 'react';

import './css/home-page.css';

//import LoginForm from './login-form';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields:{},
            errors: {}
        };
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        // Username
        errors["username"] = "";
        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "Username cannot be empty.";
        }

        if (typeof fields["username"] !== "undefined") {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fields["username"]))){
                formIsValid = false;
                errors["username"]="Username must be in email format.";
            }
        }

        // Password
        errors["password"] = "";
        if(!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Password cannot be empty.";
        }

        if (typeof fields["password"] !== "undefined") {
            //const letterNumberPattern = "/^([a-zA-Z0-9]+)$/";
            
            if (!fields["password"].length > 8) {
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
        if(this.handleValidation()){
            this.props.submitlogin(this.state.fields.username, this.state.fields.password);
          }else{
            console.log("form is : False", this.handleValidation());
         }

    }


    render() {
            return (
                <div className="login-reg-container">
                    <div className="login-reg-content">
                            <div className="login-reg-unit">
                                    <form action="/" onSubmit={this.loginSubmit.bind(this)} >
                                    <h3 className="heading">Login</h3>
                                    <div className={this.props.error ? "error-msg" : ""}>{this.props.error}</div>
                                    <div className="input-row">
                                        <div className="input-unit">
                                                <input
                                                    className={this.state.errors["username"] ? "error": ""}
                                                    refs="username"
                                                    placeholder="Username"
                                                    type="text"
                                                    size= "30"
                                                    onChange={this.handleChange.bind(this, "username")}
                                                    value={this.state.fields["username"]}
                                                    aria-label="username"
                                                />
                                                <div className="error-msg">{this.state.errors["username"]}</div>
                                        </div>
                                    </div>
                                    <div className="input-row">
                                        <div className="input-unit">
                                                <input
                                                    className={this.state.errors["password"] ? "error": ""}
                                                    refs="password"
                                                    placeholder="Password"
                                                    type="password"
                                                    size="30"
                                                    name="password"
                                                    onChange={this.handleChange.bind(this, "password")}
                                                    value={this.state.fields["password"]}
                                                    aria-label="password"
                                                />
                                                <div className="error-msg">{this.state.errors["password"]}</div>
                                        </div>
                                    </div>
                                    <div className="test-user-unit">
                                        <div className="test-user-title">Test User:  </div>
                                        <div className="test-user-info">
                                            <div>username:  sarah@gmail.com</div>
                                            <div>password:  sarah9515</div>
                                        </div>
                                    </div>
                                    <div className="button-row">
                                        <button type="submit" className="green-btn btn-small">Login</button>
                                    </div>
                                </form>
                        </div>
                        <div className="login-other-unit">
                                    <div className="instructions-small">
                                        <div>Don't have an account?</div>
                                        <div>
                                            <button className="green-btn btn-small button-row" type="button" onClick={e => this.props.setlogin(e)}>
                                            Create One
                                            </button>      
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
                
            ); 
        } 
}

export default LoginPage;

 //onSubmit={(username, password) => this.props.submitlogin(this.state.user.username, this.state.user.password)}

