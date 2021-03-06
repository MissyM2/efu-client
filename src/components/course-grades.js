import React from 'react';
import './css/review-current-week.css';

export default class CourseGrades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newGradeNum: 0,
            gradeUpdatingId:""
        }
    }

    setNewGradeNum(newGradeNum) {
        this.setState({
            newGradeNum
          });
    } 

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            gradeUpdatingId:this.props.id
        }, () => {
            //console.log("this.state.courseUpdatingId", this.state.courseUpdatingId);
        });

        const newGradeNum = this.state.newGradeNum;
        let updatedgrade = {
            termDesc: this.props.term,
            weekNum: this.props.week,
            courseName: this.props.course,
            oldgradeNum: this.props.gradeNum,
            newgradeNum:   newGradeNum
        }
        this.setState({
            newGradeNum:0
        });
        this.props.submitupdategrade(updatedgrade);
    }


    setEditing(editing) {
        this.setState({
            editing
        });
    }

    render() {
        return (
                    <div>
                            <div className="small-titles grade-titles dark-label grade-label course-title" >Course:  {this.props.course}</div>
                            <div className="small-titles light-label item-body course-grade">Current Grade:  {this.props.gradeNum}</div>
                            <form onSubmit={(e) => {this.onSubmit(e)}}>
                                {(this.props.id === this.state.gradeUpdatingId) ? (
                                <div className="message-style"><div className="message-style"><i className="fas fa-check"></i></div></div>
                                ):(
                                ""
                                )}
                                <div>
                                    <input
                                        className="grade-input"
                                        type="number" 
                                        value={this.state.newGradeNum}
                                        onChange={e =>this.setNewGradeNum(e.target.value)}
                                    />
                                </div>
                                <div className="item">
                                    <button
                                        className="blue-btn center-btn fivepx-margin"
                                        type="submit"
                                        value="Update"
                                    >
                                        Commit Your Grade
                                    </button>
                                </div>
                            </form>
                    </div>
            );
        };
}