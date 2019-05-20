import React from 'react';
import RegistrationForm from './registration-form';
import {API_BASE_URL} from '../config';


class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);

        //set initial component state
        this.state = {
            errors: {},
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    changeUser(e) {
        const field = e.target.name;
        const user = this.state.user;
        user[field] = e.target.value;

        this.setState({
            user
        });
    }

    processForm(e) {
        e.preventDefault();

        console.log('firstName:', this.state.user.firstName);
        console.log('lastName:', this.state.user.lastName);
        console.log('username:', this.state.user.username);
        console.log('password:', this.state.user.password);
        const newuser = {
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            username: this.state.user.username,
            password: this.state.user.password
        }
        console.log(newuser);
        console.log("Clicked submit registration");
        fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newuser)
        })
        .then(response => {
            if(response.ok){
                this.setState({
                    errors:{}
                });
                console.log('tje form is valid');
                return response.json();
            }
            //this.setState({
           //     errors
           // });
            throw new Error(response.text)
        })
        .then(responseJSON => {
            console.log(responseJSON);
            //return registered user name and show login form
            this.renderRedirect('/login');
        })
        .catch(err => {
            //const {reason, message, location} = err;
            console.log('Error:' + err.reason + ' at ' + err.location);
        });
    }

    render() {
        return (
            <RegistrationForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
                />
        
            );
    }  
}

export default RegistrationPage;
