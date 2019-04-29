import React from 'react';
import {connect} from 'react-redux';

import {ThisWeekDeliverables} from './this-week-deliverables';
import {SingleWeek} from './single-week';

import {fetchGetWeekByCurrentWeekNum} from '../actions/protected-data';


import './css/reviewandplan.css';

//the object of this form is to pull up the current week and 
// add the attitude and difficulty details for the week
//  this form GETS a record by current weekNUM and
//  PUTS new information into the document


export class ReviewLastWeek extends React.Component {
/*
    componentDidMount() {
        // create an action to get the current week and display all fields
        this.props.dispatch(fetchGetWeekByCurrentWeekNum());    
    }
*/
    
    render() {
/*
        const thisweek = this.props.weeks.map((thisweek, index) =>
            <div key={index}>
                <SingleWeek {...thisweek} />            
            </div>
        );
*/
        return (
            <div>
                <h2>{this.props.title}</h2>
                <h3>{this.props.name}, how did you feel about your classes this week?</h3>
                <p>Which did you like the most?  The least?</p>
                <div className="thisweek-details">
                    This is where the details of this week will go
                </div>
                <ThisWeekDeliverables />
                
                <div> the button and details to edit this form goes here</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        name: currentUser.firstName,
        weeks: state.protectedData.weeks,
        title: "Review Last Week"
    };
};

export default connect(mapStateToProps)(ReviewLastWeek);
    
        
   