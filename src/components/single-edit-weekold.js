import React from 'react';

import './css/review-last-week.css';

export class SingleEditWeek extends React.Component {
    render() {
        console.log(props.readMode);
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
                <div className="myweek-label">what do you like?</div>
                <div className="student-section-labels">
                    <div className="myweekitemlabel likedLeast">Course You Liked Least</div>
                    <div className="myweekitemlabel likedMost">Course You Liked Most</div>
                </div>
                <div className="student-section">
                    <div className="myweekitem likedLeast">{props.likedLeast}
                    <button onClick={props.changeModeFunctionPassedDown}>change mode</button></div>
                    <div className="myweekitem likedMost">{props.likedMost}</div>
                </div>
                <div className="myweek-label">what is the most difficult</div>
                <div className="student-section-labels">
                    <div className="myweekitemlabel mostDifficult">Your Most Difficult Course</div>
                    <div className="myweekitemlabel leastDifficult">Your Least Difficult Course</div>
                </div>
                <div className="student-section">
                    <div className="myweekitem mostDifficult">{props.mostDifficult}</div>
                    <div className="myweekitem leastDifficult">{props.leastDifficult}</div>
                </div>
            </div>
        );
    }
    
}

export default (SingleEditWeek);



