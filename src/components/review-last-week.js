import React from 'react';
import {connect} from 'react-redux';

import {fetchGetWeeks} from '../actions/protected-data';
import {fetchGetCourses} from '../actions/protected-data';

import {SingleCourse} from './single-course';

import './css/review-last-week.css';

export class ReviewLastWeek extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetWeeks());
        this.props.dispatch(fetchGetCourses());     
    }
    
    render() {
        
            console.log('this props for my Courses ', this.props.myCourses);
            const myCourses = this.props.myCourses.map((singlecourse, index) =>
                     <li className="course-detail" key={index}>
                             <div className="course-field"><SingleCourse index={index} {...singlecourse} /></div>
                             <div className="grade-field">GRADE FIELD</div>
                     </li>
            );

        return (
            
            <div>
                    <h2>{this.props.title}</h2>
                    <div className="mylastweek-wrapper">
                        <h3>{this.props.characteristicsSubtitle}</h3>
                        <div className="thisweek-group-details">
                            <div className="thisweek-group">
                                <div className="week-detail">
                                    <div className="week-detail-label">
                                        Week Number:
                                    </div>
                                    <div className="week-detail-data">
                                        {this.props.currentWeek.weekNum}
                                    </div>
                                </div>
                                <div className="week-detail">
                                    <div className="week-detail-label">
                                        Term Description:
                                    </div>
                                    <div className="week-detail-data">
                                        {this.props.currentWeek.termDesc}
                                    </div>
                                </div>
                            </div>
                            <div className="thisweek-group">
                                    <div className="week-detail">
                                        <div className="week-detail-label">
                                            Liked Least:
                                        </div>
                                        <div className="week-detail-data">
                                            {this.props.currentWeek.likedLeast}
                                        </div>
                                    </div>
                                    <div className="week-detail">
                                        <div className="week-detail-label">
                                            Liked Most:
                                        </div>
                                        <div className="week-detail-data">
                                            {this.props.currentWeek.likedMost}
                                        </div>
                                    </div>
                            </div>
                            <div className="thisweek-group">
                                    <div className="week-detail">
                                        <div className="week-detail-label">
                                            Most Difficult:
                                        </div>
                                        <div className="week-detail-data">
                                            {this.props.currentWeek.mostDifficult}
                                        </div>
                                    </div>
                                    <div className="week-detail">
                                        <div className="week-detail-label">
                                            Most Difficult:
                                        </div>
                                        <div className="week-detail-data">
                                            {this.props.currentWeek.mostDifficult}
                                        </div>
                                    </div>
                            </div> 
                        </div>
                        <button className="update-btn" type="button">Click to Update Details for This Week</button>
                    </div>
                    <div className="mylastweek-grades-wrapper">
                        <h2>{this.props.gradesSubtitle}</h2>
                        <div className="data-wrapper">
                            <ul className="course-list">
                                {myCourses}
                            </ul>
                        </div>  
                        <button className="update-btn" type="button">Click to Commit Grades for This Week</button>
                    </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
            currentWeek: state.protectedData.weeks[Math.floor(Math.random() * state.protectedData.weeks.length)],
            myCourses: state.protectedData.courses.filter(course => {
                return course.term === 'Spring, 2019';
            }),
            title: "Review Last Week",
            characteristicsSubtitle: "What did you think about last week?",
            gradesSubtitle: "What are your grades after last week?"
    };
    
};

export default connect(mapStateToProps)(ReviewLastWeek);
                