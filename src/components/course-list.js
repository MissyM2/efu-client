import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

//import {SingleCourse} from './single-course';
import {EditBtns} from './edit-btns';
import {AddCourseForm} from './add-course-form';
import {fetchGetCourses, fetchAddCourse} from '../actions/protected-data';

import './css/index.css';
import './css/profile.css';

export class CourseList extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetCourses());
    }

    fetchAddCourse(newCourse) {
        this.props.dispatch(fetchAddCourse(newCourse));
    }
  
    render() {
        const courses = this.props.courseList.map((course,index) => 
            <li key={index}>
                    {course.courseName}  
                    <EditBtns type="course" />
            </li>
        );
       
        return (
            <div className="course">
            <h2>{this.props.title}</h2>
            <div className="weeks-section">
                <ul className="list-horizontal">
                    {courses}
                </ul>
            </div>
            <div className="course-section">  
                    <div className="wrapper">
                        <AddCourseForm
                            type="newCourse"
                            onAdd={newCourse => 
                                this.fetchAddCourse(newCourse)}  />
                    </div>
            </div>
            </div>
        );

    }
}

const mapStateToProps = (state, props) => {
    const courses = state.protectedData.courses;
    const termCourses = courses.filter(course => {
        return course.term === "Fall, 2019";
    });
    return {
        title: "Your courses",
        courseList: Object.keys(termCourses).map(courseId => termCourses[courseId])
    };
}

export default connect(mapStateToProps)(CourseList);
