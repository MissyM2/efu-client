import React from 'react';

import {Link} from 'react-router-dom';

import './css/courses.css';

export default class AddCourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            fields: {
                courseName:"",
                courseDesc:""
            },
            errors: {}
        }
    }
 
    addformSubmit(e) {
        e.preventDefault();
        let newcourse = {
            termDesc: this.props.currentterm,
            courseName:this.state.fields.courseName,
            courseDesc: this.state.fields.courseDesc
        }
        this.setState({
            fields:{
                courseName:"",
                courseDesc: ""
            }
        });
        
        this.setEditing(false);
        this.props.submitaddcourse(newcourse);
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field]=e.target.value;
        this.setState({fields});
    }

    setEditing(editing) {
        this.setState({
            editing
        });
    }

    render() {
        if (!this.state.editing) {
            const text = `Add a ${this.props.type}`;
            return (
                <div className="blue-btn btn-med tenpx-bottom-margin"
                        onClick={(e) => {
                            e.preventDefault();
                            this.setEditing(true);
                            this.props.setCourseIsChanged(false);
                        }}>
                        <Link to="#">{text}...</Link>
                </div>
            );
        }
        return (
            <div className="add-course-form">
                    <form onSubmit={this.addformSubmit.bind(this)}>
                        <h2 className="heading">Add Your Course</h2>
                        <div className={this.props.error ? "error-msg" : ""}>{this.props.error}</div>
                        <div className="courseName-unit">
                                <input
                                    className={this.state.errors["courseName"] ? "course-item field error": "course-item field"}
                                    ref="courseName"
                                    placeholder="Course Name"
                                    type="text"
                                    size="30"
                                    name="courseName"
                                    onChange = {this.handleChange.bind(this,"courseName")}
                                    value = {this.state.fields["courseName"]}
                                    aria-label="courseName"
                                />
                                <div className="error-msg">{this.state.errors["courseName"]}</div>
                        </div>
                        <div className="courseDesc-unit">

                                <textarea 
                                    className={this.state.errors["courseDesc"] ? "course-item field error": "course-item field"}
                                    ref="courseDesc"
                                    placeholder="Course Description"
                                    type="text"
                                    rows="2"
                                    cols="30"
                                    wrap="soft"
                                    size="60"
                                    name="CourseDesc"
                                    onChange={this.handleChange.bind(this,"courseDesc")}
                                    value = {this.state.fields["courseDesc"]}
                                    aria-label="CourseDesc"
                                />
                                <div className="error-msg">{this.state.errors["courseDesc"]}</div>
                        </div>
                        <div className="action-btns">
                            <button type="submit" className="blue-btn btn-small fivepx-margin">Add </button>
                            <button className="blue-btn btn-small fivepx-margin" type="button" onClick={() => this.setEditing(false)}>
                                Cancel
                            </button>    
                        </div>
                    </form>
            </div>
        );
    }

}