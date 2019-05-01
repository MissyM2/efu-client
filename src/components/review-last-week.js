import React from 'react';
import {connect} from 'react-redux';

import {fetchGetWeeks} from '../actions/protected-data';
import {fetchGetCourses} from '../actions/protected-data';

import {ReviewLastWeekCourses} from './review-last-week-courses';
import {SingleEditWeek} from './single-edit-week';

import './css/review-last-week.css';

export class ReviewLastWeek extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetWeeks());
        this.props.dispatch(fetchGetCourses());     
    }
    
    render() {
            console.log('this.props for current week', this.props.myWeeks);
            console.log('this props for my Courses ', this.props.myCourses);

            const myWeeks = this.props.myWeeks.map((singleeditweek, index) => 
                <div key={index}>
                             <SingleEditWeek index={index} {...singleeditweek} />
                    </div>
            );

            const myCourses = this.props.myCourses.map((singlecourse, index) =>
                     <li className="course-grade-detail" key={index}>
                             <div className="course-field"><ReviewLastWeekCourses index={index} {...singlecourse} /></div>
                             <div className="grade-field">GRADE FIELD</div>
                     </li>
            );

        return (
            
            <div>
                    <div className="myweek-wrapper">
                        <h2>{this.props.myWeekTitle}</h2>
                        <div>
                            {myWeeks}
                        </div> 
                        <button class="action-btns small-btn update-btn" data-id="${this.props.myWeeks.id}" data-likedMost="${this.props.myWeeks.likedMost}" data-likedLeast="${this.props.myWeeks.likedLeast}" data-mostDifficult="${this.props.myWeeks.mostDifficult}" data-leastDifficult="${this.props.myWeeks.leastDifficult}">Update the Details of My Week</button>
                    </div> 
                    <div className="myweek-grades-wrapper">
                        <h2>{this.props.gradesSubtitle}</h2>
                        <div className="courses-grades-wrapper">
                            <ul className="course-grades-list">
                                {myCourses}
                            </ul>
                        </div> 
                        <button class="action-btns small-btn update-btn" data-id="${this.props.myWeeks.id}" data-likedMost="${this.props.myWeeks.likedMost}" data-likedLeast="${this.props.myWeeks.likedLeast}" data-mostDifficult="${this.props.myWeeks.mostDifficult}" data-leastDifficult="${this.props.myWeeks.leastDifficult}">Update My Grades for My Week</button>
                        
                    </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
            myWeeks: state.protectedData.weeks.filter(week => {
                console.log('inside mapStateToProps: week', week);
                return week.weekNum === 2;
                
            }),
            myCourses: state.protectedData.courses.filter(course => {
                console.log('inside mapStateToProps: course', course);
                return course.term === 'Spring, 2019';
            }),
            myWeekTitle: "Review Last Week",
            characteristicsSubtitle: "What did you think about last week?",
            gradesSubtitle: "What are your grades after last week?"
    };
    
};

export default connect(mapStateToProps)(ReviewLastWeek);