import React from 'react';
import { connect } from 'react-redux';

import {SingleWeek} from './single-week';
import {AddWeekForm} from './add-week-form';
import {fetchGetWeeks, fetchAddWeek} from '../actions/protected-data';

import './css/view-weeks.css';

export class Weeks extends React.Component {
        componentDidMount() {
                this.props.dispatch(fetchGetWeeks());
            }

        fetchAddWeek(newWeek) {
                this.props.dispatch(fetchAddWeek(newWeek));
        }

        render() {
                const weeks = this.props.weeks.map((singleweek, index) => 
                        <div className="single-week" key={index}>
                                <SingleWeek {...singleweek} />
                        </div>
                        );

                return (
                        <div className="weeks-wrapper">
                                <div className="weeks-section">
                                        <h2>{this.props.title}</h2>
                                </div>
                                <div className="weeks-section">
                                        <div className="items-list-labels">
                                                <div className="week-data-item studentname">Student Name</div>
                                                <div className="week-data-item weeknum">Week Number</div>
                                                <div className="week-data-item termDesc">Term</div>
                                                <div className="week-data-item likedLeast">Liked Least</div>
                                                <div className="week-data-item likedMost">Liked Most</div>
                                                <div className="week-data-item mostDifficult">Most Difficult</div>
                                                <div className="week-data-item leastDifficult">Least Difficult</div>
                                        </div>
                                </div>
                                <div className="weeks-section">
                                        <div className="items-list">
                                                {weeks}
                                        </div>
                                </div>
                               <div className="weeks-section">
                                <div className="add-wrapper">
                                                <AddWeekForm
                                                type="newWeek"
                                                onAdd={newWeek => 
                                                        this.fetchAddWeek(newWeek)}  />
                                        </div>
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
