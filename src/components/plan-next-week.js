import React from 'react';
import {connect} from 'react-redux';

import {fetchGetCourses} from '../actions/protected-data';
import {fetchGetDeliverables} from '../actions/protected-data';
import {SingleCourse} from './single-course';

import './css/plan-next-week.css';

export class PlanNextWeek extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetCourses());
        this.props.dispatch(fetchGetDeliverables());
}
        render() {
                console.log('this props for my Courses ', this.props.myCourses);
                console.log('this props for my Deliverables', this.props.myDeliverables);
               const myCourses = this.props.myCourses.map((singlecourse, index) =>
                        <li className="singlecourse-wrapper" key={index}>
                                <div className="course-field">
                                        <h3><SingleCourse index={index} {...singlecourse} /></h3>
                                </div>
                                <div className="course-deliverables-field">
                                        <div className="deliverable-item">deliverableduedate deliverablename  deliverablepressure deliverableprephrs deliverabledesc</div>
                                        <div className="deliverable-item">deliverableduedate deliverablename  deliverablepressure deliverableprephrs deliverabledesc</div>
                                </div>
                                <div className="course-edit-field">
                                        <button className="update-btn" type="button">update</button>
                                        <button className="delete-btn" type="button">delete</button>
                                        <button className="cancel-btn" type="button">cancel</button>
                                </div>
                        </li>
               );
                
                return (
                        <div>
                                <div className="data-wrapper">
                                <h2>{this.props.title}</h2>
                                <ul className="items-list">
                                        {myCourses}
                                </ul>

                                </div> 
                                <div className="course-edit-field">
                                        <button className="add-btn" type="button">add a deliverable</button>
                                </div>
                        </div>
                        
                        );
        }
}

const mapStateToProps = state => {
        return {
                myCourses: state.protectedData.courses.filter(course => {
                        return course.term === "Spring, 2019";
                }),
                myDeliverables: state.protectedData.deliverables.filter(deliverable =>{
                        return(deliverable.term === 'Spring, 2019' && deliverable.week === '2');
                }),
                title: "Plan Next Week"
        };
        
};

export default connect(mapStateToProps)(PlanNextWeek);
        