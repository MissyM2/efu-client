import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';

import Input from './input';
import {required, nonEmpty, isTrimmed} from '../validators';

import './css/term-form.css';

export class AddtermForm extends React.Component {
    onSubmit(value) {
        console.log(value);
    };

    render() {
        return (
            <form
                className="term-form"
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
    form: 'addterm',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('addterm', Object.keys(errors)[0]))
})(AddtermForm);

                