import React from 'react';
import {connect} from 'react-redux';

import {fetchGetWeeks, fetchUpdateWeek} from '../actions/protected-data';
import {fetchGetCourses} from '../actions/protected-data';
import {fetchGetGrades} from '../actions/protected-data';

import {ReviewLastWeekCourses} from './review-last-week-courses';
import {ReviewLastWeekGrades} from './review-last-week-grades';
//import {SingleEditWeek} from './single-edit-weekold';

import './css/review-last-week.css';
//import { weekdays } from 'moment';

export class ReviewLastWeek extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            readMode: true,
            likedLeast: "",
            likedMost: "",
            leastDifficult: "",
            mostDifficult: ""
        }
        this.renderReadMode = this.renderReadMode.bind(this);
        this.renderEditModeLikedLeast = this.renderEditModeLikedLeast.bind(this);
        this.changeReadMode = this.changeReadMode.bind(this);
        this.updateLikedLeast = this.updateLikedLeast.bind(this);
        this.updateLikedMost = this.updateLikedMost.bind(this);
        this.updateMostDifficult = this.updateMostDifficult.bind(this);
        this.updateLeastDifficult = this.updateLeastDifficult.bind(this);
    }

    componentDidMount() {
        //seed with data from db
        this.props.dispatch(fetchGetWeeks());
        this.props.dispatch(fetchGetCourses()); 
        this.props.dispatch(fetchGetGrades());    
    }

    renderReadMode() {
        return (<div>
            this is in read readMode
        </div>);
    }

    updateLikedLeast(e) {
        this.setState({
            likedLeast: e.target.value
        })
    }
    updateLikedMost(e) {
        this.setState({
            likedMost: e.target.value
        })
    }

    updateMostDifficult(e) {
        this.setState({
            mostDifficult: e.target.value
        })
    }
    updateLeastDifficult(e) {
        this.setState({
            leastDifficult: e.target.value
        })
    }

    submitFetch(e) {
        //get values from form
        const updatedWeek = {
            termDesc: 'Spring, 2019',
            weekNum: 2,
            likedLeast: this.state.likedLeast,
            likedMost: this.state.likedMost,
            mostDifficult:this.state.mostDifficult,
            leastDifficult: this.state.leastDifficult
           
        }
        console.log(updatedWeek);
        console.log('courses are', )

        this.props.dispatch(fetchUpdateWeek(updatedWeek));
        
        //prepare object to send to fetch
        //fetch call goes here
        // success callback of fetch you do something here
        // error callback oif fetch, you do something else here
 
        console.log('likedLeast', this.state.likedLeast);
        console.log('likedMost', this.state.likedMost);
        console.log('mostDifficult', this.state.mostDifficult);
        console.log('leastDifficult', this.state.leastDifficult);
    }

    renderEditModeLikedLeast() {
        const myCourseDropDown = this.props.myCourses.map((course, index) =>
            <option value={course.courseName} key={index}>{course.courseName}</option>
        );
/*
<div class="newitem itemlabel"><label>which season</label></div>
                    <div class="item itembody">
                            <select class="updatefields" id="js-updateseason" type="text" name="season">
                                <option value ="${STORE.currentEditItem.season}">${STORE.currentEditItem.season}</option>
                                <option value = "Always in Season">Always in Season</option>
                                <option value = "Fall Basics">Fall Basics</option>
                                <option value = "Winter Basics">Winter Basics</option>
                                <option value = "Spring Basics">Spring Basics</option>
                                <option value = "Summer Basics">Summer Basics</option>
                            </select>
                    </div>

*/
        return (<div>
            This is in liked least
          {/*  <select className="courseList" onChange={e => this.updateLikedLeast(e)}>
                <option value="{this.props.myWeeks.likedLeast}">{this.props.myWeeks.likedLeast}</option>
                {myCourseDropDown}
        </select> */}
            <input type="text" onChange={e => this.updateLikedLeast(e)}/>
           {/* <button onClick={e => this.submitFetch(e)}>Submit new text</button>*/}
        </div>);
    }

    renderEditModeLikedMost() {
        return (<div>
            This is in liked most
            <input type="text" onChange={e => this.updateLikedMost(e)}/>
           {/* <button onClick={e => this.submitFetch(e)}>Submit new text</button> */}
        </div>);
    }

    renderEditModeMostDifficult() {
        return (<div>
            This is in edit most difficult
            <input type="text" onChange={e => this.updateMostDifficult(e)}/>
           {/* <button onClick={e => this.submitFetch(e)}>Submit new text</button>*/}
        </div>);
    }

    renderEditModeLeastDifficult() {
        return (<div>
            This is in least difficult
            <input type="text" onChange={e => this.updateLeastDifficult(e)}/>
           {/* <button onClick={e => this.submitFetch(e)}>Submit new text</button> */}
        </div>);
    }

    changeReadMode() {
        let newValue = this.state.readMode;
        if(newValue === true){
            newValue = false;
        } else {
            newValue = true;
        }
        
        this.setState({
            readMode: newValue
        });
    }

    //getWeek() {
    //    const myWeek = this.props.myWeeks.map((week =>

            
    //    );


   
    
    render() {
        console.log(this.state.readMode);
       // console.log('myWeek is ', this.props.myWeek.likedLeast);
        
       // console.log('this.props.myWeeks ', this.props.myWeeks[0]);
        //console.log('my weeks ', this.props.myWeeks[0].likedLeast);
            let likedLeast ="";
            if (this.state.readMode === true) {
                likedLeast = this.renderReadMode();
            } else {
                likedLeast = this.renderEditModeLikedLeast();
            }

            let likedMost ="";
            if (this.state.readMode === true) {
                likedMost = this.renderReadMode();
            } else {
                likedMost = this.renderEditModeLikedMost();
            }

            let mostDifficult ="";
            if (this.state.readMode === true) {
                mostDifficult = this.renderReadMode();
            } else {
                mostDifficult = this.renderEditModeMostDifficult();
            }

            let leastDifficult ="";
            if (this.state.readMode === true) {
                leastDifficult = this.renderReadMode();
            } else {
                leastDifficult = this.renderEditModeLeastDifficult();
            }

            const myCourses = this.props.myCourses.map((singlecourse, index) =>
                     <li className="course-grade-detail" key={index}>
                             <div className="course-field"><ReviewLastWeekCourses index={index} {...singlecourse} /></div>
                     </li>
            );
            const myGrades = this.props.myGrades.map((singlegrade, index) =>
                    <li className="course-grade-detail" key={index}>
                            <div className="grade-field"><ReviewLastWeekGrades index={index} {...singlegrade} /></div>
                    </li>
            );

        return (
            
            <div>
              {/*  <div className="tester">
                    {likedLeast}
                    <button onClick={this.changeReadMode}>Change mode</button>
        </div> */}
                    <div className="myweek-wrapper">
                        <div>this.props.myWeeks.studentFullName</div>
                        <h2>{this.props.myWeekTitle}</h2>
                        
                <div className="myweek-label">Student Info</div>
                <div className="student-section-labels">
                    <div className="myweekitemlabel studentFullName">Student Name</div>
                    <div className="myweekitemlabel weeknum">Week Number</div>
                    <div className="myweekitemlabel termDesc">Term</div>
                </div>
                <div className="student-section">
                    <div className="myweekitem studentFullName">fasdfasdfasdfthis.props.myWeeks.studentFullName</div>
                    <div className="myweekitem weeknum">this.props.myWeeks.weekNum</div>
                    <div className="myweekitem termDesc">this.props.myWeeks.termDesc</div>
                </div>
                <div className="myweek-label">what do you like?</div>
                <div className="student-section-labels">
                    <div className="myweekitemlabel likedLeast">Course You Liked Least</div>
                    <div className="myweekitemlabel likedMost">Course You Liked Most</div>
                </div>
                <div className="student-section">
                    <div className="myweekitem likedLeast">{likedLeast}</div>
                    <div className="myweekitem likedMost">{likedMost}</div>
                </div>
                <div className="myweek-label">what is the most difficult</div>
                <div className="student-section-labels">
                    <div className="myweekitemlabel mostDifficult">Your Most Difficult Course</div>
                    <div className="myweekitemlabel leastDifficult">Your Least Difficult Course</div>
                </div>
                <div className="student-section">
                    <div className="myweekitem mostDifficult">{mostDifficult}</div>
                    <div className="myweekitem leastDifficult">{leastDifficult}</div>
                </div>
            </div>
            <div><div><button onClick={this.changeReadMode}>change mode</button></div>
            <div><button onClick={e => this.submitFetch(e)}>Submit new text</button></div>
                        <button onClick={this.changeReadMode}>change to Edit mode for updating</button>
                    </div> 
                    <div className="myweek-grades-wrapper">
                        <h2>{this.props.gradesSubtitle}</h2>
                        <div className="courses-grades-wrapper">
                            <ul className="course-grades-list">
                               {myCourses}
                               {myGrades}
                            </ul>
                        </div> 
                        {/*<button className="action-btns small-btn update-btn" data-id="${this.props.myWeeks.id}" data-likedMost="${this.props.myWeeks.likedMost}" data-likedLeast="${this.props.myWeeks.likedLeast}" data-mostDifficult="${this.props.myWeeks.mostDifficult}" data-leastDifficult="${this.props.myWeeks.leastDifficult}">Update My Grades for My Week</button>*/}
                        
                    </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
   //console.log('my week data ', state.protectedData.weeks);
   const myWeeks = state.protectedData.weeks.filter(week => {
    //console.log('inside mapStateToProps: week', week);
    return week.termDesc === 'Spring, 2019' && week.weekNum === 2;
   });
   console.log('inside mapStateToProps ', myWeeks);
   Object.keys(myWeeks).forEach(function(key,index) {
       console.log(key, index);
    // key: the name of the object key
    // index: the ordinal position of the key within the object 
});
    return {
            //*myWeeks: state.protectedData.weeks.filter(week => {
                //console.log('inside mapStateToProps: week', week);
              //  return week.termDesc === 'Spring, 2019' && week.weekNum === 2;
            //}),
            myWeek: myWeeks[0],
            myCourses: state.protectedData.courses.filter(course => {
                //console.log('inside mapStateToProps: course', course);
                return course.term === 'Spring, 2019';
            }),
            myGrades: state.protectedData.grades.filter(grade => {
                return grade.term === 'Spring, 2019';
            }),
            myWeekTitle: "Review This Week",
            characteristicsSubtitle: "What did you think this last week?",
            gradesSubtitle: "What are your grades after this week?"
    };
    
};

export default connect(mapStateToProps)(ReviewLastWeek);