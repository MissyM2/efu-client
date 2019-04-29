import React from 'react';
import { connect } from 'react-redux';

import {SingleWeek} from './single-week';
import {AddWeekForm} from './add-week-form';
import {fetchGetWeeks, fetchAddWeek} from '../actions/protected-data';

import './css/view-profile.css';

export class Weeks extends React.Component {
        componentDidMount() {
                this.props.dispatch(fetchGetWeeks());
            }

        fetchAddWeek(newWeek) {
                this.props.dispatch(fetchAddWeek(newWeek));
        }

        render() {
                const weeks = this.props.weeks.map((singleweek, index) => 
                        <li key={index}>
                                <SingleWeek {...singleweek} />
                        </li>
                        );

                return (
                        <div className="week-wrapper">
                                <h2>{this.props.title}</h2>
                                <ul className="items-list">
                                        {weeks}
                                </ul>
                                 
                                <div className="add-wrapper">
                                        <AddWeekForm
                                        type="newWeek"
                                        onAdd={newWeek => 
                                                this.fetchAddWeek(newWeek)}  />
                                </div>
                        </div>
                );
        }
}

const mapStateToProps = state => {
        console.log('the state is ', state);
        return {
                weeks: state.protectedData.weeks,
                title: "Your weeks"
        }
}

export default connect(mapStateToProps)(Weeks);
