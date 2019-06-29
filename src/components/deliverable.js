import React from 'react';

import './css/deliverable.css';

export default function Deliverable(props) {
    //console.log('deliverable: this.props', props);
    return (
            <div>
                
                <div className="deliverable-sub-section sec-one">
                    <li className="item-label weeks-item-label field">
                            {props.dueDateFormatted}
                    </li>
                    <li className="item-label weeks-item-label field">
                        {props.prephrs} hours prep
                    </li>
                </div>
                <div className="deliverable-sub-section sec-three">
                    <li className="item-label weeks-item-label field">
                        {props.courseName}
                    </li>
                    <li className="item-label weeks-item-label column-item field">
                        {props.deliverableName}
                    </li>
                    
                </div>
                <div className="deliverable-sub-section sec-two">
                    
                    <li className="item-label weeks-item-label column-item field">
                        {props.desc}
                    </li> 
                    
                    <li className="item-label weeks-item-label field">
                        {props.impact}
                    </li>
                    
                </div>
                
            </div>
    );
}