import React from 'react';

import './css/deliverable.css';

export default class TodayDeliverable extends React.Component {

    render() {

        return (
                <React.Fragment>
                   <div className="deliverable-sub-section sec-one">
                        <li className="item-label weeks-item-label courseName">
                            {this.props.deliverable.courseName}
                        </li>
                    </div>
                    <div className="deliverable-sub-section sec-two">
                        <li className="item-label weeks-item-label dueDate">
                            {this.props.deliverable.dueDate}
                        </li>
                        <li className="item-label weeks-item-label pressure">
                            {this.props.deliverable.pressure}
                        </li>
                        <li className="item-label weeks-item-label prephrs">
                            {this.props.deliverable.prephrs}
                        </li>
                    </div>
                    <div className="deliverable-sub-section sec-three">
                        <li className="item-label weeks-item-labelcolumn-item deliverableName">
                            {this.props.deliverable.deliverableName}
                        </li>
                    </div>
                    <div className="deliverable-sub-section sec-four">
                        <li className="item-label weeks-item-labelcolumn-item desc">
                            {this.props.deliverable.desc}
                        </li> 
                    </div>
                </React.Fragment>
        );
    }
}