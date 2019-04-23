import React from 'react';
import {reduxForm, Field} from 'redux-form';

import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';

import './css/schoolterm-form.css';

export class AddschooltermForm extends React.Component {
    onSubmit(value) {
        console.log(value);
    };

    render() {
        return (
            <form
                className="schoolterm-form"
                onSubmit={this.props.handleSubmit(value =>
                    this.onSubmit(value)
                    )}>
                    <label htmlFor="term-name">Term Name</label>
                    <Field 
                        component={Input} 
                        type="text" 
                        placeholder="Spring, 2019" 
                        name="term-name"
                        validate={[required, nonEmpty, isTrimmed]} 
                    />
                    <button
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}>
                        Add Term
                    </button>
            </form>
        );

    }
    
}

export default reduxForm({
    form: 'addschoolterm',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('addschoolterm', Object.keys(errors)[0]))
})(AddschooltermForm);

                