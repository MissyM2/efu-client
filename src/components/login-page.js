import React from 'react';
import LoginForm from './login-form';
import NavBar from './navbar';
import { Redirect } from 'react-router';
import {API_BASE_URL} from '../config';

import Dashboard from './dashboard';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        //set initial component state
        this.state = {
            errors: {},
            user: {
                username: '',
                password: ''
            }
           // loggedIn: false,
            //fireRedirect: false
        };

       // this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }
 
    changeUser(e) {
       // console.log('changeuserwhat is going on?');
        const field = e.target.name;
        const user = this.state.user;
        user[field] = e.target.value;
        //console.log('user[field]', user[field]);

        this.setState({
            user
        });
        //console.log('login-page, state.user', this.state.user);
    }
/*
    processForm(e) {
        e.preventDefault();
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
        })
    }
    */

    render() {
        console.log('this.props in login-page', this.props)
        let myuser = this.state.user;
        console.log('login-page=', myuser);
        const { fireRedirect } = this.state;
        if(fireRedirect){
            console.log('after fireRedirect where is it going?');
           {/* return <Redirect to={{
                pathname: '/navbar',
                state: {loggedIn: true}     
            }}
        /> */}
        }
            
            return (
                <div>
                   {/* <NavBar {...this.state}/> */}
                    <LoginForm
                        onSubmit={(username, password) => this.props.processForm(this.state.user.username, this.state.user.password)}
                        onChange={(field) => this.changeUser(field)}
                        errors={this.state.errors}
                        user={this.state.user}
                    />

                </div>
                
            ); 
       /*     
        return (
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
            );
            */

        } 
}

export default LoginPage;
