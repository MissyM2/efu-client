import React from 'react';
import {connect} from 'react-redux';

import Input from './input';

import './css/reviewandplan.css';

export class AddDeliverableForm extends React.Component {
    onSubmit(values) {
        console.log(values);
    };
    
    render() {
        return (
            <div>
                <h2>addeliverable-form</h2>
                <div className="reviewandplan-header">
                    <h2>Add Your Deliverables</h2>
                    <h3>{this.props.name}, now we will add the deliverables for this class
                    for next week</h3>
                    <p>{this.props.className}</p>
                </div>
                
                <form 
                    className="adddeliverable-form"
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
                        )}>
                        <label htmlFor="due-date">Due Date</label>
                        <Field 
                            component={Input} 
                            type="text" 
                            name="due-date"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <label htmlFor="deliverable-name">Deliverable Name</label>
                        <Field 
                            component={Input} 
                            type="text" 
                            name="deliverable-name"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <label htmlFor="pressure">Pressure</label>
                        <Field 
                            component={Input} 
                            type="text" 
                            name="pressure"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <label htmlFor="deliverable-desc">Deliverable Description</label>
                        <Field 
                            component={Input} 
                            type="text" 
                            name="deliverable-desc"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <label htmlFor="prephrs">How many Prep Hours do you need?</label>
                        <Field 
                            component={Input} 
                            type="text" 
                            name="prephrs"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <button
                            type="submit"
                            disabled={this.props.pristine || this.props.submitting}>
                            Add Grade and Note
                        </button>     
            </form>
                <div className="nav-btns">
                    <button className="other-function-btn">
                           Add Another Deliverable 
                    </button>     
                    <button className="next-btn">
                            Next: Finished with this class.  Go to the next class.
                    </button> 
                    <button className="back-btn">
                            Back to Grades 
                    </button>         
                </div>
                
            </div>
        );
    }
}

ReviewCourseGradesForm.defaultProps = {
    title: 'ReviewCourseGradesForm'
};

const mapStateToProps = state => {
    const {currentUser} = state.auth;
   // const {currentClass} = ?????
    return {
        name: currentUser.firstName,
       // class: currentClass.className,
        protectedData: state.protectedData.data
    };
};

export default connect(mapStateToProps)(ReviewCourseGradesForm);
    
        
   