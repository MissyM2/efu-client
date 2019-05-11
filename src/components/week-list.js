import React from 'react';
import { connect } from 'react-redux';

import {EditBtns} from './edit-btns';
import {AddWeekForm} from './add-week-form';
import {fetchGetWeeks, fetchAddWeek} from '../actions/protected-data';

import './css/index.css';
import './css/profile.css';

export class WeekList extends React.Component {
        componentDidMount() {
                this.props.dispatch(fetchGetWeeks());
            }

        fetchAddCourse(newWeek) {
            this.props.dispatch(fetchAddWeek(newWeek));
        }


        render() {
            const weeks = this.props.weekList.map((week,index) => 
            <li className="item" key={index}>
                    <ul className="list-horizontal">
                        <li className="item weeknum">{week.weekNum}</li>
                        <li className="item termDesc">{week.termDesc}</li>
                        <li className="item likedLeast">{week.likedLeast}</li>
                        <li className="item likedMost">{week.likedMost}</li>
                        <li className="item mostDifficult">{week.mostDifficult}</li>
                        <li className="item leastDifficult">{week.leastDifficult}</li>
                        <li className="item edit-btns"><EditBtns type="week" /></li>
                    </ul>
            </li>
            );

                return (
                        <div className="week">
                                <h2>{this.props.title}</h2>
                                <div className="weeks-section">
                                        <ul className="list-horizontal">
                                                        <li className="item weeknum">Week Number</li>
                                                        <li className="item termDesc">Term</li>
                                                        <li className="item likedLeast">Liked Least</li>
                                                        <li className="item likedMost">Liked Most</li>
                                                        <li className="item mostDifficlit">Most Difficult</li>
                                                        <li className="item leastDifficult">Least Difficult</li>
                                                        <li className="item edit-btns-label">Edit Buttons</li>
                                        </ul>
                                </div>
                                <div className="weeks-section">
                                    <ul className="list-vertical">
                                                {weeks}
                                    </ul>
                                </div>
                                <div className="weeks-section">  
                                    <div className="add-course-wrapper">
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
    const weeks = state.protectedData.weeks;
    const termWeeks = weeks.filter(week => {
        return week.termDesc === "Fall, 2019";
    });

        return {
                title: "Your Weeks",
                weekList: Object.keys(termWeeks).map(weekId => termWeeks[weekId])
        }
}

export default connect(mapStateToProps)(WeekList);
