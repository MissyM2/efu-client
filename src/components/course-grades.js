import React from 'react';
import './css/course-grades.css';

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
          console.log('this.state.newgradenum should be changing', this.state.newGradeNum);
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
        console.log('updatedgrade', updatedgrade);
        this.props.submitupdategrade(updatedgrade);
        //this.state.gradeNum='';
        //this.setEditing(false);   
    }


    setEditing(editing) {
        this.setState({
            editing
        });
    }

    render() {
        console.log('this.props', this.props);
            return (
                <div>
                    <div className="item-label" >
                        {this.props.course}
                    </div>
                    <div className="item">
                        {this.props.gradeNum}
                    </div>
                    <form onSubmit={(e) => {this.onSubmit(e)}}>
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