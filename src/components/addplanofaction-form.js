import React from 'react';
import {connect} from 'react-redux';

import './css/reviewandplan.css';

export class AddPlanofactionForm extends React.Component {
    onSubmit(values) {
        console.log(values);
    };
    
    render() {
        return (
            <div>
                <h2>addplanofaction-form</h2>
                <div className="reviewandplan-header">
                    <h2>Add Plan of Action for Upcoming Week</h2>
                    <h3>{this.props.name}, Let's designate some study time for your deliverables?</h3>
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
    
        
   