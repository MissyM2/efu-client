import React from 'react';

import './css/review-current-week.css';

export function ReviewCurrentWeekCourses(props) {
    return (
            <div 
                className="item courseName" 
                data-term="Spring, 2019" 
                data-week="2" 
                data-coursename={props.courseName}>
                    {props.courseName}
            </div>
            );

}

export default (ReviewCurrentWeekCourses);