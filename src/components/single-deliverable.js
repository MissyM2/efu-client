import React from 'react';

import './css/view-deliverables.css';

export function SingleDeliverable(props) {
    return (
            <div className="single-item-details">
                        <div className="item-data courseName">{props.courseName}</div>
                        <div className="item-data termDesc">{props.termDesc}</div>
                        <div className="item-data weekNum">{props.weekNum}</div>
                        <div className="item-data dueDate">{props.dueDate}</div>
                        <div className="item-data pressure">{props.pressure}</div>
                        <div className="item-data prephrs">{props.prephrs}</div>
                        <div className="item-data deliverableName">{props.deliverableName}</div>
                        <div className="item-data desc">{props.desc}</div>    
            </div>  
            );

}

export default (SingleDeliverable);