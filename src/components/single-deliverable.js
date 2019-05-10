import React from 'react';

import {EditBtns} from './edit-btns';

import './css/index.css';
import './css/deliverables.css';

export function SingleDeliverable(props) {
    //console.log('props inside single deliverable', props);
    return (
            <div className="single-deliverable">
                        <div className="deliverable-data-item courseName">{props.deliverable.courseName}</div>
                        <div className="deliverable-data-item termDesc">{props.deliverable.termDesc}</div>
                        <div className="deliverable-data-item weekNum">{props.deliverable.weekNum}</div>
                        <div className="deliverable-data-item dueDate">{props.deliverable.dueDate}</div>
                        <div className="deliverable-data-item pressure">{props.deliverable.pressure}</div>
                        <div className="deliverable-data-item prephrs">{props.deliverable.prephrs}</div>
                        <div className="deliverable-data-item deliverableName">{props.deliverable.deliverableName}</div>
                        <div className="deliverable-data-item desc">{props.deliverable.desc}</div> 
                        <EditBtns type="deliverable" /> 
            </div>  
            );

}

export default (SingleDeliverable);