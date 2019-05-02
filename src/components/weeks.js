import React from 'react';
import { connect } from 'react-redux';

import {SingleWeek} from './single-week';
import {AddWeekForm} from './add-week-form';
import {fetchGetWeeks, fetchAddWeek} from '../actions/protected-data';

import './css/weeks.css';

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
                        <div className="data-wrapper">
                                <h2>{this.props.title}</h2>
                                <div className="weeks-section">
                                        <ul className="label-list">
                                                <div className="single-item">
                                                        <div className="week-data-item weeknum">Week Number</div>
                                                        <div className="week-data-item termDesc">Term</div>
                                                        <div className="week-data-item likedLeast">Liked Least</div>
                                                        <div className="week-data-item likedMost">Liked Most</div>
                                                        <div className="week-data-item mostDifficdivt">Most Difficult</div>
                                                        <div className="week-data-item leastDifficult">Least Difficult</div>
                                                </div>
                                                
                                        </ul>
                                </div>
                                <div className="weeks-section">
                                        <ul className="weeks-list">
                                                {weeks}
                                        </ul>
                                </div>
                               <div className="weeks-section">
                                        <ul className="add-wrapper">
                                                <AddWeekForm
                                                type="newWeek"
                                                onAdd={newWeek => 
                                                        this.fetchAddWeek(newWeek)}  />
                                        </ul>
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
