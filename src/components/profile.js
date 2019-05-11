import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchGetTerms, fetchAddTerm} from '../actions/protected-data';
import {fetchGetCourses, fetchAddCourse} from '../actions/protected-data';

import {MainNav} from './navbar';
import {AddTermForm} from './add-term-form';
//import {CourseList} from './course-list';
import {AddCourseForm} from './add-course-form';

import './css/profile.css';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myTerm:'',
            myCourses: []
        };
        //this.setMyCourses = this.setMyCourses.bind(this);

    }

    componentDidMount() {
        this.props.dispatch(fetchGetTerms());
        this.props.dispatch(fetchGetCourses());
    };

/*
    fetchAddTerm(term) {
        this.props.dispatch(fetchAddTerm(term));
    }
*/
    setMyCourse = (e) => {
        e.preventDefault();
        this.setState({myTerm: e.currentTarget.dataset.term});
        //var newCourseArray = ['hair twist 101', 'bread making 101', 'building flying saucers 101', 'digging for bones 101'];
        var newCourseArray = this.props.currentCourses;
        this.setState({myCourses: [this.state.myCourses, ...newCourseArray]});
 
        
        console.log('AFTER setStatES this props.currentCourses', this.props.currentCourses);
        console.log('AFTER setStatES this.state.myTerm', this.state.myTerm);
        console.log('AFTER setStatES this state.myCourses', this.state.myCourses);
    };


render() {
     
      const termCourses = this.props.courseList.filter(course => {
        return course.term === this.state.myTerm;
      });

      
      const myCourses = this.props.currentCourses.map((course,index) => 
            <li key={index}>
              <div className="item courseName">{course.courseName}</div>
          </li>
        );
        console.log('myCourses with html tags ', myCourses);

        const myTerms = this.props.termList.map((term, index) => 
        <li className="item" key={index}>
            <Link to={`/${term.termDesc}`}>
                <div 
                  className={this.state.myTerm === term.termDesc ? 'item termDesc highlight': 'item termDesc'} 
                  data-term={term.termDesc} 
                  onClick={this.setMyCourse}>{term.termDesc}</div>
            </Link> 
        </li>
        );

        return (
            <div>
                    <h3>Terms</h3>
                    <nav className="term-menu">
                        <ul className="list-horizontal">
                            {myTerms}
                        </ul>
                    </nav> 
                
                    <h3>Courses</h3>
                    <h3><button type="button" onClick={(e) => this.setMyCourses(e)}>see courses for this term</button></h3>
                    <div>
                          <ul className="list-horizontal">
                          {this.state.myTerm} courses will go here
                          </ul>
                    </div>  
            </div>  
        );
    }
}


const mapStateToProps = state => {
    const weekNum = state.protectedData.selectedWeek;
    const termDesc = state.protectedData.selectedTerm;
    const terms = state.protectedData.terms;
    const courses = state.protectedData.courses;
    return {
        currentWeek:weekNum,
        currentTerm: termDesc,
        currentCourses: courses
                           .map(course => {
                                return course.courseName
                            }),
        termList: Object.keys(terms).map(termId => terms[termId]),
        courseList: Object.keys(courses).map(courseId => courses[courseId]),
        //courseList: Object.keys(termCourses).map(courseId => termCourses[courseId])
    };
};

export default connect(mapStateToProps)(Profile);

//.filter(course => {
////    return course.term === state.protectedData.selectedTerm;
//}) 