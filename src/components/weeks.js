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
                        mygrades: []
                }
        }

        render() {
                console.log(' currentweeks inside of weeks.js ', this.props);
                let backdrop;

                if(this.props.sideDrawerOpen) {
                        backdrop = <Backdrop click={this.props.backdropclickhandler} />
                }
               
                let weeks = this.props.currentweeks.map((week, index) => {
                        return (
                                <div className="weeks">
                                                <div key={index} className="row">
                                                        <div className="row-section">
                                                                <div className="section likedLeast ">
                                                                        <div className="weeks-item-label week-label likedLeast">liked Least</div>
                                                                        <div className="item-body">{week.likedLeast}</div>
                                                                </div>
                                                                <div className="section likedMost">
                                                                        <div className="weeks-item-label week-label likedMost">Liked Most</div>
                                                                        <div className="item-body">{week.likedMost}</div>
                                                                </div>
                                                        </div>
                                                        <div className="row-section">
                                                                <div className="section mostDifficult">
                                                                        <div className="weeks-item-label week-label mostDifficult">Most Difficult</div>
                                                                        <div className="item-body">{week.mostDifficult}</div>
                                                                </div>
                                                                <div className="section leastDifficult">
                                                                        <div className="weeks-item-label week-label leastDifficult">Least Difficult</div>
                                                                        <div className="item-body">{week.leastDifficult}</div>
                                                                </div>
                                                        </div>
                                                        
                                                        
                                                        
                                                </div>
                                                <div className="section-label">Courses and Grades</div>
                                                <div className="row">
                                                        
                                                        {this.props.currentcourses.map((course, index) => {
                                                                        return (
                                                                                <div className="section" key={index}>
                                                                                        <div className="weeks-item-label week-label">{course.courseName}</div>
                                                                                        {this.props.currentgrades.filter(grade => {
                                                                                                return (
                                                                                                        grade.term === course.termDesc &&
                                                                                                        grade.week === week.weekNum &&
                                                                                                        grade.course === course.courseName
                                                                                                );
                                                                                        }).map(grade => {
                                                                                                return (
                                                                                                        <div key={index} className="item-body">{grade.gradeNum}</div>
                                                                                                );
                                                                                        })
                                                                                        }
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
                                        <div className="list-vertical this-week-weeks">
                                               {weeks}
                                        </div> 
                                        
                                </div>
                        </main>
                );
        }
          
}
