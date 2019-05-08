import React from 'react';

import './css/review-last-week.css';

export function ReviewLastWeekCourses(props) {
    return (
            <div className="single-course">
                <div 
                    className="course-item courseName" 
                    data-term="Spring, 2019" 
                    data-week="2" 
                    data-coursename={props.courseName}>
                        {props.courseName}
                </div>
            </div>  
            );

}

export default (ReviewLastWeekCourses);