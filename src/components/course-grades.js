import React from 'react';
import './css/review-current-week.css';

export default class CourseGrades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newGradeNum: 0
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
        const newGradeNum = this.state.newGradeNum;
        let updatedgrade = {
            termDesc: this.props.term,
            weekNum: this.props.week,
            courseName: this.props.course,
            oldgradeNum: this.props.gradeNum,
            newgradeNum:   newGradeNum
        }
        this.props.submitupdategrade(updatedgrade);
        this.props.setGradeIsUpdated(true);
    }


    setEditing(editing) {
        this.setState({
            editing
        });
    }

    render() {
        console.log('this.props.gradeIsUpdated', this.props.gradeIsUpdated);
        
        return (
                <div>
                    
                    <div className="grade-label" >
                        Course:  {this.props.course}
                    </div>
                    <div className="grade">
                        Current Grade:  {this.props.gradeNum}
                    </div>
                    <form onSubmit={(e) => {this.onSubmit(e)}}>
                    {(this.props.gradeIsUpdated) ? (
                            <div className="error-msg">Grade updated.</div>
                            ):(
                               ""
                            )}
                            <div>
                                <input
                                    className="input-look"
                                    type="number" 
                                    value={this.state.newGradeNum}
                                    onChange={e =>this.setNewGradeNum(e.target.value)}
                                />
                            </div>
                            <div className="grade-item">
                                <button
                                    className="green-btn btn-full-width update-btn center-btn"
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