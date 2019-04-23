import React from 'react';
import {connect} from 'react-redux';

import './css/reviewandplan.css';

export class ReviewWeekSummary extends React.Component {
    onSubmit(values) {
        console.log(values);
    };
    
    render() {
        return (
            <div>
                <h2>week-review-summary</h2>
                <div className="reviewandplan-header">
                    <h2>Review Past Week: Summary</h2>
                    <h3>{this.props.name}, are these items correct for the current week?</h3>
                </div>
                <div className="review">
                    <Week />
                </div>
                <div className="nav-btns">
                    <button id="review-correct-now-plan">
                            Review is correct
                            Go to Review/Plan Classes
                    </button>     
                    <button>
                            Back: Difficulty Scr
                    </button>     
                </div>
                
            </div>
        );
    }
}

ReviewWeekSummary.defaultProps = {
    title: 'ReviewWeekSummary'
};

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return{
        name: currentUser.firstName,
        protectedData: state.protectedData.data
    };
};

export default connect(mapStateToProps)(ReviewWeekSummary);
    
        
   