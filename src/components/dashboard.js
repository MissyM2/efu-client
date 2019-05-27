import React from 'react';
import './css/dashboard.css';
import { Link } from 'react-router-dom';

import NavBar from "./navbar"




//import ReviewCurrentWeek from './review-current-week';

export default class Dashboard extends React.Component {

    componentDidMount() {
        console.log('dashboard: this.props', this.props);
        this.props.getcurrentsuggestion();
        this.props.getcurrentdeliverables(); 
        this.props.getcurrentterms();
        this.props.getcurrentcourses();
        this.props.getcurrentweeks();
        this.props.getcurrentgrades();
       
       
        
    }
    
        
            
    render() {
        //console.log('this.state.', this.state);

        //const {suggestion, loading} = this.state;
        //if (error) {
        //    return <p>{error.message}</p>
        //}

        //if (loading) {
       //     return <p>Loading ...</p>
        //}
        //console.log('thisweekdeliverables ', this.state.thisweekdeliverables);
            return (
                <div>
                    <NavBar  {...this.props} />
                     <div className="container">
                        <h2>My Dashboard</h2>
                       
                        <h3> Your are working with {this.props.currentterm} term and week number {this.props.currentweek}</h3>

                      <ul className="accent skills-suggestion"> 
                                <li >
                                    <div>{this.props.currentsuggestion.category}</div>
                                    <div>{this.props.currentsuggestion.desc}</div>
                                    <div>~ {this.props.currentsuggestion.credit}</div>
                                </li>
                          </ul> 
                        <div className="today-deliverables">
                            <div className="section-label">Deliverables Due Today, {this.props.currentdate}</div>
                            <div>
                                {this.props.todaydeliverables
                                .map((deliverable, index) => {
                                    return (
                                        <div key={index} className="row deliverable">
                                            <div className="column">
                                                <div className="item">
                                                    <div className="item-label courseName-label">Course Name</div>
                                                    <div className="item courseName">{deliverable.courseName}</div>
                                                </div>
                                                <div className="item">
                                                    <div className="item-label dueDate">Due Date</div>
                                                    <div className="item dueDate">{deliverable.dueDate}</div>
                                                </div>
                                            </div>
                                            <div className="column">
                                                <div className="item">
                                                    <div className="item-label pressure">Pressure</div>
                                                    <div className="item pressure">{deliverable.pressure}</div>
                                                </div>
                                            </div>
                                            <div className="column">
                                                <div className="item">
                                                    <div className="item-label prehrs">Prep Hours</div>
                                                    <div className="item prephrs">{deliverable.prephrs}</div>
                                                </div>
                                            </div>
                                            <div className="column">
                                                <div className="item">
                                                    <div className="item-label deliverableName">Item Name</div>
                                                    <div className="item deliverableName">{deliverable.deliverableName}</div>
                                                </div>
                                            </div>
                                            <div className="column">
                                                <div className="item">
                                                    <div className="item-label desc">Notes</div>
                                                    <div className="item desc">{deliverable.desc}</div> 
                                                </div>
                                            </div>    
                                        </div>
                                    );
                                })}
                            </div>
                                
                        </div>
                        <div className="this-week-deliverables">
                            <div className="section-label">Deliverables Due This Week, Week {this.props.currentweek}</div>
                            <div className="row-week-list-labels">
                                                <div className="item-label weeknum">Week Number</div>
                                                <div className="item-label dueDate">Due Date</div>
                                                <div className="item-label pressure">Pressure</div>
                                                <div className="item-label prehrs">Prep Hours</div>
                                                <div className="item-label deliverableName">Item Name</div>
                                                <div className="item-label desc">Notes</div>
                                        </div>
                                    <div>
                            </div>
                            <div>
                                {this.props.thisweekdeliverables
                                        .map((deliverable, index) => {
                                            return (
                                                <div key={index} className="row-deliverable">
                                                    <div className="row-section">
                                                        <div className="item column-item courseName">{deliverable.courseName}</div>
                                                        <div className="item column-item dueDate">{deliverable.dueDate}</div>
                                                    </div>
                                                    <div className="row-section">
                                                        <div className="item column-item pressure">{deliverable.pressure}</div>
                                                        <div className="item column-item prephrs">{deliverable.prephrs}</div>
                                                    
                                                    </div>
                                                    <div className="row-section">
                                                        <div className="item column-item deliverableName">{deliverable.deliverableName}</div>
                                                        <div className="item column-item desc">{deliverable.desc}</div> 
                                                    
                                                    </div>    
                                                </div>
                                            );
                                    })}

                            </div>  
                        </div>
                    </div> 
                </div> 


                
            );
    }
}
