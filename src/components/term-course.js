import React from 'react';
import AddtermcourseForm from './addtermcourse-form';
import {fetchAddTermcourse} from '../actions/protected-data';
import { connect } from 'react-redux';

import './css/term-course.css';

export class TermCourse extends React.Component {
    fetchAddTermcourse(termcourse) {
        this.props.dispatch(fetchAddTermcourse(termcourse, this.props.index));
    }

    render() {
        const termcourses = this.props.termcourses.map((termcourse,index) => 
            <li className="termcourse-wrapper" key={index}>
                <TermCourse {...termcourse} />
            </li>
        );

        return (
            <div>
                    <h2>termcourse-form</h2>
                    <h2>{this.props.title}</h2>
                    <ul className="termcourses">
                        {termcourses}
                        <li className="add-course-wrapper">
                            <AddtermcourseForm
                                type="termcourse"
                                onAdd={(termcourse) => 
                                    this.fetchAddTermcourse(termcourse)}  />
                        </li>
                    </ul>
            </div>  
        );

    }
}

TermCourse.defaultProps = {
    title: ''
};

export default connect()(TermCourse);