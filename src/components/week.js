import React from 'react';
import './css/weeks.css';

export default class Week extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likedLeast: this.props.currentweekdetails[0].likedLeast,
            likedMost: this.props.currentweekdetails[0].likedMost,
            mostDifficult: this.props.currentweekdetails[0].mostDifficult,
            leastDifficult: this.props.currentweekdetails[0].leastDifficult
            
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    setDelete(e) {
        e.preventDefault();
        console.log('week: setDelete');
        let selectedWeek = {
            termDesc: this.props.termDesc,
            weekNum:this.props.weekNum
        };
        this.props.submitdeleteweek(selectedWeek); 
    }

    handleChange(e, field) {
        this.setState({
            [field]: e.target.value
          });
          console.log('this field should be changing', this.state);
    }

    handleUpdate(e) {
        e.preventDefault();
    
        let updateWeek = {
            termDesc: this.props.termDesc,
            weekNum: this.props.weekNum,
            likedLeast: this.state.likedLeast,
            likedMost: this.state.likedMost,
            mostDifficult: this.state.mostDifficult,
            leastDifficult: this.state.leastDifficult,
        };
        this.props.submitupdateweek(updateWeek); 
    }

    render() {
        const mycoursedropdown = this.props.currentcourses.map((course, index) => {
            return (
                <option key={index} >
                    {course.courseName}
                </option>
            );
        });
        let deleteButton;
        if(this.props.weekstatus === 'all') {
            deleteButton = <button className="btn delete-btn" onClick={(e) => this.setDelete(e)}>Delete Week</button>;
        };
          console.log('this.props.currentweekdetails', this.props.currentweekdetails);
          console.log('this.state', this.state);
          console.log('this.props.currentweekdetails.likedLeast', this.props.currentweekdetails[0].likedLeast);
        return ( 
            <div className="column with-delete-btn flex-wrap-row">
                <div>
                    <div>
                        <form onSubmit={this.handleUpdate}>
                            <div className="top-week-container">
                                    <div className="sub-week-container">
                                        <div className="unit-container-green fivepx-margin">
                                                <div className="weeks-item-label week-label likedLeast">Liked Least</div>
                                                <div>
                                                    <div className="item-body">{this.state.likedLeast}</div>
                                                    <div>
                                                        <select
                                                            className="input-look"
                                                            type="text"
                                                            defaultValue= "DEFAULT"
                                                            onChange={e => this.handleChange(e, "likedLeast")}>
                                                                <option value="DEFAULT" disabled>Choose a course</option>
                                                                {mycoursedropdown}
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                        </div>
                                        <div className="unit-container-green fivepx-margin">
                                                <div className="weeks-item-label week-label likedMost">Liked Most</div>
                                                <div>
                                                    <div className="item-body">{this.state.likedMost}</div>
                                                    <div>
                                                        <select
                                                                type="text"
                                                                defaultValue= "DEFAULT"
                                                                onChange={e => this.handleChange(e, "likedMost")}
                                                                className="input-look">
                                                                    <option value="DEFAULT" disabled>Choose a course</option>
                                                                    {mycoursedropdown}
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                        </div>
                                    </div>
                                    <div className="sub-week-container">
                                        <div className="unit-container-green fivepx-margin">
                                                <div className="weeks-item-label week-label mostDifficult">Most Difficult</div>
                                                <div>
                                                    <div className="item-body">{this.state.mostDifficult}</div>
                                                    <div>
                                                        <select
                                                                type="text"
                                                                defaultValue= "DEFAULT"
                                                                onChange={e => this.handleChange(e, "mostDifficult")}
                                                                className="input-look">
                                                                    <option value="DEFAULT" disabled>Choose a course</option>
                                                                    {mycoursedropdown}
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                        </div>
                                    
                                        <div className="unit-container-green fivepx-margin">
                                                <div className="weeks-item-label week-label leastDifficult">Least Difficult</div>
                                                <div>
                                                    <div className="item-body">{this.state.leastDifficult}</div>
                                                    <div>
                                                        <select
                                                                type="text"
                                                                defaultValue= "DEFAULT"
                                                                onChange={e => this.handleChange(e, "leastDifficult")}
                                                                className="input-look">
                                                                    <option value="DEFAULT" disabled>Choose a course</option>
                                                                    {mycoursedropdown}
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="item">
                                    <button className="blue-btn center-btn" type="submit" value="Submit">Save Your Selections</button>
                            </div> 
                        </form>   
                    </div>
                </div>
                <div>
                   {deleteButton}     
                </div>
            </div>
            );
    }
    
}


