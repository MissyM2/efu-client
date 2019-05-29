import React from 'react';
import './css/dashboard.css';
import { Link } from 'react-router-dom';

import NavBar from "./navbar";
import SideDrawer from './side-drawer';
import Backdrop from './backdrop';




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
        let backdrop;

        if(this.props.sideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        }
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
                    <SideDrawer show={this.props.sideDrawerOpen} />
                    {backdrop}
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
                        <div className="review-and-plan">
                                <Link 
                                    className="link navitem item btn" 
                                    to={{
                                        pathname: '/review-current-week',
                                        state: {
                                            weekstatus: 'one'
                                    }}}
                                    >
                                    Review This Week
                                </Link>
                                <Link 
                                    className="link navitem item btn" 
                                    to={{
                                        pathname: '/plan-next-week'
                                    }}
                                    >
                                    Plan Next Week
                                </Link>
                        </div>

                         
                        <div className="deliverables-container">
                            <div className="section-label color-dark-blue">Deliverables Due Today, {this.props.currentdate}</div>
                            <ul className="profile-row deliverable-list">
                                {this.props.todaydeliverables
                                .map((deliverable, index) => {
                                    return (
                                        <li key={index} className="section">
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
                                        </li>
                                    );
                                })}  
                            </ul>
                        </div>
                        <div className="deliverables-container">
                            <div className="section-label color-dark-blue">Deliverables Due This Week, Week {this.props.currentweek}</div>
                            <ul className="row-week-list-labels background-color-green color-light">
                                        <li className="week-list-label">Course Name</li>
                                        <li className="week-list-label">Due Date</li>
                                        <li className="week-list-label">Pressure</li>
                                        <li className="week-list-label">Prep Hours</li>
                                        <li className="week-list-label">Item Name</li>
                                        <li className="week-list-label">Notes</li>
                            </ul>
                                   
                            <div>
                                {this.props.thisweekdeliverables
                                        .map((deliverable, index) => {
                                            return (
                                                <ul key={index} className="row-deliverable ">
                                                        <div className="deliverable-sub-section sec-one">
                                                            <li className="item-label color-dark-blue background-color-gray courseName">{deliverable.courseName}</li>
                                                        </div>
                                                        <div className="deliverable-sub-section sec-two">
                                                            <li className="item-label color-dark-blue background-color-gray dueDate">{deliverable.dueDate}</li>
                                                            <li className="item-label color-dark-blue background-color-gray pressure">{deliverable.pressure}</li>
                                                            <li className="item-label color-dark-blue background-color-gray prephrs">{deliverable.prephrs}</li>
                                                        </div>
                                                        <div className="deliverable-sub-section sec-three">
                                                            <li className="item-label color-dark-blue background-color-gray column-item deliverableName">{deliverable.deliverableName}</li>
                                                        </div>
                                                        <div className="deliverable-sub-section sec-four">
                                                            <li className="item-label color-dark-blue background-color-gray column-item desc">{deliverable.desc}</li> 
                                                        </div>
                                                            
                                                        
                                                        
                                                                                                              
                                                </ul>
                                            );
                                    })}
                            </div>  
                        </div>
                    </div> 
                </div>  
            );
    }
}
