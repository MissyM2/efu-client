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
                console.log(' currentweeks inside of weeks.js ', this.props.location.state.currentweeks);
                console.log('currentcourses inside of weeks.js ', this.props.location.state.currentcourses);
                console.log('currentgrades inside of weeks.js ', this.props.location.state.currentgrades);
               
                let weeks = this.props.location.state.currentweeks.map((week, index) => {
                        return (
                                <div className="week-summary">
                                        <div key={index} className="list-horizontal week">
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
                                        <div className="list-horizontal">
                                                {this.props.location.state.currentcourses.map(course=> {
                                                                return (
                                                                        <div className="item">
                                                                                {course.courseName}
                                                                                {this.props.location.state.currentgrades.filter(grade => {
                                                                                        return (
                                                                                                grade.term === course.termDesc &&
                                                                                                grade.week === week.weekNum &&
                                                                                                grade.course === course.courseName
                                                                                        );
                                                                                }).map(grade => {
                                                                                        return (
                                                                                                <div>{grade.gradeNum}</div>
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
                              
                            <NavBar />
                                <div className="container">
                                        <h3>Your Weeks for this Term</h3>
                                        <div className="list-vertical this-week-weeks">
                                               {weeks}
                                                </div> 
                                        
                                </div>
                        </main>
                );

        }
       
        
}

{/*
<div>
                                                {this.props.location.state.currentweeks.filter(grade => {
                                                        return grade.course === week.course;
                                                }).map(grade => {
                                                        return (
                                                                <div>{grade.}
                                                        )
                                                })
                                                        map((grade, index) => {




                                                $scope.appIds = $scope.applicationsHere.filter(function(obj) {
                                                        return obj.selected;
                                                }).map(function(obj) { return obj.id; });
                                                })}
                                        </div>>
</div> 
                                        */}