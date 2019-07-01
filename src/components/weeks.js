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
                if(this.props.rightSideDrawerOpen) {
                        backdrop = <Backdrop click={this.props.backdropclickhandler} />
                }
               
                const weeks = this.props.thistermweeks.map((week, index) => {
                        return (
                                <div className="unit-container-blue hundredpercent-width tenpx-bottom-margin" key={index + 100}>
                                        <h3>Week Number {week.weekNum}</h3>
                                        <h5>Attitudes</h5>
                                        
                                        <ul key={index} className="weeks-row">
                                                <li className="week-row">
                                                        <div className="week-item">
                                                                <div className="small-titles dark-label week-label likedLeast">liked Least</div>
                                                                <div className="small-titles light-label item-body">{week.likedLeast}</div>
                                                        </div>
                                                        <div className="week-item">
                                                                <div className="small-titles dark-label week-label likedMost">Liked Most</div>
                                                                <div className="small-titles light-label item-body">{week.likedMost}</div>
                                                        </div>
                                                </li>
                                                <li className="week-row">
                                                        <div className="week-item">
                                                                <div className="small-titles dark-label week-label mostDifficult">Most Difficult</div>
                                                                <div className="small-titles light-label item-body">{week.mostDifficult}</div>
                                                        </div>
                                                        <div className="week-item">
                                                                <div className="small-titles dark-label week-label leastDifficult">Least Difficult</div>
                                                                <div className="small-titles light-label item-body">{week.leastDifficult}</div>
                                                        </div>
                                                </li>
                                        </ul>
                                        <h5>Courses and Grades</h5>
                                        <div className="weeks-row">

                                                {this.props.thistermgrades.filter(grade => grade.week === week.weekNum )
                                                                //grade.course === course.courseName
                                                .map(grade => {
                                                                return (
                                                                        <div className="grade-container-green fivepx-margin" key={index}>
                                                                                <div className="small-titles dark-label week-label course-title">{grade.course}</div>
                                                                                <div className="small-titles light-label item-body course-grade">{grade.gradeNum}</div>
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
                                                {...this.props}
                                                user={this.props.currentusername}
                                                rightdrawertoggleclickhandler={this.props.rightdrawertoggleclickhandler}
                                                rightSideDrawerOpen={this.props.rightSideDrawerOpen}
                                                submitlogout={this.props.submitlogout}
                                        />
                                </div>
                                {backdrop}
                                <div>
                                        {(this.props.thistermweeks.length === 0) ? (
                                                <div className="dashboard-no-data">
                                                        <div className="instructions-large">
                                                        You have not set up your Profile, yet, for {this.props.currentterm}.  Either choose another term from the dropdown or
                                                        select Profile, select your term and add your first class.  This will generate the appropriate number of weeks.
                                                        </div>
                                                </div>
                                        ) : (
                                        <div className="content-sub-container">
                                                <h2>Your Weeks</h2>
                                                <h3>Term:  {this.props.currentterm}</h3>
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
