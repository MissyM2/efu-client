import React from 'react';
//import NavBar from "./navbar"


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
                              
                            {/*<NavBar />*/}
                                <div className="container">
                                        <p>Your Weeks for this Term</p>
                                        <ul className="list-horizontal week-list-labels">
                                                <li className="item weeknum">Week Number</li>
                                                <li className="item termDesc">Term</li>
                                                <li className="item likedLeast">Liked Least</li>
                                                <li className="item likedMost">Liked Most</li>
                                                <li className="item mostDifficlit">Most Difficult</li>
                                                <li className="item leastDifficult">Least Difficult</li>
                                        </ul>
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

