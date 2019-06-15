import React from 'react';
import './css/weeks.css';

export default class Week extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likedLeast: this.props.likedLeast,
            likedMost: this.props.likedMost,
            mostDifficult: this.props.mostDifficult,
            leastDifficult: this.props.leastDifficult
            
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
      /*  let mycourselist = [];
        if (this.state.weekstatus === "one") {
            mycourselist = this.state.location.props.currentcoursedropdown;
        } else  {
            mycourselist = this.props.currentcoursedropdown;
        }
*/
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
                                                            defaultValue= {this.state.likedLeast}
                                                            onChange={e => this.handleChange(e, "likedLeast")}>
                                                                <option value="-1" selected="true">Choose a course</option>
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
                                                                defaultValue= {this.state.likedMost}
                                                                onChange={e => this.handleChange(e, "likedMost")}
                                                                className="input-look">
                                                                    <option value="-1" selected="true">Choose a course</option>
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
                                                                defaultValue= {this.state.mostDifficult}
                                                                onChange={e => this.handleChange(e, "mostDifficult")}
                                                                className="input-look">
                                                                    <option value="-1" selected="true">Choose a course</option>
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
                                                                defaultValue= {this.state.leastDifficult}
                                                                onChange={e => this.handleChange(e, "leastDifficult")}
                                                                className="input-look">
                                                                    <option value="-1" selected="true">Choose a course</option>
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


