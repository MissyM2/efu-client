import React from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom';

//import {SingleTerm} from './single-term';
//import {AddTermForm} from './add-term-form';

//import {fetchGetTerms, fetchAddTerm} from '../actions/protected-data';
import {fetchGetCourses} from '../actions/protected-data';

import './css/profile-nav.css';

export class TermList extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchGetCourses());
    };
    

    render() {
        const courses = this.props.courseList.map(course => 
            <li className="term-list-course" key={course.id}>
                <div className="term-list-course-courseName">{course.courseName}</div>
            </li>
            );

        return (
            <div className="term">
                <h2>{this.props.termDesc}</h2>
                <ul className="course-list">
                    {courses} 
                </ul>
            </div>
                
        );

    }

    
    }

const mapStateToProps = (state,props) => {
    console.log(state);
    const termId = props.match.params.termId;
    const term = state[termId];
    return {
       
        courses: state.courses,
        termId,
        //termName: term.termDesc,
        courseList: Object.keys(term.courses).map(
            courseId => term.courses[courseId]
        )
    };
    
    
};

export default connect(mapStateToProps)(TermList);
                