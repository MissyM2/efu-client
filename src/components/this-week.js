import React from 'react';
import {connect} from 'react-redux';
import {fetchProtectedData} from '../actions/protected-data';

import './css/this-week.css';

export class ThisWeek extends React.Component{
        componentDidMount() {
                this.props.dispatch(fetchProtectedData());
        }

        render() {
                return (
                        <div className="this-week">
                                <h2>This Week</h2>
                                <div className="details">
                                        <div className="prep">
                                                <h3>Hours of Prep Needed This Week: 12</h3>
                                                        <p>Mon:  Biology: 1.5 hours</p>
                                                        <p>Mon:  English 1.5 hours</p>
                                                        <p>Tue:  Biology: 1.5 hours</p>
                                                        <p>Tue:  English 1.5 hours</p>
                                                        <p>Wed:  Biology: 1.5 hours</p>
                                                        <p>Wed:  English 1.5 hours</p>
                                                        <p>Wed:  Biology: 1.5 hours</p>
                                                        <p>Thu:  Calc 1.5 hours</p>
                                                        <p>Fri:  Calc: 1.5 hours</p>
                                        </div>
                                        <div className="deliverables">
                                                <h3>Deliverables Due Today: 1</h3>
                                                <p>Mon:  World History:  Quiz</p>
                                                <p>Tue:  Biology:  Lab</p>
                                                <p>Wed:  none</p>
                                                <p>Thu:  Biology:  Exam</p>
                                                <p>Thu:  English:  Essay</p>
                                                <p>Fri:  Calc:  Homework</p>
                                        </div>
                                </div>
                        </div>
                );
        }
}

const mapStateToProps = state => {
        const {currentUser} = state.auth;
        return {
                username: state.auth.currentUser.username,
                name: `${currentUser.firstName} ${currentUser.lastName}`,
                protectedData: state.protectedData.data
        }
}

export default connect(mapStateToProps)(ThisWeek);
