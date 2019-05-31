import React from 'react';
import './css/dashboard.css';
import { Link } from 'react-router-dom';

import NavBar from "./navbar";
import Deliverable from './deliverable';
import TodayDeliverable from './todaydeliverable';
import SideDrawer from './side-drawer';
import Backdrop from './backdrop';
import Modal from './modal';
import AvailableWeek from './available-week';




//import ReviewCurrentWeek from './review-current-week';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selweek: 1
        }
    }

    componentDidMount() {
        this.props.getcurrentterms();
    }

    setSelectedWeek(e) {
        e.preventDefault();
        this.setState({
            selweek: e.currentTarget.getAttribute("data-identifier")
        });
        console.log('dashboard: setSelectedWeek, this.state.selweek', this.state.selweek);
    }
    

            
    render() {
        let backdrop;

        if(this.props.sideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        }

       

        const availableweeks = this.props.currentweeks.map((week, index) => {
            return (
                <li key={index}>
                    <AvailableWeek {...week} {...this.props} />
                </li>                    
            );
        });

        const todaydeliverables = this.props.todaydeliverables.map((deliverable, index) => {
            return (
                <ul key={index} className="row-deliverable ">
                     <TodayDeliverable deliverable={deliverable} />     
                </ul>
                
            );
        });

        const weekdeliverables = this.props.thisweekdeliverables.map((deliverable, index) => {
            return (
                <ul key={index} className="row-deliverable ">
                        <Deliverable deliverable={deliverable} />                                                        
                </ul>
            );
        })

        //const {suggestion, loading} = this.state;
        //if (error) {
        //    return <p>{error.message}</p>
        //}

        //if (loading) {
       //     return <p>Loading ...</p>
        //}
            return (
                <div>
                    {this.props.selectingterm && <Backdrop />}
                    {this.props.selectingterm && <Modal {...this.props} title="Please select Term" >
                        <p>Modal Content</p>
                    </Modal>}
                    <NavBar  {...this.props} />
                    <SideDrawer show={this.props.sideDrawerOpen} />
                    {backdrop}
                     <div className="container">
                        {(this.props.currentweeks.length === 0) ? (
                                <div className="instructions-large">
                                        You have not set up your Profile, yet, for this term.  Open Profile, select your term and add your first class.  This will generate the appropriate number of weeks.
                                </div>
                            ) : (
                                <React.Fragment>
                                        <h2>My Dashboard</h2>
                                        <h3> Your are working with Week {this.props.currentterm} term</h3>
                                        <div className="instructions-small">
                                            You are working with {this.props.currentweek}.  Click another week to view those details.
                                        </div>
                                        <div>
                                            <ul className="row">
                                                {availableweeks}
                                            </ul>
                                            
                                        </div>

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
                                            <ul className="row-week-list-labels background-color-green color-light">
                                                        <li className="week-list-label">Course Name</li>
                                                        <li className="week-list-label">Due Date</li>
                                                        <li className="week-list-label">Pressure</li>
                                                        <li className="week-list-label">Prep Hours</li>
                                                        <li className="week-list-label">Item Name</li>
                                                        <li className="week-list-label">Notes</li>
                                            </ul>
                                            <div>
                                                {todaydeliverables}  
                                            </div> 
                                            
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
                                                {weekdeliverables}
                                            </div>  
                                        </div>   
                                </React.Fragment>
                            )}
                    </div> 
                </div>  
            );
    }
}
