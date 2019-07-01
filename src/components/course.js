import React from 'react';



import './css/courses.css';

export default class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldCourseName: this.props.courseName,
            oldCourseDesc: this.props.courseDesc,
            gradeCount:0,
            deliverableCount:0,
            fields:{
                newCourseName:"",
                newCourseDesc:""
            }
        }
        this.courseName = React.createRef();
        this.courseDesc = React.createRef();
        this.prepDelete = this.prepDelete.bind(this);
    }


    prepDelete() {
         // find out if there are grades for the selected course
         let course = this.courseName.value;
         this.props.setcurrentcoursename(course);
         const tempGrades = this.props.thistermgrades.filter(grade => {
            return grade.course === course && grade.gradeNum > 0;
        });
        const tempDeliverables = this.props.currenttermdeliverables.filter(deliverable => {
            return deliverable.course === course;
        });
        this.setState({
            gradeCount:tempGrades.length,
            deliverableCount:tempDeliverables.length
        });
        this.props.setcoursedeletemodal(true);
    }

    handleChange(field, e) {

        this.props.setCourseIsChanged(false);
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({
            fields
        });
        
    }

    updateSubmit(e) {
        console.log('this.props.courseIsChanged', this.props.courseIsChanged);
        e.preventDefault();
        let course;
        let courseDesc;
        if(this.state.fields["newCourseName"]) {
            course=this.state.fields["newCourseName"];
        } else {
            course=this.state.oldCourseName;
        }

        if(this.state.fields["newCourseDesc"]) {
            courseDesc=this.state.fields["newCourseDesc"];
        } else {
            courseDesc=this.state.oldCourseDesc;
        }

        let updateCourse = {
            termDesc: this.props.termDesc,
            oldCourseName: this.state.oldCourseName,
            newCourseName:course,
            newCourseDesc:courseDesc
        };
        this.props.submitupdatecourse(updateCourse);
        this.props.setCourseIsChanged(true);
        this.setState({
            oldCourseName: course,
            fields:{
                newCourseName: ""
            }
        })
    }

    render () {
        return (
            <div>
                
                <form onSubmit={this.updateSubmit.bind(this)}>
                    <div className="course-container-blue tenpx-bottom-margin">
                        {(this.props.courseIsChanged) ? (
                            <div className="error-msg">Your course has been updated.</div>
                            ):(
                               ""
                            )}

                            <div className="column">
                                <div>
                                    <label className="small-titles light-label">Course</label>
                                    <input
                                        ref={element => this.courseName = element}
                                        type="text"
                                        onChange={this.handleChange.bind(this,"newCourseName")}
                                        defaultValue={this.state["oldCourseName"]}
                                        aria-label="courseName"
                                    />
                                </div>
                            </div>
                            <div className="column">
                                <div>
                                            <label className="small-titles light-label">Details</label>
                                            <textarea 
                                                ref={element => this.courseDesc = element}
                                                placeholder="Course Description"
                                                type="text"
                                                rows="2"
                                                cols="30"
                                                wrap="soft"
                                                size="60"
                                                name="CourseDesc"
                                                onChange={this.handleChange.bind(this,"newCourseDesc")}
                                                defaultValue={this.props.courseDesc}
                                                aria-label="CourseDesc"
                                        />
                                                                        </div>
                            </div>
                            <div className="action-btns">
                                <button 
                                    className="green-btn btn-small fivepx-margin" 
                                    type="submit" 
                                    value="Update"
                                >
                                    Update
                                </button>
                                <button className="green-btn btn-small fivepx-margin" onClick={this.prepDelete}>
                                        Delete
                                </button>
                                
                            </div>
                    </div>
                    
                </form>
            </div>
            
                
            
            );
    }
    
}