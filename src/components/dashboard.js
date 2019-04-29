import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';

import TodayDeliverables from './today-deliverables';
import ThisWeekDeliverables from './this-week-deliverables';
import Suggestions from './suggestions';
import ReviewLastWeek from './review-last-week';

import './css/dashboard.css';

export class Dashboard extends React.Component {
    render() {
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
                        <Suggestions />
                    </div>
                        <div className="board">
                            <TodayDeliverables />
                            <ThisWeekDeliverables />
                            <div className="review-and-plan">
                            this is where review last week will go
                                {/*<ReviewLastWeek /> */}
                            </div>
                        </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return{
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
       