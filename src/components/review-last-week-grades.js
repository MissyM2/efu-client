import React from 'react';

import './css/review-current-week.css';

export function ReviewCurrentWeekGrades(props) {
    return (
            <div className="single-grade">
                <div className="item gradeNum">{props.gradeNum}</div>
                <div className="item gradeNum">{props.course}</div>
            </div>  
            );

}

export default (ReviewCurrentWeekGrades);