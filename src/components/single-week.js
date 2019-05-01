import React from 'react';

import './css/view-weeks.css';

export function SingleWeek(props) {
        return (
            <div className="single-item">
                <div className="week-data-item studentFullName">{props.studentFullName}</div>
                <div className="week-data-item weeknum">{props.weekNum}</div>
                <div className="week-data-item termDesc">{props.termDesc}</div>
                <div className="week-data-item likedLeast">{props.likedLeast}</div>
                <div className="week-data-item likedMost">{props.likedMost}</div>
                <div className="week-data-item mostDifficult">{props.mostDifficult}</div>
                <div className="week-data-item leastDifficult">{props.leastDifficult}</div>
            </div>
        );
}

export default (SingleWeek);