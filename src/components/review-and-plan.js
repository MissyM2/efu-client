import React from 'react';
import {connect} from 'react-redux';
import Week from './single-week';

import './css/reviewandplan.css';

export class ReviewAndPlan extends React.Component {
    render() {
        return (
            <div>
                <h2>review-and-plan</h2>
                <h2>Review and Plan</h2>
                <div id="review-and-plan">
                    <h3>This is the current week. (should they be able to change weeks?) </h3>
                    <Week />
                </div>
                <div className="nav-btns">
                    <button>
                            Back:Week Details Scr
                    </button>     
                    <button>
                            Next: Attitude Scr
                    </button>     
                </div>
                
            </div>
        );
    }
}

ReviewAndPlan.defaultProps = {
    title: 'ReviewAndProps'
};

export default connect()(ReviewAndPlan);
    
        
   