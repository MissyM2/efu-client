import React from 'react';
import {API_BASE_URL} from './config';

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import NavBar from './components/navbar';
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
            isAuthenticated: false,
            isLoading: true
        }
        this.submitLogin = this.submitLogin.bind(this);
    } 

    componentDidMount() {
        AuthCall().then(() => {
            this.setState({isAuthenticated: true, isLoading: false});
        }).catch(() => {
            this.setState({isLoading: false});
        });
    }
    
/*
    renderRedirect = (newPath) => {
        window.location.href = newPath;
    }
    */

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
        console.log('made it to submitlogin');
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
            console.log('within app.js this.state.isLoggedIn ', this.state.isLoggedIn);

            this.props.history.push('/navbar');
            
            //this.renderRedirect('/dashboard');
            // save on the local storage the toke.
            // Redirect to the landing page
        })
    }

    

    render() {
        console.log('isAuthenticated', isAuthenticated);
        if(isLoading) {
            console.log('isLoading', isLoading);
            return <div>Loading...</div>
        } else if(!isAuthenticated) {
            console.log('not authenticated, should go to login', isAuthenticated)
            return <Redirect to="/login" />
        } else {
            return  <NavBar {...this.props} />
        }
       
    
        return (
            
            <main>
                <Router>
                              
                                <Route exact path="/" render={() => <HomePage {...this.state}
                                                                    />} />
                                <Route exact path="/login" render={() => <Login {...this.state}
                                                                        submitlogin={this.submitLogin}
                                                                    />} />
                                <Route exact path="/register" render={() => <Register {...this.state}
                                                                            submitregistration={this.submitRegistration}
                                                                                />}  />
                                <Route exact path="/dashboard" render={() => <Dashboard {...this.state}
                                                                                 />} /> 
                                
                                <Route exact path="/profile" component={Profile} />
                                <Route exact path="/weeks" component={Weeks} />
                                <Route exact path="/reviewcurrentweek" component={ReviewCurrentWeek} />
                                <Route exact path="/plannextweek" component={PlanNextWeek} />
 
                </Router> 
            </main> 
        );
    } 
}
