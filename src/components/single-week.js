import React from 'react';

import './css/view-profile.css';

export function SingleWeek(props) {
        return (
            <div className="single-item">
                <div className="item-data weeknum">{props.studentFullName}</div>
                <div className="item-data weeknum">{props.weekNum}</div>
                <div className="item-data weeknum">{props.termDesc}</div>
                <div className="item-data likedLeast">{props.likedLeast}</div>
                <div className="item-data likedMost">{props.likedMost}</div>
                <div className="item-data mostDifficult">{props.mostDifficult}</div>
                <div className="item-data leastDifficult">{props.leastDifficult}</div>
            </div>
        );
}

export default (SingleWeek);