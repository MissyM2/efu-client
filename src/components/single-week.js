import React from 'react';
import {connect} from 'react-redux';

import './css/single-week.css';


export function SingleWeek(props) {
        return (
            <div className="single-week">
                <div className="username">{props.weekNum}</div>
                <div className="course">{props.startDate}</div>
                <div className="dueDate">{props.endDate}</div>
                <div className="deliverableName">{props.likedLeast}</div>
                <div className="pressure">{props.likedMost}</div>
                <div className="desc">{props.mostDifficult}</div>
                <div className="prephrs">{props.leastDifficult}</div>
            </div>
        );
}

//const mapStateToProps = (state, props) => ({
//    const deliverableId = props.match.params.deliverableId;
 //   return Object.assign({}, deliverable, {
 //           deliverableId
 //   });

//};

export default connect(mapStateToProps)(SingleWeek);