import React from 'react';
import { withRouter, Route} from 'react-router-dom';
import {API_BASE_URL} from '../config';
import HomePage from './home-page';
import NavBar from './navbar';
import LoginPage from './login-page';
import RegistrationPage from './registration-page';

import './css/app.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            login: {
                username:'',
                password: ''
            },
            loggedIn: false
        }
        this.submitLogin = this.submitLogin.bind(this);
    }
/*
    changeLogin(e, field) {
        const field = e.target.name;
        const user = this.state.user;
        user[field] = e.target.value;

        this.setState({
            user
        });
    }
*/
    submitLogin(username, password) {
        console.log('app: username', username);
        console.log('app: password', password);
        /*
        console.log('username:', this.state.user.username);
        console.log('password:', this.state.user.password);

        const registereduser = {
            username: this.state.user.username,
            password: this.state.user.password
        }

        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registereduser)
        })
        .then(response => {
            if(response.ok){
                this.setState({
                    isLoggedIn: true,
                    fireRedirect: true
                });
                console.log('isLoggedIn', this.state.isLoggedIn)
                console.log('fireRedirect', this.state.fireRedirect);
                return response.json();
            }
        })
        .then(responseJSON => {
            localStorage.setItem('authToken', responseJSON.authToken);
            localStorage.setItem('username', this.state.username);
            localStorage.setItem('firstName', this.state.firstName);

            //this.props.history.push('/dashboard');
            
            //this.renderRedirect('/dashboard');
            // save on the local storage the toke.
            // Redirect to the landing page
        }) */
    }
    render() {
        return (
                <div className="app">
                     <NavBar /> 
                    <main>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/navbar" render={() => <NavBar {...this.state}
                                                                                 />} /> 
                        <Route exact path="/login" render={() => <LoginPage {...this.state}
                                                        processForm={(username, password) => this.submitLogin(username, password)}
                                                                    />} />
                        <Route exact path="/registration" component={RegistrationPage} />
                    </main>
                </div>
            
        );

    }
        
    }

    export default (withRouter(App));

