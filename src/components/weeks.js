import React from 'react';
import NavBar from "./navbar"

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
               
                let weeks = this.props.currentweeks.map((week, index) => {
                        return (
                                <div className="week-summary">
                                                <div key={index} className="row week">
                                                        <div className="item weeknum">
                                                                <div className="item-label weeknum">Week Number</div>
                                                                {week.weekNum}
                                                        </div>
                                                        <div className="item termDesc">
                                                                <div className="item-label termDesc">Term</div>
                                                                {week.termDesc}
                                                        </div>
                                                        <div className="item likedLeast">
                                                                <div className="item-label likedLeast">liked Least</div>
                                                                {week.likedLeast}
                                                        </div>
                                                        <div className="item likedMost">
                                                                <div className="item-label likedMost">Liked Most</div>
                                                                {week.likedMost}
                                                        </div>
                                                        <div className="item mostDifficult">
                                                                <div className="item-label mostDifficult">Most Difficult</div>
                                                                {week.mostDifficult}
                                                        </div>
                                                        <div className="item leastDifficult">
                                                                <div className="item-label leastDifficult">Least Difficult</div>
                                                                {week.leastDifficult}
                                                        </div>
                                                </div>
                                                <div className="row">
                                                        {this.props.currentcourses.map((course, index) => {
                                                                        return (
                                                                                <div key={index} className="item">
                                                                                        {course.courseName}
                                                                                        {this.props.currentgrades.filter(grade => {
                                                                                                return (
                                                                                                        grade.term === course.termDesc &&
                                                                                                        grade.week === week.weekNum &&
                                                                                                        grade.course === course.courseName
                                                                                                );
                                                                                        }).map(grade => {
                                                                                                return (
                                                                                                        <div key={index}>{grade.gradeNum}</div>
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
