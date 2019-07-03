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
        console.log('made it to handlechange');
        this.setState({
            newGradeNum
          });
    } 

    onSubmit(e) {
        console.log('made it to handleupdate');
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
        //this.props.setGradeIsUpdated(true);
    }


    setEditing(editing) {
        this.setState({
            editing
        });
    }

    render() {
        return (
                <li className="week-row">
                    <div className="grade-container-green">
                            <div className="small-titles dark-label week-label course-title" >Course:  {this.props.course}</div>
                            <div className="small-titles light-label item-body course-grade">Current Grade:  {this.props.gradeNum}</div>
                            <form onSubmit={(e) => {this.onSubmit(e)}}>
                                {(this.props.id === this.state.gradeUpdatingId) ? (
                                <div className="message-style">Your grade has been updated.</div>
                                ):(
                                ""
                                )}
                                <div className="dd">
                                    <input
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
                    
                </li>
                    
            );
        };
}