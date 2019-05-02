import React from 'react';

import {EditBtns} from './edit-btns';

import './css/deliverables.css';

export function SingleDeliverable(props) {
    return (
            <div className="single-deliverable">
                        <div className="deliverable-data-item courseName">{props.courseName}</div>
                        <div className="deliverable-data-item termDesc">{props.termDesc}</div>
                        <div className="deliverable-data-item weekNum">{props.weekNum}</div>
                        <div className="deliverable-data-item dueDate">{props.dueDate}</div>
                        <div className="deliverable-data-item pressure">{props.pressure}</div>
                        <div className="deliverable-data-item prephrs">{props.prephrs}</div>
                        <div className="deliverable-data-item deliverableName">{props.deliverableName}</div>
                        <div className="deliverable-data-item desc">{props.desc}</div> 
                        <EditBtns type="deliverable" /> 
            </div>  
            );

}

export default (SingleDeliverable);