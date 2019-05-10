import React from 'react';
import {connect} from 'react-redux';

import {fetchGetWeeks, fetchUpdateWeek} from '../actions/protected-data';
import {fetchGetCourses} from '../actions/protected-data';
import {fetchFindGivenGrade, fetchAddGrade} from '../actions/protected-data';

import {MainNav} from './main-nav';
import {ReviewLastWeekDetails} from './review-last-week-details';
import {ReviewLastWeekCourses} from './review-last-week-courses';
import {UpdateWeekForm} from './update-week-form';

import './css/index.css';
import './css/review-last-week.css';

export class ReviewLastWeek extends React.Component {

    componentDidMount() {
        //seed with data from db
        this.props.dispatch(fetchGetWeeks());
        this.props.dispatch(fetchGetCourses()); 
    }

    fetchUpdateWeek(updatedWeek) {
        this.props.dispatch(fetchUpdateWeek(updatedWeek));
    }

    addGrade(e, gradeNumber) {
        e.preventDefault();
        const var1 = document.getElementById(gradeNumber);
        //let term = e.currentTarget.dataset.term;
        const newGrade = {
            user :"5cc05cab4f68a203112870e4",
            termDesc: this.props.currentTerm,
            weekNum: this.props.currentWeek,
            courseName:e.currentTarget.dataset.course,
            gradeNum: var1.value,
        }

        if(newGrade) {
            this.props.dispatch(fetchFindGivenGrade(newGrade));
            console.log('this message appears after the addGrade function is complete.');
        }
    }


    
    render() {
            const myWeek = this.props.Weeks.map((singleweek, index) =>
                    <li className="week-detail" key={index}>
                        <div className="week-field"><ReviewLastWeekDetails index={index} {...singleweek} /></div>
                    </li>
            );
        
            const myCourses = this.props.Courses.map((singlecourse, index) =>
                    <li className="li-courses" key={index}>
                        <ReviewLastWeekCourses index={index} {...singlecourse} />  
                    </li>
            );
            const myCourseGradeEditFields = this.props.Courses.map((singlecourse, index) =>
            {
                const gradeNumber = "gradeNumber" + index;
                return (
                        <li className="li-courses" key={index}>
                           
                                <input type="number" 
                                        id={gradeNumber}
                                        index={index}
                                        ref={input => this.courseGradeInput = input}
                                        name={singlecourse.course}
                                    />
                            
                        </li>
                )
            
            });
            const myCourseGradeEditbuttons = this.props.Courses.map((singlecourse, index) =>
            <li className="li-courses" key={index}>
                <div
                     className={`${singlecourse.courseName}btn`}
                     data-course={singlecourse.courseName}
                     onClick={e => this.addGrade(e, "gradeNumber" + index)}>
                        <i class="far fa-save"></i>
                </div>
                {/*  <button 
                    className={`${singlecourse.courseName}btn`}
                    data-course={singlecourse.courseName}
                onClick={e => this.addGrade(e, "gradeNumber" + index)}>Commit Grade</button> */}
                    
            </li>
            );

           
            const myCourseDropDown = this.props.Courses.map((course, index) =>
                <option value={course.courseName} key={index}>{course.courseName}</option>
            );


        return (
            <div>
                 <div>
                    <MainNav />
                </div>
                    <div>
                            <div className="myweek-details-wrapper" >
                                <h2>{this.props.myWeekTitle}</h2>
                                    <ul className="week-details-list">
                                        {myWeek}
                                    </ul>
                            </div> 
                            <div className="course-section">  
                                    <div className="add-course-wrapper">
                                        <UpdateWeekForm
                                            type="updateWeek" courseDropDown={myCourseDropDown}
                                            onUpdate={updatedWeek => 
                                                this.fetchUpdateWeek(updatedWeek)}  />
                                    </div>
            </div>    
                    </div>
                    <hr />
                    <div>
                            <div className="wrapper">
                                <h2>{this.props.gradesSubtitle}</h2>
                                <div className="wrapper">
                                    <ul className="list-horizontal">
                                        {myCourses}
                                    </ul>
                                    <ul className="list-horizontal">
                                        {myCourseGradeEditFields}
                                    </ul>
                                    <ul className="list-horizontal">
                                        {myCourseGradeEditbuttons}
                                    </ul>
                                </div>                         
                            </div>
                    </div>
            </div>
            

        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    const weekNum = state.protectedData.selectedWeek;
    const termDesc = state.protectedData.selectedTerm;
            
    return {
            currentWeek:weekNum,
            currentTerm: termDesc,
            Weeks: state.protectedData.weeks.filter(week => {
                //console.log('inside mapStateToProps: week', week);
                return week.termDesc === 'Spring, 2019' && week.weekNum === 2;
            }),
            Courses: state.protectedData.courses.filter(course => {
                //console.log('inside mapStateToProps: course', course);
                return course.term === 'Spring, 2019';
            }),
            Grades: state.protectedData.grades,
            myWeekTitle: "Review This Week",
            characteristicsSubtitle: "What did you think this last week?",
    };
    
};

export default connect(mapStateToProps)(ReviewLastWeek);