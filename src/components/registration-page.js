import React from 'react';

import './css/home-page.css';

import RegistrationForm from './registration-form';

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
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
        console.log('registration-page: this.state.user', this.state.user);
        
    }

    

    render() {
        return (
            <div className="login-reg-container">
                <RegistrationForm
                    onSubmit={
                        (firstName, lastName, username, password) => this.props.submitregistration(
                            this.state.user.firstName, 
                            this.state.user.lastName, 
                            this.state.user.username, 
                            this.state.user.password
                    )}
                    onChange={(field) => this.changeUser(field)}
                    user={this.state.user}
                />
                <div className="instructions-small">
                    <div>Already have an account?</div>
                    <div>
                        <button className="btn btn-small button-row" type="button" onClick={e => this.props.setlogin(e)}>
                                Log In
                        </button>      
                    </div> 

                </div>
                
            </div>
            );
    }  
}

export default RegistrationPage;
