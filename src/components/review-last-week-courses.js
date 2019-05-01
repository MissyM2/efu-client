import React from 'react';

import './css/review-last-week.css';

export function ReviewLastWeekCourses(props) {
    return (
            <div className="single-course">
                <div className="item-data courseName">{props.courseName}</div>
            </div>  
            );

}

export default (ReviewLastWeekCourses);