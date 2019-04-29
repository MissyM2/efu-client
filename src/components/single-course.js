import React from 'react';

import './css/view-courses.css';

export function SingleCourse(props) {
    return (
            <div className="single-course">
                <div className="item-data courseName">{props.courseName}</div>
            </div>  
            );

}

export default (SingleCourse);