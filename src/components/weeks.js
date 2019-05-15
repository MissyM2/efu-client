import React from 'react';
import NavBar from "./navbar"


export default class Weeks extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        myweeks: []
                }
        }

        componentDidMount() {
                const { receivedweeks } = this.props.location.state;
                this.setState({
                        myweeks: this.props.location.state.weeks
                })
        }

        render() {
                console.log(' currentweeks inside of weeks.js ', this.props.location.state.currentweeks);
                console.log('receivedweeks inside of weeks.js ', this.state.myweeks);
                return (
                        <main>
                              
                            <NavBar />
                                <div className="container">
                                        <h3>Your Weeks for this Term</h3>
                                        <div className="list-horizontal week-list-labels">
                                                <div className="item-label weeknum">Week Number</div>
                                                <div className="item-label termDesc">Term</div>
                                                <div className="item-label likedLeast">liked Least</div>
                                                <div className="item-label likedMost">Liked Most</div>
                                                <div className="item-label mostDifficult">Most Difficult</div>
                                                <div className="item-label leastDifficult">Least Difficult</div>
                                        </div>
                                        <div className="list-vertical this-week-weeks">
                                                {this.props.location.state.currentweeks.map((week, index) => (
                                                <div key={index} className="list-horizontal week">
                                                        <div className="item courseName">{week.weekNum}</div>
                                                        <div className="item termDesc">{week.termDesc}</div>
                                                        <div className="item weekNum">{week.likedLeast}</div>
                                                        <div className="item dueDate">{week.likedMost}</div>
                                                        <div className="item pressure">{week.mostDifficult}</div>
                                                        <div className="item prephrs">{week.leastDifficult}</div>
                                                </div>
                                                ))}
                                                </div> 
                                        
                                </div>
                        </main>
                );

        }
       
        
}

