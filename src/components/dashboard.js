import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getCurrentDate} from '../utils';

import {fetchGetDeliverables} from '../actions/protected-data';

import TodayDeliverables from './today-deliverables';
import {SingleDeliverable} from './single-deliverable';
import Suggestions from './suggestions';
//import ReviewLastWeek from './review-last-week';

import './css/dashboard.css';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetDeliverables());
    }

    render() {
        console.log(getCurrentDate());
        const thisWeeksDeliverables = this.props.myWeekDeliverables.map((singledeliverable, index) =>
                        <li className="singlecourse-wrapper" key={index}>
                                <div className="course-header">
                                        <SingleDeliverable index={index} deliverable={singledeliverable} />      
                                </div> 
                        </li>
                );
        return (
                <div className="dashboard">
                    <h3>This is the Dashboard</h3>
                    <div className="dashboard-username">
                        Username: {this.props.username}
                    </div>
                    <div className="dashboard-name">Name:  {this.props.name}</div>
                    <div>
                        <h3>Take charge of your academic life.</h3>
                        <h3>Plan and track your academic progress with small, achievable goals and collaborating with a mentor.</h3>
                    </div>
                    <div className="skills-suggestion">
                        <h3>This Week's Deliverables, Week {this.props.weekNum}</h3>
                        <Suggestions />
                    </div>
                    <div >
                        <h3>This Week's Deliverables, Week {this.props.weekNum}</h3>
                        <TodayDeliverables />
                    </div>
                    <div> 
                        <h3>This Week's Deliverables, Week {this.props.weekNum}</h3>
                        {thisWeeksDeliverables}
                    </div>
                    <div className="review-and-plan">
                        <h3>Review Last Week and Plan for Next Week</h3>
                        <Link to="/reviewlastweek">Review Last Week</Link>
                        <Link to="/plannextweek">Plan Next Week</Link>
                    </div>

                </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    const weekNum = 2;
    const termDesc = 'Spring, 2019';
   // console.log('currentUser', currentUser);
    //console.log('state', state);
    return {
            user: currentUser,
            myWeekDeliverables: state.protectedData.deliverables.filter(deliverable =>{
                    return(deliverable.termDesc === termDesc && deliverable.weekNum === weekNum);
            }),
            myDayDeliverables: state.protectedData.deliverables.filter(deliverable => {
                return (deliverable.dueDate === "05/08/2019");
            }),
            name: `${currentUser.firstName} ${currentUser.lastName}`,
            title: "Your Dashboard"
    };
    
};


export default requiresLogin()(connect(mapStateToProps)(Dashboard));
       