import React from 'react';
import {fetchGetDeliverables} from '../actions/protected-data';
import {SingleDeliverable} from './single-deliverable'
import {connect} from 'react-redux';

import './css/view-deliverables.css';

export class ThisWeekDeliverables extends React.Component{
        componentDidMount() {
                this.props.dispatch(fetchGetDeliverables());
        }

        // fetch the week data for this user, for this term
        // find the week that todays date falls under
        // display all deliverables  that fall between the startDate and the endDate for that week

        render() {
                const thisweekDels = this.props.thisweekDels.map((deliverable, index) =>
                        <li className="deliverable-wrapper" key={index}>
                                <SingleDeliverable index={index} {...deliverable} />
                        </li>
                        );
                return (
                        <div className="deliverables-wrapper">
                                <h2>{this.props.title}</h2>
                                <ul className="items-list">
                                        {thisweekDels}
                                </ul>
                        </div>  
                        );
        }
}

const mapStateToProps = state => {
        return {
                thisweekDels: state.protectedData.deliverables,
                title: "Deliverables for this week"
        }
}

export default connect(mapStateToProps)(ThisWeekDeliverables);