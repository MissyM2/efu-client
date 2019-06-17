import React from 'react';

import './css/deliverable.css';

export default class Deliverable extends React.Component {

    render() {

        return (
                <React.Fragment>
                    
                    <div className="deliverable-sub-section sec-one">
                        <li className="item-label weeks-item-label field">
                                {this.props.deliverable.dueDateFormatted}
                        </li>
                        <li className="item-label weeks-item-label field">
                            {this.props.deliverable.prephrs} hours prep
                        </li>
                    </div>
                    <div className="deliverable-sub-section sec-three">
                        <li className="item-label weeks-item-label field">
                            {this.props.deliverable.courseName}
                        </li>
                        <li className="item-label weeks-item-label column-item field">
                            {this.props.deliverable.deliverableName}
                        </li>
                        
                    </div>
                    <div className="deliverable-sub-section sec-two">
                       
                        <li className="item-label weeks-item-label column-item field">
                            {this.props.deliverable.desc}
                        </li> 
                        
                        <li className="item-label weeks-item-label field">
                            {this.props.deliverable.impact}
                        </li>
                        
                    </div>
                   
                </React.Fragment>
        );
    }
}