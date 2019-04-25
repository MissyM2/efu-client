import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';

import Input from './input';
import {required, nonEmpty, isTrimmed} from '../validators';

import './css/addcourse-form.css';

export class AddcourseForm extends React.Component {
    onSubmit(values) {
        console.log(values);
    };
    
    render() {
        return (
                <form
                    className="course-form"
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
    form: 'addcourse',
    onSubmitFail: (errors, dispatch) => dispatch(focus('addcourse', 'course-title'))
})(AddcourseForm);