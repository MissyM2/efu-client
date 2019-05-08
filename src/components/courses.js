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
        //const courses = this.props.courses;
        console.log(courses);
        const courses = this.props.courses.map((singlecourse,index) => 
            <li key={index}>
                <SingleCourse index={index} {...singlecourse} />
            </li>
        );

        return (
            <div className="data-wrapper">
                this is courses
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

const mapStateToProps = (state, props) => {
    console.log('current state is ', state);
    console.log(' current props is ', props);
    //const courseId = props.match.params.courseId;
    //const term = "5cc77287e2575807eae72b64";
    //sole.log('termId is ', courseId);
    //console.log('term is ', term);
    //const term = state[termId];
    return {
   //     termId,
   //     termName: term.termDesc,
   //     courses: Object.keys(term.courses).map(
    //        courseId => term.courses[courseId]
    //   ),
        courses: state.protectedData.courses,
        title: "Your courses"
    };
}

export default connect(mapStateToProps)(Courses);