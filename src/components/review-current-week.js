import React from 'react';

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

    componentDidMount() {
        this.props.setPageFlags("ReviewWeek");
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

        this.props.submitupdateweek(updateWeek); 
        this.setWeekIsUpdated(true);
    }

    
    render() {

        const mycoursedropdown = this.props.thistermcourses.map((course, index) => {
            return (
                <option key={index} >
                    {course.courseName}
                </option>
            );
        });

        let backdrop;
        if(this.props.rightSideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        }

        let weekClasses = 'dropdown unit-container-green';

        const allweeks = this.props.thistermweeks.map((week, index) => {
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

        let mygrades = this.props.thisweekgrades;
        mygrades = mygrades.map((grade, index) => {
           return ( 
                    <div>
                        <CourseGrades 
                            {...grade} 
                            {...this.state}
                            {...this.props}
                            setGradeIsUpdated={this.setGradeIsUpdated} /> 
                    </div> 
           );
        });
        
        return (
            <div className="content-container">
                <NavBar {...this.props}/>
                <div className="">
                        <RightSideDrawer
                                {...this.props}
                                user={this.props.currentusername}
                                rightdrawertoggleclickhandler={this.props.rightdrawertoggleclickhandler}
                                rightSideDrawerOpen={this.props.rightSideDrawerOpen}
                                submitlogout={this.props.submitlogout}
                        />
                </div>
                {backdrop}
                {(this.props.thistermweeks.length === 0) ? (
                        <div className="modal">
                        <header className="modal__header"> No Profile</header>
                        <section className="modal__content">
                                <h2>{this.props.currentterm}</h2>
                                <div className="message">
                                <div className="message-subtext">Your <em className="key-emphasis">Profile</em>, has not been set up.</div>
                                <div className="message-subtext"><i className="fas fa-asterisk"></i>  Choose another term</div>
                                <div className="message-subtext"><i className="fas fa-asterisk"></i>  Select <em className="key-emphasis">Profile</em>, then add your first class.</div>
                                </div>
                        
                        </section>
                </div>
                ) : (
                        <div className="content-sub-container">
                            <header className="page-header">
                                <h2>Review Last Week</h2>
                                <h3>Term:  {this.props.currentterm}</h3>
                                <h3>Week {this.props.currentweek}</h3>
                            </header>
                                
                                <div className="instructions-small">
                                    Select from the dropdown to select a different week.
                                </div>
                                <div className="hundredpercent-width">
                                    <select 
                                        class="select-week-dd"
                                        defaultValue='Week 1'
                                        onChange={this.setSelectedWeek}>
                                            {allweeks}
                                    </select>
                                    
                                </div>
                                    <div className="section-container">
                                        <div className="unit-container-blue hundredpercent-width tenpx-bottom-margin">
                                                <h3>How did you feel about your week?</h3>
                                                <h5>Update week {this.props.currentweek} now.</h5>
                                                <div className="list-vertical">
                                                        <form onSubmit={this.handleUpdate}>
                                                            <ul className="weeks-row">
                                                                        <li className="week-row">
                                                                                <div className="week-item grade-container-green fivepx-margin">
                                                                                    <div className="small-titles dark-label week-label likedLeast">Liked Least</div>
                                                                                    <div className="small-titles light-label item-body">{this.props.thisweekLikedLeast}</div>
                                                                                    <div className="hundredpercent-width">
                                                                                        <select
                                                                                            type="text"
                                                                                            defaultValue="DEFAULT"
                                                                                            onChange={e => this.handleChange(e, "likedLeast")}>
                                                                                                <option value="DEFAULT" disabled>Choose a course</option>
                                                                                                {mycoursedropdown}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="week-item grade-container-green fivepx-margin">
                                                                                    <div className="small-titles dark-label week-label likedMost">Liked Most</div>
                                                                                    <div className="small-titles light-label item-body">{this.props.thisweekLikedMost}</div>
                                                                                    <div className="hundredpercent-width">
                                                                                        <select
                                                                                                type="text"
                                                                                                defaultValue="DEFAULT"
                                                                                                onChange={e => this.handleChange(e, "likedMost")}>
                                                                                                    <option value="DEFAULT" disabled>Choose a course</option>
                                                                                                    {mycoursedropdown}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>  
                                                                        </li>
                                                                        <li className="week-row">
                                                                                <div className="week-item grade-container-green fivepx-margin">
                                                                                        <div className="small-titles dark-label week-label mostDifficult">Most Difficult</div>
                                                                                        <div className="small-titles light-label item-body">{this.props.thisweekMostDifficult}</div>
                                                                                        <div className="hundredpercent-width">
                                                                                            <select
                                                                                                    type="text"
                                                                                                    defaultValue="DEFAULT"
                                                                                                    onChange={e => this.handleChange(e, "mostDifficult")}>
                                                                                                        <option value="DEFAULT" disabled>Choose a course</option>
                                                                                                        {mycoursedropdown}
                                                                                            </select>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="week-item grade-container-green fivepx-margin">
                                                                                        <div className="small-titles dark-label week-label leastDifficult">Least Difficult</div>
                                                                                        <div className="small-titles light-label item-body">{this.props.thisweekLeastDifficult}</div>
                                                                                        <div className="hundredpercent-width">
                                                                                            <select
                                                                                                    type="text"
                                                                                                    defaultValue= "DEFAULT"
                                                                                                    onChange={e => this.handleChange(e, "leastDifficult")}>
                                                                                                        <option value="DEFAULT" disabled>Choose a course</option>
                                                                                                        {mycoursedropdown}
                                                                                            </select>
                                                                                        </div>
                                                                                </div>
                                                                            </li>
                                                            </ul>
                                                            {(this.state.weekIsUpdated) ? (
                                                                <div className="message-style">Week {this.props.currentweek} has been updated.</div>
                                                            ):(
                                                                ""
                                                            )}
                                                            <div className="item">
                                                                    <button className="blue-btn center-btn fivepx-margin" type="submit" value="Submit">Save Your Selections</button>
                                                            </div> 
                                                        </form>   
                                                </div>
                                        </div>
                                        <div className="unit-container-blue hundredpercent-width tenpx-bottom-margin">
                                        <h3 >How were your grades this week?</h3>
                                        <h5>Add grades for week {this.props.currentweek} now.</h5>
                                        <div className="list-vertical">
                                            <ul className="weeks-row-grade">
                                                {mygrades}
                                            </ul>
                                        </div>
                                </div>
                                    </div>
                        </div> 
                )}; 
            </div>

            
            )
    }
}