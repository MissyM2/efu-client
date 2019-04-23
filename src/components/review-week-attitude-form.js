import React from 'react';
import {connect} from 'react-redux';
import Week from './week';

import Input from './input';

import './css/reviewandplan.css';

export class ReviewWeekAttitudeForm extends React.Component {
    onSubmit(values) {
        console.log(values);
    };
    
    render() {
        return (
            <div>
                <h2>week-review-attitude-form</h2>
                <div className="reviewandplan-header">
                    <h2>Review Past Week: Attitude</h2>
                    <h3>{this.props.name}, how did you feel about your classes this week?</h3>
                    <p>Which did you like the most?  The least?</p>
                </div>
                
                <form 
                    className="week-review-attitude-form"
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
                        )}>
                        <label htmlFor="liked-most">Liked Most</label>
                        <Field 
                            component={Input} 
                            type="text" 
                            name="liked-most"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <label htmlFor="liked-least">Liked Least</label>
                        <Field 
                            component={Input} 
                            type="text" 
                            name="liked-least"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <button
                            type="submit"
                            disabled={this.props.pristine || this.props.submitting}>
                            Add Attitude
                        </button>     
            </form>
                <div className="nav-btns">
                    <button>
                            Back:Select Week Scr
                    </button>     
                    <button>
                            Next: Difficulty Scr
                    </button>     
                </div>
                
            </div>
        );
    }
}

ReviewWeekAttitudeForm.defaultProps = {
    title: 'ReviewWeekAttitudeForm'
};

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return{
        name: currentUser.firstName,
        protectedData: state.protectedData.data
    };
};

export default connect(mapStateToProps)(ReviewWeekAttitudeForm);
    
        
   