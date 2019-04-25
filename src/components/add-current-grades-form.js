import React from 'react';
import {connect} from 'react-redux';

import Input from './input';

import './css/reviewandplan.css';

export class RecordCurrentGrades extends React.Component {
    onSubmit(values) {
        console.log(values);
    };
    
    render() {
        return (
            <div>
                <h2>Record Current Grades</h2>
                <div className="reviewandplan-header">
                    <h2>Course Grades</h2>
                    <h3>{this.props.name}, now we will review your grades and plan for next week</h3>
                    <p>{this.props.className}</p>
                </div>
                
                <form 
                    className="review-course-grades-form"
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
                        )}>
                        <label htmlFor="current-grade">Current Grade</label>
                        <Field 
                            component={Input} 
                            type="text" 
                            name="current-grade"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <label htmlFor="grade-note">Grade Note</label>
                        <Field 
                            component={Input} 
                            type="text" 
                            name="grade-note"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <button
                            type="submit"
                            disabled={this.props.pristine || this.props.submitting}>
                            Add Grade and Note
                        </button>     
            </form>
                <div className="nav-btns">
                    <button>
                            Next: Add Deliverables for this class, due Next Week
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

export default connect(mapStateToProps)(RecordCurrentGrades);
    
        
   