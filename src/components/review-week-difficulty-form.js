import React from 'react';
import {connect} from 'react-redux';

import Input from './input';

import './css/reviewandplan.css';

export class ReviewWeekAttitudeForm extends React.Component {
    onSubmit(values) {
        console.log(values);
    };
    
    render() {
        return (
            <div>
                <h2>week-review-difficulty-form</h2>
                <div className="reviewandplan-header">
                    <h2>Review Past Week: Difficulty</h2>
                    <h3>{this.props.name}, which class was the most difficult and least difficult?</h3>
                </div>
                
                <form 
                    className="week-review-difficulty-form"
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
                        )}>
                        <label htmlFor="most-difficult">Most Difficult</label>
                        <Field 
                            component={Input} 
                            type="text" 
                            name="most-difficult"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <label htmlFor="least-difficult">Liked Least</label>
                        <Field 
                            component={Input} 
                            type="text" 
                            name="least-difficult"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <button
                            type="submit"
                            disabled={this.props.pristine || this.props.submitting}>
                            Add Difficulty
                        </button>     
            </form>
                <div className="nav-btns">
                    <button>
                            Back: Difficulty Scr
                    </button>     
                    <button>
                            Next: Week Review Scr
                    </button>     
                </div>
                
            </div>
        );
    }
}

ReviewWeekDifficultyForm.defaultProps = {
    title: 'ReviewWeekDifficultyForm'
};

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return{
        name: currentUser.firstName,
        protectedData: state.protectedData.data
    };
};

export default connect(mapStateToProps)(ReviewWeekDifficultyForm);
    
        
   