import React from 'react';
import './css/week.css';

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
        this.props.submitUpdateWeek(updateWeek); 
    }

    render() {
        console.log('week: this.props', this.props);
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
        console.log('week: weekstatus');
        if(this.props.weekstatus === 'all') {
            deleteButton = <button className="btn delete-btn" onClick={(e) => this.setDelete(e)}>Delete Week</button>;
        };
          
        return ( 
            <div className="row with-delete-btn flex-wrap-row">
                <div className="row with-weeknum-and-options flex-wrap-row">
                    <div className="row-week-header">
                        <div className="weekNum column">{this.props.weekNum}/{this.props.termDesc}</div>
                    </div>
                    <div className="list-vertical-week-options">
                        <form onSubmit={this.handleUpdate}>
                            <div className="row">
                                        <div className="week-option column">
                                                <div className="item-label item">Liked Least</div>
                                                <div className="item">{this.state.likedLeast}
                                                <select
                                                        className="item"
                                                        type="text"
                                                        defaultValue= {this.state.likedLeast}
                                                        onChange={e => this.handleChange(e, "likedLeast")}>
                                                            {mycoursedropdown}
                                                    </select>
                                                </div>
                                        </div>
                                        
                                        <div className="week-option column">
                                                <div className="item-label item">Liked Most</div>
                                                <div className="item">{this.state.likedMost}
                                                    <select
                                                            type="text"
                                                            defaultValue= {this.state.likedMost}
                                                            onChange={e => this.handleChange(e, "likedMost")}
                                                            className="item">
                                                                {mycoursedropdown}
                                                    </select>
                                                </div>
                                        </div>
                                       
                                        <div className="week-option column">
                                                <div className="item-label item">Most Difficult</div>
                                                <div className="item">{this.state.mostDifficult}
                                                    <select
                                                            type="text"
                                                            defaultValue= {this.state.mostDifficult}
                                                            onChange={e => this.handleChange(e, "mostDifficult")}
                                                            className="item">
                                                                {mycoursedropdown}
                                                    </select>
                                                </div>
                                        </div>
                                    
                                        <div className="week-option column">
                                                <div className="item-label item">Least Difficult</div>
                                                <div className="item">{this.state.leastDifficult}
                                                    <select
                                                            type="text"
                                                            defaultValue= {this.state.leastDifficult}
                                                            onChange={e => this.handleChange(e, "leastDifficult")}
                                                            className="item">
                                                                {mycoursedropdown}
                                                    </select>
                                                </div>
                                        </div>
                            </div>
                            <div className="item column">
                                    <input className="btn update-btn center-btn" type="submit" value="Submit" />
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


