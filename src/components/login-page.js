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
           // loggedIn: false
        };
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


    render() {
            return (
                <div>
                    <LoginForm
                        onSubmit={(username, password) => this.props.submitLogin(this.state.user.username, this.state.user.password)}
                        onChange={(field) => this.changeUser(field)}
                        errors={this.state.errors}
                        user={this.state.user}
                    />

                </div>
                
            ); 
        } 
}

export default LoginPage;
