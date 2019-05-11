import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchGetTerms, fetchAddTerm} from '../actions/protected-data';
import {fetchGetCourses, fetchAddCourse} from '../actions/protected-data';

import {MainNav} from './main-nav';
import {AddTermForm} from './add-term-form';
//import {CourseList} from './course-list';
import {AddCourseForm} from './add-course-form';
//import {WeekList} from './week-list';
//import {SingleTerm} from './single-term';
import {EditBtns} from './edit-btns';

import './css/profile.css';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myTerm:'missy',
            myCourses:[]
        };
        //this.onClick = this.onClick.bind(this);

    }

    componentDidMount() {
        this.props.dispatch(fetchGetTerms());
        this.props.dispatch(fetchGetCourses());
    };


    fetchAddTerm(term) {
        this.props.dispatch(fetchAddTerm(term));
    }

    setMyCourses(e) {
      e.preventDefault;
      this.setState({myCourses: this.props.termCourses});
    }
    onClick(e) {
        e.preventDefault();
       this.setState({myTerm: e.currentTarget.dataset.term});
  
    }

    render() {
      console.log('right after render ', this.state.myTerm);
     
      const termCourses = this.props.courseList.filter(course => {
        return course.term === this.state.myTerm;
      });
      console.log('right after render myCourses ', this.state.myCourses);
        const myCourses = this.state.myCourses.map((course,index) => 
            <li key={index}>
              <div className="item courseName">{course.courseName}</div>
              <div className="item edit-btns"><EditBtns type="course" /></div>
          </li>
        );
        console.log('inside render: myCourses', myCourses);

        const myTerms = this.props.termList.map((term, index) => 
        <li className="item" key={index}>
            <Link to={`/${term.termDesc}`}>
                <div 
                  className={this.state.profileSelectedTerm === term.termDesc ? 'item termDesc highlight': 'item termDesc'} 
                  data-term={term.termDesc} 
                  onClick={(e) => this.onClick(e)}>{term.termDesc}</div>
                <div className="item edit-btns"><EditBtns type="term" /></div>
            </Link> 
        </li>
        );

        return (
            <div>
                <MainNav />
                  <h2>{this.props.firstname}'s Profile</h2>
                  <h3>You are working with {this.props.currentTerm} term</h3>
                  <p className="instructions">if you would like to work with another term, click on one of the terms below</p>
                  <hr />
                  <div className="instructions">add, update and delete information on the following:
                      <ul className="list-vertical profile-list">
                            <li>term</li>
                            <li>courses you are taking</li>
                            <li>the weeks of the term</li>
                      </ul>
                    </div>
                <div>{this.state.profileSelectedTerm}</div>
                <div className="section">
                    <h3>{this.props.title}</h3>
                    <nav className="term-menu">
                        <ul className="list-horizontal">
                            {myTerms}
                        </ul>
                    </nav> 
                </div>
                <div className="section">
                    <AddTermForm
                        type="term"
                        onAdd={term => 
                            this.fetchAddTerm(term)}  />
                </div>
                <div className="section">
                    <h3>{this.props.title}</h3>
                    <h3><button type="button" onClick={(e) => this.setMyCourses(e)}>see courses for this term</button></h3>
                    <div>
                          <ul className="list-horizontal">
                           {myCourses}
                          </ul>
                    </div>  
                    <div className="wrapper">
                        <AddCourseForm
                            type="newCourse"
                            onAdd={newCourse => 
                                this.fetchAddCourse(newCourse)}  />
                    </div>
                </div> 
                <div className="section">
                   {/* <WeekList term={this.props.currentTerm} /> */}
                </div>
            </div> 
        );
    }
}


const mapStateToProps = state => {
  const {currentUser} = state.auth;
  const weekNum = state.protectedData.selectedWeek;
  const termDesc = state.protectedData.selectedTerm;
  const terms = state.protectedData.terms;
  const courses = state.protectedData.courses.filter(course => {
    return course.term === state.protectedData.selectedTerm;
  });

  //const termCourses = this.props.courseList.filter(course => {
 //   return course.term === this.state.profileSelectedTerm;
  //  });
  
  //const termCourses = courses.filter(course => {
  //      return course.term === 'Fall, 2019';
 //       });
   //console.log(this.state.profileSelectedTerm);   
    return {
        currentWeek:weekNum,
        currentTerm: termDesc,
        title: "Your Profile",
        termList: Object.keys(terms).map(termId => terms[termId]),
        courseList: Object.keys(courses).map(courseId => courses[courseId]),
        //courseList: Object.keys(termCourses).map(courseId => termCourses[courseId]),
        firstname: currentUser.firstName
    };
};

export default connect(mapStateToProps)(Profile);

   