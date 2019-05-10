import React from 'react';
import { connect } from 'react-redux';

import {SingleWeek} from './single-week';
import {AddWeekForm} from './add-week-form';
import {fetchGetWeeks, fetchAddWeek} from '../actions/protected-data';

import './css/index.css';
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
                                        <ul className="list-horizontal">
                                                        <li className="item weeknum">Week Number</li>
                                                        <li className="item termDesc">Term</li>
                                                        <li className="item likedLeast">Liked Least</li>
                                                        <li className="item likedMost">Liked Most</li>
                                                        <li className="item mostDifficdivt">Most Difficult</li>
                                                        <li className="item leastDifficult">Least Difficult</li>
                                                
                                        </ul>
                                </div>
                                <div className="weeks-section">
                                        <ul className="list-vertical">
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
