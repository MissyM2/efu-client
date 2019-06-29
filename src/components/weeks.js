import React from 'react';

import NavBar from "./navbar";
import RightSideDrawer from './right-side-drawer';
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
        }
           
        render() {
                let backdrop;
                if(this.props.sideDrawerOpen) {
                        backdrop = <Backdrop click={this.props.backdropclickhandler} />
                }
               
                const weeks = this.props.currentweeks.map((week, index) => {
                        return (
                                <div className="unit-container-blue unit-width tenpx-bottom-margin" key={index}>
                                        <div className="section-head color-dark">Week Number {week.weekNum}</div>
                                        
                                        <ul key={index} className="weeks-row">
                                                <li className="week-row">
                                                        <div className="week-item">
                                                                <div className="weeks-item-label week-label likedLeast">liked Least</div>
                                                                <div className="item-body">{week.likedLeast}</div>
                                                        </div>
                                                        <div className="week-item">
                                                                <div className="weeks-item-label week-label likedMost">Liked Most</div>
                                                                <div className="item-body">{week.likedMost}</div>
                                                        </div>
                                                </li>
                                                <li className="week-row">
                                                        <div className="week-item">
                                                                <div className="weeks-item-label week-label mostDifficult">Most Difficult</div>
                                                                <div className="item-body">{week.mostDifficult}</div>
                                                        </div>
                                                        <div className="week-item">
                                                                <div className="weeks-item-label week-label leastDifficult">Least Difficult</div>
                                                                <div className="item-body">{week.leastDifficult}</div>
                                                        </div>
                                                </li>
                                        </ul>
                                        <div className="section-head color-dark">Courses and Grades</div>
                                        <div className="weeks-row">

                                                {this.props.currenttermgrades.filter(grade => grade.week === week.weekNum )
                                                                //grade.course === course.courseName
                                                .map(grade => {
                                                                return (
                                                                        <div className="grade-container-green fivepx-margin" key={index}>
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
                                <div>
                                        {(this.props.currentweeks.length === 0) ? (
                                                <div className="dashboard-no-data">
                                                        <div className="instructions-large">
                                                        You have not set up your Profile, yet, for {this.props.currentterm}.  Either choose another term from the dropdown or
                                                        select Profile, select your term and add your first class.  This will generate the appropriate number of weeks.
                                                        </div>
                                                </div>
                                        ) : (
                                        <div className="content-sub-container">
                                                <h3>Your Weeks</h3>
                                                <h3>{this.props.currentterm}</h3>
                                                <div className="section-container">
                                                        <div className="list-vertical this-week-weeks">
                                                                {weeks}
                                                        </div> 
                                                </div>
                                        </div>
                                        
                                        )    
                                        }
                                
                                </div>

                          </div>
                                
                                        
                );
        }
}
