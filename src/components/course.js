import React from 'react';
import AddcourseForm from './addcourse-form';
import {fetchAddcourse} from '../actions/protected-data';
import { connect } from 'react-redux';

import './css/term-course.css';

export class Course extends React.Component {
    fetchAddcourse(course) {
        this.props.dispatch(fetchAddcourse(course, this.props.index));
    }

    render() {
        const courses = this.props.courses.map((course,index) => 
            <li className="course-wrapper" key={index}>
                <course {...course} />
            </li>
        );

        return (
            <div>
                    <h2>course-form</h2>
                    <h2>{this.props.title}</h2>
                    <ul className="courses">
                        {courses}
                        <li className="add-course-wrapper">
                            <AddcourseForm
                                type="course"
                                onAdd={(course) => 
                                    this.fetchAddcourse(course)}  />
                        </li>
                    </ul>
            </div>  
        );

    }
}

Course.defaultProps = {
    title: ''
};

export default connect()(Course);