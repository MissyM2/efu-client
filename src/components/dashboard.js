import React from 'react';
import './css/dashboard.css';
import { Link } from 'react-router-dom';

import NavBar from "./navbar";
import Deliverable from './deliverable';
import TodayDeliverable from './todaydeliverable';
import SideDrawer from './side-drawer';
import Backdrop from './backdrop';
import BackdropGreen from './backdrop-green';
import BackdropWhite from './backdrop-white';
import Modal from './modal';




//import ReviewCurrentWeek from './review-current-week';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weekSelected: 1,
            termSelected: ''
        }
        this.setSelectedWeek = this.setSelectedWeek.bind(this);
    }

    componentDidMount() {
        this.props.getcurrentterms();
    }

    setSelectedWeek(e) {
        console.log('got to setSelectedWeek');
        e.preventDefault();
        this.setState({
            weekSelected: e.target.value
        }, () => {
            this.props.setcurrentweek(this.state.weekSelected);
        });
    }
   
            
    render() {
        
        let backdrop;
        let dashboardContentClasses;
        let dashboardNoData;
        let navbarClasses;
        let sidedrawerClasses;

        if(this.props.sideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        } else {
            backdrop = <BackdropWhite />
        }

        let weekClasses = 'dropdown unit-container-green';
        
        if(this.props.selectingterm) {
            dashboardContentClasses = 'dashboard-content not-visible';
            dashboardNoData='dashboard-no-data not-visible';
            navbarClasses='not-visible';
            sidedrawerClasses = 'not-visible';
        } else {
            dashboardContentClasses = 'dashboard-content';
            dashboardNoData='dashboard-no-data';
            navbarClasses="";
            sidedrawerClasses="";
        }

        const allweeks = this.props.currentweeks.map((week, index) => {
            return (
                <option
                    key={index}
                    value={week.weekNum}
                    className={weekClasses}
                    data-identifier={week.weekNum}
                    onChange={this.setSelectedWeek}
                >
                    Week {week.weekNum}
                </option>                    
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
                <div className="dashboard-container">
                    {this.props.selectingterm && <Modal {...this.props} title="Please select Term" >
                        <p>Modal Content</p>
                    </Modal>}
                    <div className={navbarClasses}>
                        <NavBar  {...this.props} />
                    </div>
                    <div className={sidedrawerClasses}>
                        <SideDrawer show={this.props.sideDrawerOpen} />
                    </div>
                    {backdrop}
                     <div className={dashboardContentClasses}>
                        {(this.props.currentweeks.length === 0) ? (
                                <div className={dashboardNoData}>
                                        <div className="instructions-large">
                                            You have not set up your Profile, yet, for {this.props.currentterm}.  Either choose another term from the dropdown or
                                            select Profile, select your term and add your first class.  This will generate the appropriate number of weeks.
                                        </div>
                                </div>
                                
                            ) : (
                                <React.Fragment>
                                        <h2>My Dashboard, Week {this.state.weekSelected}</h2>
                                        <ul className="skills-suggestion"> 
                                                <li >
                                                    <div>{this.props.currentsuggestion.category}</div>
                                                    <div>{this.props.currentsuggestion.desc}</div>
                                                    <div>~ {this.props.currentsuggestion.credit}</div>
                                                </li>
                                        </ul> 
                                        <div className="instructions-small">
                                            Select from the dropdown to select a different week.
                                        </div>
                                        <div>
                                            <select className="dropdown unit-container-green week" value={this.props.currentweek} onChange={this.setSelectedWeek}>
                                                <option value="-1" selected="true">Choose a week</option>
                                                {allweeks}
                                            </select>
                                            
                                        </div>

                                        

                                        <div className="action-links">
                                                <Link 
                                                    className="blue-btn btn-large" 
                                                    to={{
                                                        pathname: '/review-current-week',
                                                        state: {
                                                            weekstatus: 'one'
                                                    }}}
                                                    onClick={this.props.navbuttonstoggleclickhandler}
                                                    >
                                                    Review This Week
                                                </Link>
                                                <Link 
                                                    className="blue-btn btn-large" 
                                                    to={{
                                                        pathname: '/plan-next-week'
                                                    }}
                                                    >
                                                    Plan Next Week
                                                </Link>
                                        </div>

                                        
                                        <div className="deliverables-container">
                                            <div className="section-head color-dark-blue">Deliverables Due Today, {this.props.currentdate}</div>
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
                                            <div className="section-head color-dark-blue">Deliverables Due This Week, Week {this.props.currentweek}</div>
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
