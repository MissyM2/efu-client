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
                weekSelected:''
        }
        this.setSelectedWeek = this.setSelectedWeek.bind(this);
        this.setGradeIsUpdated = this.setGradeIsUpdated.bind(this);
        this.likedLeast = React.createRef();
        this.likedMost = React.createRef();
        this.mostDifficult = React.createRef();
        this.leastDifficult = React.createRef();
        this.updateSubmit = this.updateSubmit.bind(this);
    }

    componentDidMount() {
        this.props.setPageFlags("ReviewWeek");
        this.props.setcurrentweek(1);
        console.log('')
        
    }
    setSelectedWeek(e) {
        e.preventDefault();
        this.setState({
            weekSelected: e.target.value
        }, () => {
            this.props.setcurrentweek(this.state.weekSelected);
            //console.log('setSelectedWeek this,props', this.props);
            //console.log('setSelectedWeek this.state', this.state);
        });
    }

    setGradeIsUpdated = (bool) => {
        this.setState({
            gradeIsUpdated: bool
        });
    
    }

    setSelectedTerm(e) {
        e.preventDefault();
        this.setState({
            termSelected: e.target.value
        }, () => {
            this.props.setcurrentterm(this.state.termSelected);
            this.props.setPageFlags("Dashboard");
        });
    }

    handleChange = (e, field) => {
        let updateFieldValue = e.target.value;
        switch(field) {
            case "likedLeast":
                    this.setState({
                        newLikedLeast: updateFieldValue
                    }, () => {
                        console.log('this.state', this.state);
                    });
                break;
            case "likedMost":
                    this.setState({
                        newLikedMost: updateFieldValue
                    }, () => {
                        console.log('this.state', this.state);
                    });
                break;
            case "mostDifficult":
                    this.setState({
                        newMostDifficult: updateFieldValue
                    }, () => {
                        console.log('this.state', this.state);
                    });
                break;
            case "leastDifficult":
                this.setState({
                    newLeastDifficult: updateFieldValue
                }, () => {
                    console.log('this.state', this.state);
                });
            break;
            default:
                console.log('field names did not match any of the options.');
        }
    }

    updateSubmit = (e, field) => {
        e.preventDefault();
        console.log('made it to updateSubmit');

            let likedLeast;
            let likedMost;
            let mostDifficult;
            let leastDifficult;

            if(this.state.newLikedLeast !== "") {
                likedLeast=this.state.newLikedLeast;
            } else {
                likedLeast=this.state.oldLikedLeast;
            }

            if(this.state.newLikedMost !== "") {
                likedMost=this.state.newLikedMost;
            } else {
                likedMost=this.state.oldLikedMost;
            }

            if(this.state.newMostDifficult !== "") {
                mostDifficult=this.state.newMostDifficult;
            } else {
                mostDifficult=this.state.oldMostDifficult;
            }

            if(this.state.newLeastDifficult !== "") {
                leastDifficult=this.state.newLeastDifficult;
            } else {
                leastDifficult=this.state.oldLeastDifficult;
            }
    
            let updateWeek = {
                termDesc: this.props.currentterm,
                weekNum: this.props.currentweek,
                likedLeast: likedLeast,
                likedMost: likedMost,
                mostDifficult: mostDifficult,
                leastDifficult: leastDifficult,
            };

            console.log('rcw: updateWeek', updateWeek);
            /*
            this.setState({
                newLikedLeast:"",
                newLikedMost:"",
                newMostDifficult:"",
                newLeastDifficult:""
            });
            */

            this.props.submitupdateweek(updateWeek); 
            this.props.getcurrenttermdetails();

       // });

    
        
    }

    
    render() {

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

        const mycoursedropdown = this.props.thistermcourses.map((course, index) => {
            return (
                <option key={index} >
                    {course.courseName}
                </option>
            );
        });

        let mygrades = this.props.thisweekgrades;
        mygrades = mygrades.map((grade, index) => {
           return ( 
                    <div id={grade.id} index={index + 1}>
                        <CourseGrades 
                            {...grade} 
                            {...this.state}
                            {...this.props}
                            setGradeIsUpdated={this.setGradeIsUpdated} /> 
                    </div> 
           );
        });
        //console.log('rcw, this.props', this.props);
       // console.log('rcw, this.state', this.state);
        
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
                                    className="select-week-dd"
                                    defaultValue='Week 1'
                                    onChange={this.setSelectedWeek}>
                                        {allweeks}
                                </select>
                            </div>

                            <div className="section-container">

                                <div className="unit-container-blue hundredpercent-width tenpx-bottom-margin">
                                        <h3>How did you feel about your week?</h3>
                                        <h4>Update week {this.props.currentweek} now.</h4>
                                        <div className="list-vertical">
                                                    {(this.props.weekUpdated) ? (
                                                        <div className="message-style">Week {this.props.currentweek} has been updated.</div>
                                                    ):(
                                                        ""
                                                    )}
                                                <form onSubmit={this.updateSubmit}>
                                                    <ul className="weeks-row">
                                                                <li className="week-row">
                                                                        <div className="grade-container-green">
                                                                            <div className="small-titles dark-label week-label likedLeast">Liked Least</div>
                                                                            {(this.props.thisweekdetailsold.likedLeast === '' || this.props.thisweekdetailsold.likedLeast === 'no selection') ? (
                                                                                <div className="small-titles light-label item-body red-background">Please update.</div>
                                                                            ) : (
                                                                                <div className="small-titles light-label item-body">{this.props.thisweekdetailsold.likedLeast}</div>
                                                                            )}
                                                                            
                                                                            <div>
                                                                                <select
                                                                                    className="hundredpercent-width"
                                                                                    ref={element => this.newLikedLeast = element}
                                                                                    type="text"
                                                                                    value={this.props.newLikedLeast}
                                                                                    defaultValue="DEFAULT"
                                                                                    onChange={e => this.updateSubmit(e, "newLikedLeast")}>
                                                                                        <option value="DEFAULT" disabled>Choose a course</option>
                                                                                        {mycoursedropdown}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="grade-container-green">
                                                                            <div className="small-titles dark-label week-label likedMost">Liked Most</div>
                                                                            {(this.props.thisweekdetailsold.likedMost === ''  || this.props.thisweekdetailsold.likedMost === 'no selection') ? (
                                                                                <div className="small-titles light-label item-body red-background">Please update.</div>
                                                                            ) : (
                                                                                <div className="small-titles light-label item-body">{this.props.thisweekdetails.likedMost}</div>
                                                                            )}
                                                                            <div>
                                                                                <select
                                                                                        className="hundredpercent-width"
                                                                                        type="text"
                                                                                        defaultValue="DEFAULT"
                                                                                        onChange={e => this.updateSubmit(e, "newLikedMost")}>
                                                                                            <option value="DEFAULT" disabled>Choose a course</option>
                                                                                            {mycoursedropdown}
                                                                                </select>
                                                                            </div>
                                                                        </div>  
                                                                </li>
                                                                <li className="week-row">
                                                                        <div className="grade-container-green">
                                                                                <div className="small-titles dark-label week-label mostDifficult">Most Difficult</div>
                                                                                {(this.props.thisweekdetailsold.mostDifficult === '' || this.props.thisweekdetailsold.mostDifficult === 'no selection') ? (
                                                                                    <div className="small-titles light-label item-body red-background">Please update.</div>
                                                                                ) : (
                                                                                    <div className="small-titles light-label item-body">{this.props.thisweekdetails.mostDifficult}</div>
                                                                                )}
                                                                                <div>
                                                                                    <select
                                                                                            className="hundredpercent-width"
                                                                                            type="text"
                                                                                            defaultValue="DEFAULT"
                                                                                            onChange={e => this.updateSubmit(e, "newMostDifficult")}>
                                                                                                <option value="DEFAULT" disabled>Choose a course</option>
                                                                                                {mycoursedropdown}
                                                                                    </select>
                                                                                </div>
                                                                        </div>
                                                                        <div className="grade-container-green">
                                                                                <div className="small-titles dark-label week-label leastDifficult">Least Difficult</div>
                                                                                {(this.props.thisweekdetails.leastDifficult === '' || this.props.thisweekdetails.leastDifficult === 'no selection') ? (
                                                                                    <div className="small-titles light-label item-body red-background">Please update.</div>
                                                                                ) : (
                                                                                    <div className="small-titles light-label item-body">{this.props.thisweekdetails.leastDifficult}</div>
                                                                                )}
                                                                                <div>
                                                                                    <select
                                                                                            className="hundredpercent-width"
                                                                                            type="text"
                                                                                            defaultValue= "DEFAULT"
                                                                                            onChange={e => this.updateSubmit(e, "newLeastDifficult")}>
                                                                                                <option value="DEFAULT" disabled>Choose a course</option>
                                                                                                {mycoursedropdown}
                                                                                    </select>
                                                                                </div>
                                                                        </div>
                                                                    </li>
                                                    </ul>
                                                    
                                                    
                                                </form>   
                                        </div>
                                </div>

                                <div className="unit-container-blue">
                                        <h3 >How were your grades this week?</h3>
                                        <h4>Add grades for week {this.props.currentweek} now.</h4>
                                        <div className="list-vertical">
                                            <ul className="weeks-row">
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