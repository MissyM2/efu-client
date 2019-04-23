import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';

import Today from './today';
import ThisWeek from './this-week';
import ReviewAndPlan from './review-and-plan';

import './css/dashboard.css';

export class Dashboard extends React.Component {


    render() {
        return (
                <div className="dashboard">
                    <div className="dashboard-username">
                        Username: {this.props.username}
                    </div>
                    <div className="dashboard-name">Name:  {this.props.name}</div>
                    <div>
                        <h3>Take charge of your academic life.</h3>
                        <h3>Plan and track your academic progress with small, achievable goals and collaborating with a mentor.</h3>
                    </div>
                    <div className="skills-suggestion">Today's Reminder:  <em>Using pen and paper to write things down, 
                                    instead of taking notes on a laptop, helps boost memory retention.</em>
                    </div>
                        <div className="board">
                        <h3>This is the Dashboard</h3>
                            <Today />
                            <ThisWeek />
                            <ReviewAndPlan />
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
       