import React from 'react';
import RegistrationForm from './registration-form';

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
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
    }

    

    render() {
        console.log('registration-page: this.props.islogin', this.props.islogin);
        return (
            <div>
                <RegistrationForm
                    onSubmit={(firstName, lastName, username, password) => this.props.submitRegistration(firstName, lastName, username, password)}
                    onChange={(field) => this.changeUser(field)}
                    errors={this.state.errors}
                    user={this.state.user}
                />
                <div>Already have an account? 
                        <button className="btn button-row" type="button" onClick={e => this.props.setlogin(e)}>
                            Log In
                        </button>      
                </div> 
            </div>
            );
    }  
}

export default RegistrationPage;
