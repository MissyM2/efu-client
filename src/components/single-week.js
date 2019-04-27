import React from 'react';

import './css/single-week.css';

export function SingleWeek(props) {
        return (
            <div className="single-week">
                <div className="item-data weeknum">{props.weekNum}</div>
                <div className="item-data startDate">{props.startDate}</div>
                <div className="item-data endDate">{props.endDate}</div>
                <div className="item-data likedLeast">{props.likedLeast}</div>
                <div className="item-data likedMost">{props.likedMost}</div>
                <div className="item-data mostDifficult">{props.mostDifficult}</div>
                <div className="item-data leastDifficult">{props.leastDifficult}</div>
            </div>
        );
}

export default (SingleWeek);