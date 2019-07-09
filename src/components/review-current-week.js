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
            fields: {
                newLikedLeast:"",
                newLikedMost:"",
                newMostDifficult:"",
                newLeastDifficult:""
            },
            fieldBeingUpdated:{
                newLikedLeast:false,
                newLikedMost:false,
                newMostDifficult:false,
                newLeastDifficult:false
            },
            errors:{}

        }
        this.initialState={...this.state}
        this.newLikedLeast = React.createRef();
        this.newLikedMost = React.createRef();
        this.newMostDifficult = React.createRef();
        this.newLeastDifficult = React.createRef();
        this.setSelectedWeek = this.setSelectedWeek.bind(this);
        this.updateSubmit = this.updateSubmit.bind(this);
        this.updateWeek = this.updateWeek.bind(this);
    }

    componentDidMount() {
        this.props.setPageFlags("ReviewWeek");
        this.setState = (this.initialState);
    }

    setSelectedWeek(e) {
        e.preventDefault();
        this.setState({
            weekSelected: e.target.value
        }, () => {
            this.props.setcurrentweek(this.state.weekSelected);
        });
    }

    updateWeek = (field, e) => {
        console.log('made it to updateweek', field);
        switch(field) {
            case "newLikedLeast":
                this.setState({
                    fields: Object.assign({}, this.state.fields, {newLikedLeast: e.target.value})
                });
                break;
            case "newLikedMost":
                this.setState({
                    fields: Object.assign({}, this.state.fields, {newLikedMost: e.target.value})
                });
                break;
            case "newMostDifficult":
                this.setState({
                    fields: Object.assign({}, this.state.fields, {newMostDifficult: e.target.value})
                });
                break;
            case "newLeastDifficult":
                this.setState({
                    fields: Object.assign({}, this.state.fields, {newLeastDifficult: e.target.value})
                });
            break;
            default:
                console.log('field names did not match any of the options.');
        }  
    }


    updateSubmit = (e) => {
        e.preventDefault();
            let likedLeast;
            let likedMost;
            let mostDifficult;
            let leastDifficult;

            if(this.state.fields.newLikedLeast === "" || this.state.fields.newLikedLeast === "no selection") {
                this.setState({
                    fieldBeingUpdated: Object.assign({}, this.state.fields, {newLikedLeast: true})
                });
                likedLeast=this.props.weekdetailsold.likedLeast;
            } else {
                likedLeast=this.state.fields.newLikedLeast;
            }

            if(this.state.fields.newLikedMost === "" || this.state.fields.newLikedMost === "no selection") {
                this.setState({
                    fieldBeingUpdated: Object.assign({}, this.state.fields, {newLikedMost: true})
                });
                likedMost=this.props.weekdetailsold.likedMost;
            } else {
                likedMost=this.state.fields.newLikedMost;
            }

            if(this.state.fields.newMostDifficult === "" || this.state.fields.newMostDifficult === "no selection") {
                this.setState({
                    fieldBeingUpdated: Object.assign({}, this.state.fields, {newMostDifficult: true})
                });
                mostDifficult=this.props.weekdetailsold.mostDifficult;
            } else {
                mostDifficult=this.state.fields.newMostDifficult;
            }

            if(this.state.fields.newLeastDifficult === "" || this.state.fields.newLeastDifficult === "no selection") {
                this.setState({
                    fieldBeingUpdated: Object.assign({}, this.state.fields, {newLeastDifficult: true})
                });
                leastDifficult=this.props.weekdetailsold.leastDifficult;
            } else {
                leastDifficult=this.state.fields.newLeastDifficult;
            }
    
            let updateWeek = {
                termDesc: this.props.currentterm,
                weekNum: this.props.currentweek,
                likedLeast: likedLeast,
                likedMost: likedMost,
                mostDifficult: mostDifficult,
                leastDifficult: leastDifficult,
            };
           
            this.setState({
                newLikedLeast:"",
                newLikedMost:"",
                newMostDifficult:"",
                newLeastDifficult:""
            }, () => {
                console.log('rcw: look at state after update preparation', this.state);
            });
            

            this.props.submitupdateweek(updateWeek); 
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

                <li className="rcw-week-row grade-container-green" id={grade.id} index={index + 5}>
                        <CourseGrades 
                            {...grade} 
                            {...this.state}
                            {...this.props}
                            setGradeIsUpdated={this.setGradeIsUpdated} /> 
                </li> 
           );
        });
        //console.log('rcw, this.props', this.props);
        console.log('rcw, before return', this.state);
        
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
                                <h3>Term:  {this.props.currentterm}/ Week: {this.props.currentweek}</h3>
                            </header>
                            <div className="hundredpercent-width">
                                <select 
                                    className="select-week-dd"
                                    defaultValue={this.props.currentweek}
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
                                                
                                                    <ul className="weeks-row">
                                                                <li className="week-row">
                                                                        <div className="weekdetail-container-green">

                                                                            <form action="/" onSubmit={this.updateSubmit.bind(this)} >
                                                                                <div className="small-titles dark-label week-label likedLeast">Liked Least</div>
                                                                                {(this.props.weekdetailsold.likedLeast === '' || 
                                                                                    this.props.weekdetailsold.likedLeast === 'no selection' ||
                                                                                    this.props.weekdetailsold.likedLeast === undefined) ? (
                                                                                    <div className="small-titles light-label item-body red-background">Please update.</div>
                                                                                ) : (
                                                                                    <div className="small-titles light-label item-body">{this.props.weekdetailsold.likedLeast}</div>
                                                                                )}
                                                                                
                                                                                <div>
                                                                                    <select
                                                                                        className="hundredpercent-width"
                                                                                        ref={element => this.newLikedLeast = element}
                                                                                        type="text"
                                                                                        defaultValue="DEFAULT"
                                                                                        onChange={this.updateWeek.bind(this, "newLikedLeast")}>
                                                                                            <option value="DEFAULT" disabled>Select course.</option>
                                                                                            {mycoursedropdown}
                                                                                    </select>
                                                                                </div>
                                                                                <div className="item week-update-unit">
                                                                                {(this.props.weekItemUpdated && this.state.fieldBeingUpdated.newLikedLeast) ? (
                                                                                    <div className="message-style"><i class="fas fa-check"></i></div>
                                                                                ):(
                                                                                    ""
                                                                                )}
                                                                                    <button
                                                                                        className="blue-btn center-btn fivepx-margin"
                                                                                        type="submit"
                                                                                    >
                                                                                        Save
                                                                                    </button>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                        <div className="weekdetail-container-green">
                                                                            <form action="/" onSubmit={this.updateSubmit.bind(this)} >
                                                                                <div className="small-titles dark-label week-label likedMost">Liked Most</div>
                                                                                {(this.props.weekdetailsold.likedMost === ''  || 
                                                                                    this.props.weekdetailsold.likedMost === 'no selection' ||
                                                                                    this.props.weekdetailsold.likedMost === undefined) ? (
                                                                                    <div className="small-titles light-label item-body red-background">Please update.</div>
                                                                                ) : (
                                                                                    <div className="small-titles light-label item-body">{this.props.weekdetailsold.likedMost}</div>
                                                                                )}
                                                                                <div>
                                                                                    <select
                                                                                            ref={element => this.newLikedMost = element}
                                                                                            className="hundredpercent-width"
                                                                                            type="text"
                                                                                            defaultValue="DEFAULT"
                                                                                            onChange={this.updateWeek.bind(this, "newLikedMost")}>
                                                                                                <option value="DEFAULT" disabled>Select course</option>
                                                                                                {mycoursedropdown}
                                                                                    </select>
                                                                                </div>
                                                                                <div className="item week-update-unit">
                                                                                {(this.props.weekItemUpdated && this.state.fieldBeingUpdated.newLikedMost) ? (
                                                                                        <div className="message-style"><i class="fas fa-check"></i></div>
                                                                                    ):(
                                                                                        ""
                                                                                    )}
                                                                                    <button
                                                                                        className="blue-btn center-btn fivepx-margin"
                                                                                        type="submit"
                                                                                        value="Update"
                                                                                    >
                                                                                        Save
                                                                                    </button>
                                                                                </div>
                                                                            </form>
                                                                        </div> 
                                                                </li>
                                                                <li className="week-row">
                                                                        <div className="weekdetail-container-green">
                                                                            <form action="/" onSubmit={this.updateSubmit.bind(this)} >
                                                                                    <div className="small-titles dark-label week-label mostDifficult">Most Difficult</div>
                                                                                    {(this.props.weekdetailsold.mostDifficult === '' || 
                                                                                        this.props.weekdetailsold.mostDifficult === 'no selection' ||
                                                                                        this.props.weekdetailsold.mostDifficult === undefined ) ? (
                                                                                        <div className="small-titles light-label item-body red-background">Please update.</div>
                                                                                    ) : (
                                                                                        <div className="small-titles light-label item-body">{this.props.weekdetailsold.mostDifficult}</div>
                                                                                    )}
                                                                                    <div>
                                                                                        <select
                                                                                                ref={element => this.newMostDifficult = element}
                                                                                                className="hundredpercent-width"
                                                                                                type="text"
                                                                                                defaultValue="DEFAULT"
                                                                                                onChange={this.updateWeek.bind(this, "newMostDifficult")}>
                                                                                                    <option value="DEFAULT" disabled>Select course</option>
                                                                                                    {mycoursedropdown}
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className="item week-update-unit">
                                                                                    {(this.props.weekItemUpdated && this.state.fieldBeingUpdated.newMostDifficult) ? (
                                                                                            <div className="message-style"><i class="fas fa-check"></i></div>
                                                                                        ):(
                                                                                            ""
                                                                                        )}
                                                                                    <button
                                                                                        className="blue-btn center-btn fivepx-margin"
                                                                                        type="submit"
                                                                                        value="Update"
                                                                                    >
                                                                                        Save
                                                                                    </button>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                        <div className="weekdetail-container-green">
                                                                                <form action="/" onSubmit={this.updateSubmit.bind(this)} >
                                                                                        <div className="small-titles dark-label week-label leastDifficult">Least Difficult</div>
                                                                                        {(this.props.weekdetailsold.leastDifficult === '' || 
                                                                                            this.props.weekdetailsold.leastDifficult === 'no selection' ||
                                                                                            this.props.weekdetailsold.leastDifficult === undefined) ? (
                                                                                            <div className="small-titles light-label item-body red-background">Please update.</div>
                                                                                        ) : (
                                                                                            <div className="small-titles light-label item-body">{this.props.weekdetailsold.leastDifficult}</div>
                                                                                        )}
                                                                                        <div>
                                                                                            <select
                                                                                                    ref={element => this.newLeastDifficult = element}
                                                                                                    className="hundredpercent-width"
                                                                                                    type="text"
                                                                                                    defaultValue= "DEFAULT"
                                                                                                    onChange={this.updateWeek.bind(this, "newLeastDifficult")}>
                                                                                                        <option value="DEFAULT" disabled>Select course</option>
                                                                                                        {mycoursedropdown}
                                                                                            </select>
                                                                                        </div>
                                                                                        <div className="item week-update-unit">
                                                                                        {(this.props.weekItemUpdated && this.state.fieldBeingUpdated.newLeastDifficult) ? (
                                                                                                <div className="message-style"><i class="fas fa-check"></i></div>
                                                                                            ):(
                                                                                                ""
                                                                                            )}
                                                                                            <button
                                                                                                className="blue-btn center-btn fivepx-margin"
                                                                                                type="submit"
                                                                                                value="Update"
                                                                                            >
                                                                                                Save
                                                                                            </button>
                                                                                        </div>
                                                                                </form>
                                                                        </div>
                                                                    </li>
                                                    </ul>
                                                      
                                        </div>
                                </div>

                                <div className="unit-container-blue hundredpercent-width tenpx-bottom-margin">
                                        <h3 >How were your grades this week?</h3>
                                        <h4>Add grades for week {this.props.currentweek} now.</h4>
                                        <div className="grade-container">
                                            <ul className="rcw-grades-list">
                                                {mygrades}
                                            </ul>
                                        </div>
                                </div>

                            </div>
                    </div> 
                )}; 
            </div>

            
            );
    }
}