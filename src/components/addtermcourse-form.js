import React from 'react';
import {reduxForm, Field} from 'redux-form';

import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';

export class AddtermcourseForm extends React.Component {
    onSubmit(values) {
        console.log(values);
    };
    
    render() {
        return (
                <form
                    className="termcourse-form"
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
                    )}>
                    
                    <label htmlFor="course-title">Course Title</label>
                    <Field 
                        component={Input} 
                        type="text" 
                        placeholder="Biology 101" 
                        name="course-title"
                        validate={[required, nonEmpty, isTrimmed]} 
                    />
                    <label htmlFor="course-desc">course Description</label>
                    <Field 
                        component={Input} 
                        type="text" 
                        name="course-desc"
                        validate={[required, nonEmpty, isTrimmed]} 
                    />
                    <button
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}>
                        Add course
                    </button>
                </form>
        );

    }
}

export default reduxForm({
    form: 'addtermcourse',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('addtermcourse', 'course-title'))})(AddtermcourseForm);