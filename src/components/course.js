import React from 'react';

import './css/course.css';

export default class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldCourseName: this.props.courseName,
            newCourseName: ""
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    setDelete(e) {
        e.preventDefault();
        let selectedCourse = {
            termDesc: this.props.termDesc,
            courseName:this.props.courseName
        };
        this.props.submitdeletecourse(selectedCourse); 
    }

    handleChange(e, field) {
        this.setState({
            [field]: e.target.value
          });
    }

    handleUpdate(e) {
        e.preventDefault();
    
        let updateCourse = {
            termDesc: this.props.termDesc,
            oldCourseName: this.state.oldCourseName,
            newCourseName:this.state.newCourseName
        };
        this.props.submitupdatecourse(updateCourse); 
    }

    render () {
        console.log('course:this.props.courseName', this.props.courseName);
        return (
            <div>
                <div>{this.props.courseName}</div>
                <form onSubmit={this.handleUpdate}>
                    <div className="course-unit">
                            <div className="column">
                                <input
                                    className="course-item"
                                    type="text"
                                    value={this.props.courseName}
                                    onChange={e => this.handleChange(e,"newCourseName")}
                                 />
                            </div>
                            <div>
                                <button 
                                    className="update-btn center-btn" 
                                    type="button" 
                                    value="Update"
                                >
                                    Update Course
                                </button>
                                <button className="delete-btn center-btn" onClick={(e) => this.setDelete(e)}><i className="far fa-trash-alt"></i></button>
                            </div>
                    </div>
                    
                </form>
                
            </div>
            
                
            
            );
    }
    
}