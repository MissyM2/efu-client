import React from 'react';

import './css/home-page.css';

import LoginForm from './login-form';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            user: {
                username: '',
                password: ''
            }
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
                        onSubmit={(username, password) => this.props.submitlogin(this.state.user.username, this.state.user.password)}
                        onChange={(field) => this.changeUser(field)}
                        errors={this.state.errors}
                        user={this.state.user}
                    />
                    <div>Do not have an account? 
                        <button className="btn button-row" type="button" onClick={e => this.props.setlogin(e)}>
                            Create One
                        </button>      
                    </div>
                </div>
                
            ); 
        } 
}

export default LoginPage;
