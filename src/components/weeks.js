import React from 'react';

import NavBar from "./navbar";
import SideDrawer from './side-drawer';
import Backdrop from './backdrop';

import './css/weeks.css';


export default class Weeks extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        myweeks: [],
                        mygrades: [],
                        termSelected:'',
                }
                //this.setSelectedTerm = this.setSelectedTerm.bind(this);
        }
/*
        componentDidMount() {
                this.setState({
                    termSelected:this.props.currentterm
                })
                this.props.getcurrentweeks(this.props.currentterm);
                this.props.getcurrentgrades(this.props.currentterm);
                console.log('weeks: componentDidMount this.props.currentcourses', this.props.currentcourses);
            }
         

        setSelectedTerm(e) {
                e.preventDefault();
                this.setState({
                    termSelected: e.target.value
                }, () => {
                        this.props.setcurrentterm(this.state.termSelected);
                        console.log('this.state.termSelected', this.state.termSelected);
                        console.log('here are the weeks for the termselected', this.props.currentweeks);
                        this.props.getcurrentweeks(this.state.termSelected);
                });
            }
        
           */
           
        render() {
                console.log('weeks, this.state', this.props);
                let backdrop;

                if(this.props.sideDrawerOpen) {
                        backdrop = <Backdrop click={this.props.backdropclickhandler} />
                }
               
                const weeks = this.props.currentweeks.map((week, index) => {
                        return (
                                <div className="weeks" key={index}>
                                        <div className="section-head color-light">Week Number {week.weekNum}</div>
                                        
                                        <ul key={index} className="weeks-row">
                                                <li className="weeks-section">
                                                        <div className="sub-section attitude-effect likedLeast">
                                                                <div className="weeks-item-label week-label likedLeast">liked Least</div>
                                                                <div className="item-body">{week.likedLeast}</div>
                                                        </div>
                                                        <div className="sub-section attitude-effect likedMost">
                                                                <div className="weeks-item-label week-label likedMost">Liked Most</div>
                                                                <div className="item-body">{week.likedMost}</div>
                                                        </div>
                                                </li>
                                                <li className="weeks-section">
                                                        <div className="sub-section attitude-effect mostDifficult">
                                                                <div className="weeks-item-label week-label mostDifficult">Most Difficult</div>
                                                                <div className="item-body">{week.mostDifficult}</div>
                                                        </div>
                                                        <div className="sub-section attitude-effect leastDifficult">
                                                                <div className="weeks-item-label week-label leastDifficult">Least Difficult</div>
                                                                <div className="item-body">{week.leastDifficult}</div>
                                                        </div>
                                                </li>
                                        </ul>
                                        <div className="section-label">Courses and Grades</div>
                                        <div className="grade-row">

                                                {this.props.currentgrades.filter(grade => grade.week === week.weekNum )
                                                                //grade.course === course.courseName
                                                .map(grade => {
                                                                return (
                                                                        <div key={index} className="grade-column">
                                                                                <div className="course-title">{grade.course}</div>
                                                                                <div className="course-grade">{grade.gradeNum}</div>
                                                                        </div>
                                                                );
                                                })
                                        }
                                        </div>
                                        
                                </div>
                        );

                });
                return (
                        <main>
                                <NavBar {...this.props}/>
                                <SideDrawer show={this.props.sideDrawerOpen} />
                                {backdrop}
                                <div className="container">
                                        <h3>Your Weeks for {this.props.currentterm}</h3>
                                        <div>
                                                {(this.props.currentweeks.length === 0) ? (
                                                        <div className="dashboard-no-data">
                                                                <div className="instructions-large">
                                                                You have not set up your Profile, yet, for {this.props.currentterm}.  Either choose another term from the dropdown or
                                                                select Profile, select your term and add your first class.  This will generate the appropriate number of weeks.
                                                                </div>
                                                        </div>
                                                ) : (
                                                <div>
                                                        <div className="list-vertical this-week-weeks">
                                                                {weeks}
                                                        </div> 
                                                </div>
                                                
                                                )    
                                                }
                                        </div>
                                </div>
                                        
                        </main>
                );
        }
}
