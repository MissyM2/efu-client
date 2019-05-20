import React from "react";

import {API_BASE_URL} from '../config';


import Login from './login';

export default class HomePage extends React.Component {
    /*
    constructor(props){
        super(props);
        this.state = {
            user: {
                firstname: '',
                lastname: '',
                email: '',
                password:''
            },
            login : {
                email : '',
                password : ''
            },
            isLoggedIn: false
        }
    } 
    

    renderRedirect = (newPath) => {
        window.location.href = newPath;
    }

    submitRegistration = (user) => {
       console.log(user);
       console.log("Clicked submit registration");
        fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
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

    submitLogin = (email, password) => {
        this.setState({
            username: email
        })
    
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username : email,
                password : password
            })
        })
        .then(response => {
    
            if(response.ok){
                return response.json();
            }
        })
        .then(responseJSON => {
            localStorage.setItem('authToken', responseJSON.authToken);
            localStorage.setItem('username', this.state.username);
            localStorage.setItem('firstName', this.state.firstName);
            this.setState({
                isLoggedIn: true
            });
            console.log('this.state.isLoggedIn ', this.state.isLoggedIn);
            
            this.renderRedirect('/navbar');
            // save on the local storage the toke.
            // Redirect to the landing page
        })
    }
    */

    render() {
        return (
            <main>
                <div className="container">
                    <h2>Executive Followup HomePage</h2>
                    <p className="homepage">
                    Welcome to Executive Followup, a site for students to keep control of their 
                    course deliverables and grades
                    </p>
                    <Login />
                </div>
            </main>
        );

    }
    
};
