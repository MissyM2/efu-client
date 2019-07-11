import React from 'react';

import './css/deliverable.css';

export default class Deliverable extends React.Component {

   render() {
    return (
                <div>
                        <div className="center">
                                <div className="deliverable-sub-section sec-one">
                                        <div className="column">
                                            <label className="small-titles light-label"> Course Name</label>
                                            <div className="deliverable-field course-name">{this.props.courseName}</div>
                                        </div>
                                        <div className="column">
                                                <label className="small-titles light-label">Due Date</label>
                                                <div className="deliverable-field dueDateFormatted">{this.props.dueDateFormatted}</div>
                                        </div>
                                </div>
                                <div className="deliverable-sub-section sec-three">
                                            <div className="column">
                                                    <label className="small-titles light-label">Prep Hours</label>
                                                    <div className="deliverable-field prephrs">{this.props.prephrs}</div>
                                            </div>
                                            <div className="column">
                                                <label className="small-titles light-label"> Deliverable Name</label>
                                                <div className="deliverable-field deliverableName">{this.props.deliverableName}</div>
                                            </div> 
                                </div>
                                <div className="deliverable-sub-section sec-two">
                                            <div className="column">
                                                    <label className="small-titles light-label"> Description</label>
                                                    <div className="deliverable-field desc">{this.props.desc}</div>
                                            </div>
                                            <div className="column">
                                                    <label className="small-titles light-label"> Impact</label>
                                                    <div className="deliverable-field impact">{this.props.impact}</div>
                                            </div>    
                                </div>
                                
                        </div>
                                 
                </div>
            );
        } 
}