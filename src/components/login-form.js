import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
//import {required, nonEmpty} from '../validators';

import './css/login-form.css';

export class LoginForm extends React.Component {
    onSubmit(values) {
        //return this.props.dispatch(login(values.username, values.password));
        return this.props.dispatch(login("sarah@gmail.com", "sarah9515"));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <label htmlFor="username">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    id="username"
                    defaultValue="sarah@gmail.com"
                    /*validate={[required, nonEmpty]}*/
                />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    defaultValue="sarah9515"
                    /*validate={[required, nonEmpty]}*/
                />
                {/*<button disabled={this.props.pristine || this.props.submitting}>*/}
                <button>
                    Log in
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);