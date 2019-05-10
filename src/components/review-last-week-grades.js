import React from 'react';

import './css/review-last-week.css';

export function ReviewLastWeekGrades(props) {
    return (
            <div className="single-grade">
                <div className="item gradeNum">{props.gradeNum}</div>
                <div className="item gradeNum">{props.course}</div>
            </div>  
            );

}

export default (ReviewLastWeekGrades);