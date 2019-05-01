import React from 'react';
import {connect} from 'react-redux';

import {SingleDeliverable} from './single-deliverable';

import './css/view-deliverables.css';

export class TodayDeliverables extends React.Component {
        render() {
                //console.log('this props for today dels ', this.props.todayDels);
               const todayDels = this.props.todayDels.map((singledeliverable, index) =>
                        <li className="singledeliverable-wrapper" key={index}>
                                <SingleDeliverable index={index} {...singledeliverable} />
                        </li>
               );
                
                return (
                        <div className="data-wrapper">
                                <h2>{this.props.title}</h2>
                                <ul className="items-list">
                                        {todayDels}
                                </ul>
                        </div> 
                        );
        }
}

const mapStateToProps = state => {
        return {
                todayDels: state.protectedData.deliverables.filter(deliverable => {
                        let today = new Date();
                        today = today.getFullYear() + '-' + (today.getMonth() + 1) + "-" + today.getDate();
                        let dueDate = new Date(deliverable.dueDate);
                        dueDate = dueDate.getFullYear() + '-' + (dueDate.getMonth() + 1) + "-" + dueDate.getDate();
                        //console.log("today is: " + today + " --- dueDate is: " + dueDate);
                        return today === dueDate;
                }),
                title: "Deliverables for Today"
        };
        
};

export default connect(mapStateToProps)(TodayDeliverables);
        