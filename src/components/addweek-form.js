import React from 'react';
import {reduxForm, Field} from 'redux-form';

import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';

export class AddweekForm extends React.Component {
    onSubmit(values) {
        console.log(values);
    };

    render() {
        return (
            <form 
                className="week-form"
                onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
                    )}>
                    <label htmlFor="week-num">Week Number</label>
                    <Field 
                        component={Input} 
                        type="text" 
                        placeholder="1" 
                        name="week-num"
                        validate={[required, nonEmpty, isTrimmed]} 
                    />
                    <label htmlFor="week-startdate">Week Start Date</label>
                    <Field 
                        component={Input} 
                        type="text" 
                        placeholder="01/01/2019" 
                        name="week-startdate"
                        validate={[required, nonEmpty, isTrimmed]} 
                    />
                    <label htmlFor="week-enddate">Week End Date</label>
                    <Field 
                        component={Input} 
                        type="text" 
                        placeholder="01/08/2019" 
                        name="week-enddate"
                        validate={[required, nonEmpty, isTrimmed]} 
                    />
                    <button
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}>
                        Add Week
                    </button>     
            </form>
           
        );
    } 
}

export default reduxForm({
    form: 'weekadd',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('weekadd', Object.keys(errors)[0]))
})(WeekaddForm);

                