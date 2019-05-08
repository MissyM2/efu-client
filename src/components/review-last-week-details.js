import React from 'react';

import './css/review-last-week.css';

export function ReviewLastWeekDetails(props) {
    return (
            <div>
                <div className="myweek-label">Student Info</div>
                <div className="student-section-labels">
                    <div className="myweekitemlabel studentFullName">Student Name</div>
                    <div className="myweekitemlabel weeknum">Week Number</div>
                    <div className="myweekitemlabel termDesc">Term</div>
                </div>
                <div className="student-section">
                    <div className="myweekitem studentFullName">{props.studentFullName}</div>
                    <div className="myweekitem weeknum">{props.weekNum}</div>
                    <div className="myweekitem termDesc">{props.termDesc}</div>
                </div>
            </div>  
            );

}

export default (ReviewLastWeekDetails);