import React from 'react';
import {connect} from 'react-redux';

import './css/reviewandplan.css';

export class ReviewAndPlan extends React.Component {
    render() {
        return (
            <div>
                <h2>review-and-plan</h2>
                <h2>Review and Plan</h2>
                <div id="review-current-week">
                    <button id="review-current-week" type="submit">Review Last Week</button>
                </div>
                <div id="record-current-grades">
                    <button id="record-current-grades" type="submit">Record Current Grades</button>
                </div>
                <div id="input-deliverables">
                    <button id="input-deliverables" type="submit">Input Deliverables</button>
                </div>
            </div>
        );
    }
}

ReviewAndPlan.defaultProps = {
    title: 'Review and Plan'
};

export default connect()(ReviewAndPlan);
    
        
   