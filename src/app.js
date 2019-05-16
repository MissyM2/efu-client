import React from 'react';
import {API_BASE_URL} from './config';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './components/home-page';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Register from './components/register';
import Weeks from './components/weeks';
import Profile from './components/profile';
import ReviewCurrentWeek from './components/review-current-week';
import PlanNextWeek from './components/plan-next-week';




export default class App extends React.Component {
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
            name : "Missy"
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
        console.log(email, password);
        console.log("Clicked submit login");
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
            console.log('responseJSON after login is ', responseJSON);
            localStorage.setItem('authToken', responseJSON.authToken);
            localStorage.setItem('username', this.state.username);
            localStorage.setItem('firstName', this.state.firstName);
            this.renderRedirect('/dashboard');
            // save on the local storage the toke.
            // Redirect to the landing page
        })
    }

    render() {
        return (
            <section className="app-wrapper">
                <Router>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/login" render={() => <Login {...this.state}
                                                                        submitLogin={this.submitLogin}
                                                                    />} />
                                <Route exact path="/register" render={() => <Register {...this.state}
                                                                            submitRegistration={this.submitRegistration}
                                                                                />}  />
                                <Route exact path="/dashboard" render={() => <Dashboard {...this.state} />} /> 
                                
                                <Route exact path="/profile" component={Profile} />
                                <Route exact path="/weeks" component={Weeks} />
                                <Route exact path="/reviewcurrentweek" component={() => <ReviewCurrentWeek {...this.state} />} />
                                <Route exact path="/plannextweek" component={() => <PlanNextWeek {...this.state} />} />
 
                </Router> 
            </section> 
        );
    } 
}
