import React from 'react';

import { Link } from 'react-router-dom';

import NavBar from "./navbar";
import RightSideDrawer from './right-side-drawer';
import Backdrop from './backdrop';

import './css/review-current-week.css';

import CourseGrades from './course-grades';

export default class ReviewCurrentWeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                weekSelected:'',
                likedLeast: this.props.thisweekLikedLeast,
                likedMost: this.props.thisweekLikedMost,
                mostDifficult: this.props.thisweekmostDifficult,
                leastDifficult: this.props.thisweekleastDifficult,
                weekIsUpdated: false,
                gradeIsUpdated: false
        }
        this.setSelectedWeek = this.setSelectedWeek.bind(this);
        this.setWeekIsUpdated = this.setWeekIsUpdated.bind(this);
        this.setGradeIsUpdated = this.setGradeIsUpdated.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    setSelectedWeek(e) {
        e.preventDefault();
        this.setState({
            weekIsUpdated: false,
            gradeIsUpdate: false,
            weekSelected: e.target.value
        }, () => {
            this.props.setcurrentweek(this.state.weekSelected);
        });
    }

    setWeekIsUpdated = (bool) => {
        this.setState({
            weekIsUpdated: bool
        });
    
    }

    setGradeIsUpdated = (bool) => {
        this.setState({
            gradeIsUpdated: bool
        });
    
}

    handleChange = (e, field) => {
        this.setState({
            [field]: e.target.value
          });
          console.log('this field should be changing', this.state);
    }

    handleUpdate = (e) => {
        e.preventDefault();
    
        let updateWeek = {
            termDesc: this.props.currentterm,
            weekNum: this.props.currentweek,
            likedLeast: this.state.likedLeast,
            likedMost: this.state.likedMost,
            mostDifficult: this.state.mostDifficult,
            leastDifficult: this.state.leastDifficult,
        };

        console.log('handleupdate inside of review-current-week', updateWeek);
        this.props.submitupdateweek(updateWeek); 
        this.setWeekIsUpdated(true);
    }

    
    render() {

        const mycoursedropdown = this.props.currentcourses.map((course, index) => {
            return (
                <option key={index} >
                    {course.courseName}
                </option>
            );
        });

        let backdrop;
        if(this.props.sideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        }

        let weekClasses = 'dropdown unit-container-green';

        const allweeks = this.props.currentweeks.map((week, index) => {
            return (
                <option
                    key={index}
                    value={week.weekNum}
                    className={weekClasses}
                    data-identifier={week.weekNum}
                    onChange={this.setSelectedWeek}
                >
                    Week {week.weekNum}
                </option>                    
            );
        });

        let mygrades = this.props.currentweekgrades;
        mygrades = mygrades.map((grade, index) => {
           return ( 
                <li className="unit-course-grade-blue fivepx-margin" key={index}>
                    <CourseGrades 
                        {...grade} 
                        {...this.state}
                        {...this.props}
                        setGradeIsUpdated={this.setGradeIsUpdated} />      
                </li>
           );
        });
        
        return (
            <div className="content-container">
                <NavBar {...this.props}/>
                <div className="">
                        <RightSideDrawer
                                user={this.props.currentusername}
                                click={this.props.rightdrawertoggleclickhandler}
                                show={this.props.rightSideDrawerOpen}
                                submitlogout={this.props.submitlogout}
                        />
                </div>
                {backdrop}
                {(this.props.currentweeks.length === 0) ? (
                        <div className="dashboard-no-data">
                                <div className="instructions-large">
                                You have not set up your Profile, yet, for {this.props.currentterm}.  Either choose another term from the dropdown or
                                select Profile, select your term and add your first class.  This will generate the appropriate number of weeks.
                                </div>
                        </div>
                ) : (
                        <div>
                                <h2>Review Last Week, Week {this.props.currentweek}</h2>
                                <div className="instructions-small">
                                    Select from the dropdown to select a different week.
                                </div>
                                <div>
                                    <select 
                                        className="dropdown unit-container-green week" 
                                        defaultValue='DEFAULT'
                                        onChange={this.setSelectedWeek}>
                                            <option value="DEFAULT" disabled>Choose a week</option>
                                            {allweeks}
                                    </select>
                                    
                                </div>
                                <div className="content-sub-container">
                                        <h3>How did you feel about your week?</h3>
                                        <h4>Update your week now.</h4>
                                        {(this.state.weekIsUpdated) ? (
                                                <div className="error-msg">Week {this.props.currentweek} has been updated.</div>
                                        ):(
                                            ""
                                        )}
                                        <ul className="list-vertical">
                                        <form onSubmit={this.handleUpdate}>
                                            <div className="top-week-container">
                                            
                                                    <div className="sub-week-container">
                                                        <div className="unit-container-green fivepx-margin">
                                                                <div className="weeks-item-label week-label likedLeast">Liked Least</div>
                                                                <div>
                                                                    <div className="item-body">{this.props.thisweekLikedLeast}</div>
                                                                    <div>
                                                                        <select
                                                                            className="input-look"
                                                                            type="text"
                                                                            defaultValue="DEFAULT"
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
                                                                    <div className="item-body">{this.props.thisweekLikedMost}</div>
                                                                    <div>
                                                                        <select
                                                                                type="text"
                                                                                defaultValue="DEFAULT"
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
                                                                    <div className="item-body">{this.props.thisweekMostDifficult}</div>
                                                                    <div>
                                                                        <select
                                                                                type="text"
                                                                                defaultValue="DEFAULT"
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
                                                                    <div className="item-body">{this.props.thisweekLeastDifficult}</div>
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
                                        </ul>
                                </div>
                                <div className="content-sub-container">
                                        <h3 >How were your grades this week?</h3>
                                        <h4>Add your grades now.</h4>
                                        <ul className="course-grades">
                                            {mygrades}
                                        </ul>
                                </div>
                        </div> 
                )}; 
            </div>

            
            )
    }
}