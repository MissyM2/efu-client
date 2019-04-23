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
                <h2>deliverab les-review-summary</h2>
                <div className="reviewandplan-header">
                    <h2>Review Next Week: Deliverables</h2>
                    <h3>{this.props.name}, are these all your deliverables for next week?</h3>
                </div>
                <div className="review">
                    <Deliverable />
                </div>
                <div className="nav-btns">
                    <button class="next-btn">
                            Review is correct
                            Make a Study Plan
                    </button>     
                    <button>
                            Back: Add/Edit Deliverables Scr
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
    
        
   