import React from 'react';
import {SingleDeliverable} from './single-deliverable';
import {fetchGetDeliverables} from '../actions/protected-data';
import {connect} from 'react-redux';

import './css/deliverables.css';

export class ThisWeekDeliverables extends React.Component{
        componentDidMount() {
                this.props.dispatch(fetchGetDeliverables());
        }

        // fetch the week data for this user, for this term
        // find the week that todays date falls under
        // display all deliverables  that fall between the startDate and the endDate for that week

        render() {
                //console.log('this props for thisweekDels ', this.props.thisweekDels);
                const thisweekDels = this.props.thisweekDels.map((deliverable, index) =>
                        <li className="deliverable-wrapper" key={index}>
                                <SingleDeliverable index={index} {...deliverable} />
                        </li>
                        );
                return (
                        <div className="deliverables-wrapper">
                                <h3>{this.props.title} for {this.props.termDesc}, Week {this.props.weekNum}</h3>
                                <div className="items-list-labels">
                                        <div className="item-data courseName">CourseName</div>
                                        <div className="item-data termDesc">TermDesc</div>
                                        <div className="item-data weekNum">WeekNum</div>
                                        <div className="item-data dueDate">DueDate</div>
                                        <div className="item-data pressure">Pressure</div>
                                        <div className="item-data prephrs">prephrs</div>
                                        <div className="item-data deliverableName">deliverableName</div>
                                </div>
                                <div className="deliverable-section">
                                        <ul className="items-list">
                                                {thisweekDels}
                                        </ul>
                                </div>
                               
                                
                        </div>  
                        );
        }
}

const mapStateToProps = state => {
        return {
                thisweekDels: state.protectedData.deliverables.filter(deliverable => {
                        let thisWeekNum = 1;
                        let delWeekNum = deliverable.weekNum;
                        return thisWeekNum === delWeekNum;
                }),
                title: "Deliverables for this week",
                termDesc: "Spring, 2019 (hardcoded)",
                weekNum: "2 (hardcoded)"
        }
}

export default connect(mapStateToProps)(ThisWeekDeliverables);