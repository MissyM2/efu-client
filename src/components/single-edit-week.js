import React from 'react';

import './css/review-last-week.css';

export function SingleEditWeek(props) {
        return (
            <div>
                <div className="myweek-label">Student Info</div>
                <div className="student-section">
                    <div className="myweekitem studentFullName">{props.studentFullName}</div>
                    <div className="myweekitem weeknum">{props.weekNum}</div>
                    <div className="myweekitem termDesc">{props.termDesc}</div>
                </div>
                <div className="myweek-label">what do you like?</div>
                <div className="student-section">
                    <div className="myweekitem likedLeast">{props.likedLeast}</div>
                    <div className="myweekitem likedMost">{props.likedMost}</div>
                </div>
                <div className="myweek-label">what is the most difficult</div>
                <div className="student-section">
                    <div className="myweekitem mostDifficult">{props.mostDifficult}</div>
                    <div className="myweekitem leastDifficult">{props.leastDifficult}</div>
                </div>
            </div>
        );
}

export default (SingleEditWeek);



