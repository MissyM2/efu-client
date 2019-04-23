import React from 'react';
import {connect} from 'react-redux';

import './css/reviewandplan.css';

export class ReviewAndPlan extends React.Component {
    render() {
        return (
            <div>
                <h2>review-and-plan</h2>
                <h2>Review and Plan</h2>
                <div id="review-and-plan">
                    <button id="review-and-plan-btn" type="submit">Review and Plan</button>
                </div>
            </div>
        );
    }
}

ReviewAndPlan.defaultProps = {
    title: 'ReviewAndProps'
};

export default connect()(ReviewAndPlan);
    
        
   