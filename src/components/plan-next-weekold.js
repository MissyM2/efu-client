import React from 'react';
import {connect} from 'react-redux';

import {fetchGetCourses} from '../actions/protected-data';
import {fetchGetDeliverables, fetchAddDeliverable, fetchFindGivenDeliverables} from '../actions/protected-data';
import {PlanNextWeekCourses} from './plan-next-week-courses';

import {AddDeliverableForm} from './add-deliverable-form';

import './css/plan-next-week.css';
import singleCourse from './single-course';

export class PlanNextWeek extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetCourses());
        this.props.dispatch(fetchGetDeliverables());
}

findCourseDeliverables(e, searchCriteria) {
        e.preventDefault();

        //let term = e.currentTarget.dataset.term;
        //console.log(searchCriteria);
        //console.log('amazingly, made it to findCourseDeliverables');
        console.log('this.props inside findCourseDeliverables', this.props);
        this.props.dispatch(fetchFindGivenDeliverables(searchCriteria));
            
        console.log('this message appears after the showdeliverables function is complete.');
        

    }

fetchAddCourse(newDeliverable) {
        this.props.dispatch(fetchAddDeliverable(newDeliverable));
    }
        render() {
                console.log('this.props inside plan next week', this.props);
                //console.log('this props for my Courses ', this.props.myCourses);
                //console.log('this props for my Deliverables', this.props.myDeliverables);
                //const myDeliverables = this.props.myDeliverables.map((singledeliverable, index) => 
               //         <li className="singledeliverable-wrapper" key={index}>
               ////                 <SingleDeliverable index={index} {...singledeliverable} />
                //        </li>
                //        );

                const myCourses = this.props.myCourses.map((singlecourse, index) =>
                        <li className="singlecourse-wrapper" key={index}>
                                <div className="course-header">
                                        <PlanNextWeekCourses index={index} {...singlecourse}/>
                                                
                                </div>
                                <div className="course-section">  
                                        <div className="add-deliverable-wrapper">
                                                <AddDeliverableForm
                                                type="newDeliverable"
                                                onAdd={newDeliverable => 
                                                        this.fetchAddDeliverable(newDeliverable)}  />
                                        </div>
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
        const {currentUser} = state.auth;
        const weekNum = 2;
        const termDesc = 'Spring, 2019';
       // console.log('currentUser', currentUser);
        //console.log('state', state);
        return {
                user: currentUser,
                myCourses: state.protectedData.courses.filter(course => {
                        return course.term === "Spring, 2019";
                }),
                myDeliverables: state.protectedData.deliverables.filter(deliverable =>{
                        return(deliverable.termDesc === termDesc && deliverable.weekNum === weekNum);
                }),
                myCourseDeliverables: state.protectedData.deliverables,
                title: "Plan Next Week"
        };
        
};

export default connect(mapStateToProps)(PlanNextWeek);

//onGetCourseDeliverables={this.findCourseDeliverables.bind(this)}