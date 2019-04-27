import React from 'react';

import { connect } from 'react-redux';

import {SingleCourse} from './single-course';

import {fetchGetCourses} from '../actions/protected-data';

//import AddcourseForm from './addcourse-form';
//import {fetchAddcourse} from '../actions/protected-data';

import './css/view-courses.css';

export class Courses extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetCourses());
    }

    render() {
        const courses = this.props.courses.map((singlecourse,index) => 
            <li key={index}>
                <SingleCourse index={index} {...singlecourse} />
            </li>
        );

        return (
            <div className="courses-wrapper">
                    <h2>{this.props.title}</h2>
                    <ul className="courses-list">
                        {courses}
                        {/*<li className="add-course-wrapper">
                            <AddcourseForm
                                type="course"
                                onAdd={(course) => 
                                    this.fetchAddcourse(course)}  />
                                </li>*/}
                    </ul>
            </div>  
        );

    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        courses: state.protectedData.courses,
        title: "Your courses"
    };
}

export default connect(mapStateToProps)(Courses);