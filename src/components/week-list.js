import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import {SingleWeek} from './single-week';
import {AddWeekForm} from './add-week-form';
import {fetchGetWeeks, fetchAddWeek} from '../actions/protected-data';

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
            <li className="week-list-course" key={index}>
                    <Link to={`/${week.term}/${week.id}`}>
                        <SingleWeek index={index} {...week} />
                    </Link>
            </li>
            );

                return (
                        <div className="week">
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
