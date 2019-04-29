import React from 'react';

import './css/view-deliverables.css';

export function SingleDeliverable(props) {
    return (
            <div className="single-item">
                <div className="item-data courseName">{props.course.courseName}</div>
                <div className="item-details">
                        <div className="item-data dueDate">{props.dueDate}</div>
                        <div className="item-data pressure">{props.pressure}</div>
                        <div className="item-data prephrs">{props.prephrs}</div>
                        <div className="item-data deliverableName">{props.deliverableName}
                </div>
                        <div className="item-data desc">{props.desc}</div>
                </div>
               
                
                
                
            </div>  
            );

}

export default (SingleDeliverable);