import React from 'react';

import './css/single-course.css';

export function SingleCourse(props) {
    return (
            <div className="single-course">
                <div className="item-data courseName">{props.courseName}</div>
            </div>  
            );

}

export default (SingleCourse);