import React from 'react';

import './css/single-deliverable.css';

export function SingleDeliverable(props) {
    return (
            <div className="single-deliverable">
                    <div className="username">{props.username}</div>
                    <div className="course">{props.course}</div>
                    <div className="dueDate">{props.dueDate}</div>
                    <div className="deliverableName">{props.deliverableName}</div>
                    <div className="pressure">{props.pressure}</div>
                    <div className="desc">{props.desc}</div>
                    <div className="prephrs">{props.prephrs}</div>
            </div>  
            );

}

export default (SingleDeliverable);