import React from 'react';
import { connect } from 'react-redux';

import {SingleCourse} from './single-course';
import {AddCourseForm} from './add-course-form';
import {fetchGetCourses, fetchAddCourse} from '../actions/protected-data';

import './css/courses.css';

export class Courses extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetCourses());
    }

    fetchAddCourse(newCourse) {
        this.props.dispatch(fetchAddCourse(newCourse));
    }

    render() {
        const courses = this.props.courses.map((singlecourse,index) => 
            <li key={index}>
                <SingleCourse index={index} {...singlecourse} />
            </li>
        );

        return (
            <div className="data-wrapper">
                    <h2>{this.props.title}</h2>
                    <div className="course-section">
                        <ul className="course-list">
                            {courses}
                        </ul>
                    </div>
                    <div className="add-course-wrapper">
                        <AddCourseForm
                            type="newCourse"
                            onAdd={newCourse => 
                                this.fetchAddCourse(newCourse)}  />
                    </div>
            </div>  
        );

    }
}

const mapStateToProps = state => {
    //console.log(state);
    return {
        courses: state.protectedData.courses,
        title: "Your courses"
    };
}

export default connect(mapStateToProps)(Courses);