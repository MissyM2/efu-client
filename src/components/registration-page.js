import React from 'react';

import './css/home-page.css';

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                firstName:"",
                lastName:"",
                username:"",
                password:""
            },
            errors: {}
            }
        };


    handleValidation() {
        let firstName = this.state.fields.firstName.trim();
        let lastName = this.state.fields.lastName.trim();
        let username = this.state.fields.username.toLowerCase().trim();
        let password = this.state.fields.password.trim();
        console.log('inside handleValidation', firstName + ' ' + lastName + ' ' + username + ' ' + password);
        /*
        let firstname = this.state.fields["firstName"];
        let lastname = this.state.fields["lastName"];
        let username = this.state.fields["username"];
        let password = this.state.fields["password"];
        */

        console.log()
        let errors = {};
        let formIsValid = true;
        let regularExpression = /\S+@\S+\.\S+/;

        // Firstname
        errors["firstName"] = "";
        if (!firstName) {
            formIsValid = false;
            errors["firstName"] = "Firstname cannot be empty.";
        }

        // Lastname
        errors["lastName"] = "";
        if (!lastName) {
            formIsValid = false;
            errors["lastName"] = "Lastname cannot be empty.";
        }


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
        if(!password) {
            formIsValid = false;
            errors["password"] = "Password cannot be empty.";
        }

        if (typeof password !== "undefined") {
            
            if (!password.length > 8){
                formIsValid = false;
                errors["password"] = "Password must be at least 8 characters long.";
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
        this.setState({
            fields
        });
    }

    registrationSubmit(e) {
        e.preventDefault();
        let firstName = this.state.fields.firstName.trim();
        let lastName = this.state.fields.lastName.trim();
        let username = this.state.fields.username.toLowerCase().trim();
        let password = this.state.fields.password.trim();
        console.log('inside registrationSubmit', firstName + ' ' + lastName + ' ' + username + ' ' + password);
        if(this.handleValidation()){
            this.props.submitregistration(firstName, lastName, username, password);
          }else{
            console.log("form is : False", this.handleValidation());
         }

    }

    render() {
        return (
            <div className="login-reg-container">
                <div className="login-reg-content">
                            <div className="login-reg-unit">
                                    <form action="/" onSubmit={this.registrationSubmit.bind(this)}>
                                            <h2 className="heading">Register</h2>
                                            <div className={this.props.error ? "message-style" : ""}>{this.props.error}</div>
                                            <div className="input-row">
                                                <div className="input-unit">
                                                            <input
                                                                className={this.state.errors["firstName"] ? "error": ""}
                                                                refs="firstName"
                                                                placeholder="Firstname"
                                                                type="text"
                                                                onChange={this.handleChange.bind(this, "firstName")}
                                                                value={this.state.fields["firstName"]}
                                                                aria-label="firstName"
                                                            />
                                                            <div className="message-style">
                                                                {this.state.errors["firstName"]}
                                                            </div>
                                                </div>
                                            </div>
                                            <div className="input-row">
                                                <div className="input-unit">
                                                            <input
                                                                className={this.state.errors["lastName"] ? "error":""}
                                                                refs="lastName"
                                                                placeholder="Lastname"
                                                                type="text"
                                                                onChange={this.handleChange.bind(this, "lastName")}
                                                                value={this.state.fields["lastName"]}
                                                                aria-label="lastName"
                                                            />
                                                            <div className="message-style">
                                                                {this.state.errors["lastName"]}
                                                            </div>
                                                </div>
                                            </div>
                                            <div className="input-row">
                                                <div className="input-unit">
                                                            <input
                                                                className={this.state.errors["username"] ? "error":""}
                                                                refs="username"
                                                                placeholder="Username"
                                                                type="text"
                                                                onChange={this.handleChange.bind(this, "username")}
                                                                value={this.state.fields["username"]}
                                                                aria-label="username"
                                                            />
                                                            <div className="message-style">
                                                                {this.state.errors["username"]}
                                                            </div>
                                                </div>
                                            </div>
                                            <div className="input-row">
                                                <div className="input-unit">
                                                            <input
                                                                className={this.state.errors["password"] ? "error":""}
                                                                refs="password"
                                                                placeholder="Password"
                                                                type="password"
                                                                onChange={this.handleChange.bind(this, "password")}
                                                                value={this.state.fields["password"]}
                                                                aria-label="password"
                                                            />
                                                            <div className="message-style">
                                                                {this.state.errors["username"]}
                                                            </div>
                                                </div>
                                            </div>
                                            <div className="button-row">
                                        <button type="submit" className="green-btn btn-small" >Create New Account</button>
                                    </div>
                                    </form>
                            </div>

                            <div className="login-other-unit">
                                    <div className="instructions-small">
                                        <div>Already have an account?</div>
                                        <div>
                                            <button className="green-btn btn-small button-row" type="submit" onClick={e => this.props.setlogin(e)}>
                                                    Log In
                                            </button>      
                                        </div> 
                                    </div>
                            </div>

                </div>
            </div>
            );
    }  
}

export default RegistrationPage;
