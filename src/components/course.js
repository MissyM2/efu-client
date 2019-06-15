import React from 'react';



import './css/course.css';

export default class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldCourseName: this.props.courseName,
            newCourseName: '',
            gradeCount:0,
            
        }
    }


    prepDelete(e) {
         // find out if there are grades for the selected course
         const tempGrades = this.props.currentgrades.filter(grade => {
            return grade.course == this.state.oldCourseName && grade.gradeNum > 0;
        });
        //console.log('tempGrades', tempGrades);
        this.setState({
            gradeCount:tempGrades.length
        });

        this.props.setcoursedeletemodal(true);
        //console.log('course: this.props', this.props);
    }

    

    

    handleChange(field, e) {
        this.setState({
            newCourseName: e.target.value
        });
    }

    updateSubmit(e) {
        e.preventDefault();
        let updateCourse = {
            termDesc: this.props.termDesc,
            oldCourseName: this.state.oldCourseName,
            newCourseName:this.state.newCourseName
        };
        console.log('Course: updateCourse', updateCourse);
        this.props.submitupdatecourse(updateCourse); 
    }

    render () {
       // console.log('Course: this.props', this.props);
        return (
            <div>
                
                <form onSubmit={this.updateSubmit.bind(this)}>
                    <div className="unit-container-blue tenpx-bottom-margin">
                            <div className="column">
                                <input
                                    className="course-item"
                                    refs="courseName"
                                    type="text"
                                    onChange={this.handleChange.bind(this,"newCourseName")}
                                    defaultValue={this.state["oldCourseName"]}
                                    aria-label="courseName"
                                 />
                            </div>
                            <div>
                                <button 
                                    className="green-btn btn-small button-row" 
                                    type="submit" 
                                    value="Update"
                                >
                                    Update Course Name
                                </button>
                                
                            </div>
                    </div>
                </form>
                <button className="green-btn btn-small button-row" onClick={(e) => this.prepDelete(e)}>
                                    Delete
                                </button>
                
            </div>
            
                
            
            );
    }
    
}