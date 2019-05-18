import React from 'react';
import './css/week.css';

export default class Week extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likedLeast: this.props.likedLeast,
            likedMost: this.props.likedMost,
            mostDifficult: this.props.mostDifficult,
            mostDifficult: this.props.leastDifficult
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    setDelete(e) {
        e.preventDefault();
    
        let selectedWeek = {
            termDesc: this.props.termDesc,
            weekNum:this.props.weekNum
        };
        this.props.deleteweek(selectedWeek); 
    }

    handleChange(e, field) {
        this.setState({
            [field]: e.target.value
          });
          console.log('this field should be changing', this.state);
    }

    handleUpdate(e) {
        e.preventDefault();
        console.log('entered setUpdate');
        console.log('updatedcourse', this.props);
        console.log('updatedcourse', this.state);
    
        let updateWeek = {
            termDesc: this.props.termDesc,
            termDesc: this.props.weekNum,
            likedLeast: this.state.likedLeast,
            likedMost: this.state.likedMost,
            mostDifficult: this.state.mostDifficult,
            mostDifficult: this.state.leastDifficult,
        };
        console.log('updateCourse',updateWeek);
        this.props.updateweek(updateWeek); 
    }

    render() {
        console.log('this state currcoursedrop', this.state.currentcoursedropdown);
        console.log('this props currcoursedrop', this.props.currentcoursedropdown)

        const mycoursedropdown = this.props.courses.map((course, index) => {
            return (
                <option key={index} >
                    {course.courseName}
                </option>
            );
        });
        return ( 
            <div className="list-horizontal">
                <div className="list-horizontal-week-header">
                    <div className="weekNum">{this.props.weekNum}/{this.props.termDesc}</div>
                </div>
                <div className="list-vertical-week-options">
                        <div className="list-horizontal">
                                <div className="item-label item">Liked Least</div>
                                <div className="item-label item">Liked Most</div>
                                <div className="item-label item">Most Difficult</div>
                                <div className="item-label item">Least Difficult</div>
                        </div>
                        <form onSubmit={this.handleUpdate}>
                            <div className="list-horizontal">
                                        <div className="item">{this.state.likedLeast}
                                           <select
                                                type="text"
                                                defaultValue= {this.state.likedLeast}
                                                onChange={e => this.handleChange(e, "likedLeast")}
                                                className="item">
                                                    {mycoursedropdown}
                                            </select>
                                        </div>
                                        <div className="item">{this.state.likedMost}
                                            <select
                                                    type="text"
                                                    defaultValue= {this.state.likedMost}
                                                    onChange={e => this.handleChange(e, "likedMost")}
                                                    className="item">
                                                        {mycoursedropdown}
                                            </select>
                                        </div>
                                        <div className="item">{this.state.mostDifficult}
                                            <select
                                                    type="text"
                                                    defaultValue= {this.state.mostDifficult}
                                                    onChange={e => this.handleChange(e, "mostDifficult")}
                                                    className="item">
                                                        {mycoursedropdown}
                                            </select>
                                        </div>
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
                            <div className="item">
                                    <input className="btn update-btn" type="button" value="Submit Update" />
                            </div> 
                        </form>   
                </div>
                <div>
                        <button className="btn delete-btn" onClick={(e) => this.setDelete(e)}>Delete Week</button>
                </div>
            </div>
            );
    }
    
}
