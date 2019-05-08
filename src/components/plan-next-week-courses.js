import './css/plan-next-week.css';
import React from 'react';
import {connect} from 'react-redux';

import {SingleDeliverable} from './single-deliverable';;



export class PlanNextWeekCourses extends React.Component {

    render() {
        console.log('props dels length ', this.props.dels);
        console.log('coursename is ', this.props.dels.length);
        console.log('coursename is ', this.props.courseName);
        const delLength = this.props.dels.length;
        let courseDels = []
        for (let i = 0; i < delLength; i++) {
            if(this.props.courseName === this.props.dels[i].courseName){
                console.log(this.props.courseName + ' and ' + this.props.dels[i].courseName + ' match');
                courseDels.push(<SingleDeliverable key={i} deliverable={this.props.dels[i]} />);
            } else {
                console.log(this.props.courseName + ' and ' + this.props.dels[i].courseName + ' DO NOT match');
            }
        }
        console.log(courseDels);
    
       
        return (
            <div className="single-course">
                <div 
                    className="course-item courseName" 
                    data-term="Spring, 2019" 
                    data-week="2" 
                    data-coursename={this.props.courseName}>
                        {this.props.courseName}
                </div>
                <div>
                    {courseDels}
                </div>
            </div>  
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    const weekNum = 2;
    const termDesc = 'Spring, 2019';
    return {
            //user: currentUser,
            myDeliverables: state.protectedData.deliverables.filter(deliverable =>{
                    return(deliverable.termDesc === termDesc && deliverable.weekNum === weekNum);
            })
    };
    
};

export default connect(mapStateToProps)(PlanNextWeekCourses);

/*   
    function submitFetch(e) {
        e.preventDefault();
        const searchCriteria = {
            user: props.userid,
            termDesc: e.currentTarget.getAttribute("data-term"),
            weekNum: e.currentTarget.getAttribute("data-week"),
            courseName:props.courseName
        }
        console.log('props', props);
        console.log('searchCriteria is ', searchCriteria)
        if (searchCriteria && props.onGetCourseDeliverables) {
            props.onGetCourseDeliverables(e, searchCriteria);
        }
    }

    <div className="course-edit-field">
                        <button 
                            type="button"
                            className="add-btn" 
                            data-term="Spring, 2019"
                            data-week="2"
                            data-coursename={this.courseName}>
                              add deliverable
                        </button>
 //var deliverables = [];
        //for (let i = 0, i < {this.props.dels.length}; i++) {
        //    console.log('this.props.dels.coursename is ', this.props.dels[i].courseName);
            //// of dels.courseName === this.props.courseName, then add it to deliverables and render
            //deliverables.push[]

                        */