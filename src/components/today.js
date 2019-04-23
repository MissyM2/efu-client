import React from 'react';
import {connect} from 'react-redux';
import {fetchProtectedData} from '../actions/protected-data';

import './css/today.css';

export class Today extends React.Component {
        componentDidMount() {
                this.props.dispatch(fetchProtectedData()); 
        }

        render() {
                return (
                        <div className="today">
                        <div className="dashboard-username">
                                Username: {this.props.username}
                        </div>
                        <div className="dashboard-name">Name:  {this.props.name}</div>

                                <h2>Today</h2>
                                <div className="details">
                                <div className="dashboard-protected-data">
                                        Protected data: {this.props.protectedData}
                                </div> 
                                        <div className="prep">
                                                <h3>Hours of Prep Needed Today: 3</h3>
                                                <p>Biology: 1.5 hours</p>
                                                <p>English 1.5 hours</p>
                                        </div>
                                        <div className="deliverables">
                                                <h3>Deliverables Due Today: 1</h3>
                                                <p>World History:  Quiz</p>
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

export default connect(mapStateToProps)(Today);
        