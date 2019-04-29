import React from 'react';

import {required, nonEmpty, isTrimmed} from '../validators';


import './css/add-form.css';

export class AddCourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        const newCourse = {
            termDesc: this.termDescInput.value.trim(),
            courseName: this.courseNameInput.value.trim()
        }
        console.log(newCourse)
        if (newCourse && this.props.onAdd) {
            this.props.onAdd(newCourse);
        }
        this.termDescInput.value = '';
        this.courseNameInput.value = '';
    };

    setEditing(editing) {
        this.setState({
            editing
        });
    }
    
    render() {
        if (!this.state.editing) {
            return (
                <div className="add-button"
                    onClick={() => this.setEditing(true)}>
                    <a href='#'> Add a {this.props.type}...</a>
                </div>
            )
        }

        return (
                <form
                    className="term add-form"
                    onSubmit={e => this.onSubmit(e)}>
                    
                    <label htmlFor="term-desc">Term Desc</label>
                    <input type="text" 
                        ref={input => this.termDescInput = input}
                        placeholder="Spring, 2019" 
                        name="term-desc"
                        validate={[required, nonEmpty, isTrimmed]} 
                    />
                    <label htmlFor="course-name">Course Name</label>
                    <input type="text" 
                        ref={input => this.courseNameInput = input}
                        placeholder="Biology 101" 
                        name="course-name"
                        validate={[required, nonEmpty, isTrimmed]} 
                    />
                    <button type="submit">Add Course</button>
                    <button type="button" onClick={() => this.setEditing(false)}>
                       Cancel
                    </button>
                </form>
        );

    }
}
