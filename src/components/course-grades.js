import React from 'react';
import './css/course-grades.css';

export default class CourseGrades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseName: "",
            gradeNum: 0,
        }
    }

    handleChange(e, field) {
        this.setState({
            [field]: e.target.value,
            courseName: e.target.id
          });
          console.log('this grade field should be changing', this.state.gradeNum);
    } 

    onSubmit(e) {
        e.preventDefault();
        console.log('review-current-week: onSubmit, this.state', this.state);
        console.log('review-current-week: onSubmit, this.props', this.props);
        let newgrade = {
            termDesc: this.props.currentterm,
            weekNum: this.props.currentweek,
            courseName: this.state.courseName,
            gradeNum:   this.state.gradeNum
        }
        console.log('newgrade', newgrade);
        debugger;
        this.props.submitaddgrade(newgrade);
        //this.state.gradeNum='';
        //this.setEditing(false);   
    }


    setEditing(editing) {
        this.setState({
            editing
        });
    }

    checkForGrade(course) {
        let gradeArr = this.props.currentgrades.filter(grade => {
            console.log('grade, gradeArr is', gradeArr);
            return grade.course === course;
        });
        if (gradeArr.length > 0){
            return true; 
        } 
        return false;
    }
   

    

    render() {
        // set up course-grade section
        
        // set up courses and grades section

        let mycoursesgrades = this.props.currentcourses.map((course, index) => {
                return (
                    <li className="course-unit" key={index}>
                        <div 
                            className="color-light">
                            {course.courseName}
                        </div>
                        <div className="color-light">
                            <input 
                                type="number" 
                                id={course.courseName}
                                defaultValue={this.state.gradeNum}
                                onChange={e =>this.handleChange(e, "gradeNum")}
                                />
                        </div>
                        <div className="grade-item color-light">
                            <button
                                className="btn">
                                Commit Grade
                            </button>
                        </div>
                    </li>
                );
        });

        return (
                        <form className="form-course-grades" onSubmit={(e) => this.onSubmit(e)}>
                            {mycoursesgrades}
                        </form>
            );  

        }
}