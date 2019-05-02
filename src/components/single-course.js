import React from 'react';

import {EditBtns} from './edit-btns';

import './css/courses.css';

export function SingleCourse(props) {
    return (
            <div className="single-course">
                <div className="course-data-item courseName">{props.courseName}</div>
                <EditBtns type="course" />
            </div>  
            );

}

export default (SingleCourse);