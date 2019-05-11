import './css/index.css';
import './css/profile.css';
import React from 'react';


//import {EditBtns} from './edit-btns';
//import {AddCourseForm} from './add-course-form';
//import {fetchGetCourses, fetchAddCourse} from '../actions/protected-data';

import {fetchGetCourses} from '../actions/protected-data';
import { connect } from 'react-redux';


export class CourseList extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetCourses());
    }

    //fetchAddCourse(newCourse) {
   //     this.props.dispatch(fetchAddCourse(newCourse));
   // }
  
    render() {
        //console.log('props', this.props);
        //console.log(courses);
        //const courses = this.props.courseList.map((course,index) => 
       //     <li key={index}>
        //        <div className="item courseName">{course.courseName}</div>
        //        <div className="item edit-btns"><EditBtns type="course" /></div>
        //    </li>
        //);
       
        return (
            <div className="section">
                <h3>{this.props.title}</h3>
                <h3>{this.props.term}</h3>
              {/*}  <div>
                    <ul className="list-horizontal">
                     sdfasdf   
                     {courses} 
                    </ul>
                </div>
                <div className="section">  
                        <div className="wrapper">
                            <AddCourseForm
                                type="newCourse"
                                onAdd={newCourse => 
                                    this.fetchAddCourse(newCourse)}  />
                        </div>
                                </div> */}
            </div>
        );

    }
}

const mapStateToProps = (state, props) => {
    //const {currentUser} = state.auth;
    //const terms = state.protectedData.terms;
    const courses = state.protectedData.courses;

    //const termCourses = courses.filter(course => {
     //   return course.term === "Fall, 2019";
    //});
    return {
        //title: "Your courses",
        //termList: Object.keys(terms).map(termId => terms[termId]),
    //courseList: Object.keys(termCourses).map(courseId => termCourses[courseId])
    };
};



export default connect(mapStateToProps)(CourseList);
