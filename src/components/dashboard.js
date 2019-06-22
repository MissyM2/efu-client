import React from 'react';
import './css/dashboard.css';

import NavBar from "./navbar";
import Deliverable from './deliverable';
import RightSideDrawer from './right-side-drawer';
import Backdrop from './backdrop';
import BackdropGreen from './backdrop-green';
import Suggestion from './suggestion';
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
        console.log('after componentDidMount, dashboard', this.props);
    }

    setSelectedWeek(e) {
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
        let dashboardNoDataClasses;
        let navbarClasses;
        let sidedrawerClasses;

        if(this.props.rightSideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        } 

        let weekClasses = 'dropdown unit-container-green';
        
        if(this.props.selectingterm) {
            dashboardContentClasses = 'dashboard-content not-visible';
            dashboardNoDataClasses='modal not-visible';
            navbarClasses='not-visible';
            backdrop= <BackdropGreen />
        } else if (this.props.currentweekcount === 0) {
            dashboardContentClasses = 'dashboard-content not-visible';
            dashboardNoDataClasses='modal';
           
        } else {
            dashboardContentClasses = 'dashboard-content';
            navbarClasses="";

        }

        

        const todaydeliverables = this.props.todaydeliverables.map((deliverable, index) => {
            return (
                <ul key={index} className="row-deliverable tenpx-bottom-margin ">
                     <Deliverable deliverable={deliverable} />     
                </ul>
                
            );
        });

        const weekdeliverables = this.props.thisweekdeliverables.map((deliverable, index) => {
            return (
                <ul key={index} className="row-deliverable tenpx-bottom-margin ">
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
        //console.log('dashboard: this.state.props', this.props);

            return (
                <div className="content-container">
                        {(this.props.selectingterm) ? (
                            <div>
                                <Modal {...this.props} title="Please select Term" />
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <div className={navbarClasses}>
                            <NavBar  {...this.props} />
                        </div>
                        {(this.props.rightSideDrawerOpen) ? (
                            <div className={sidedrawerClasses}>
                                <RightSideDrawer user={this.props.currentusername} click={this.props.rightdrawertoggleclickhandler} show={this.props.rightSideDrawerOpen} submitlogout={this.props.submitlogout} />
                            </div>
                        ) : (
                            <div></div>
                        )}
                        {backdrop}
                                    {(this.props.currentweeks.length === 0) ? (
                                        <div className={dashboardNoDataClasses}>
                                            <header className="modal__header"> No Data</header>
                                            <section className="modal__content">
                                                <div className="message">
                                                    <p>{this.props.currentterm} has not been set up.</p>
                                                    <p><i class="fas fa-asterisk"></i>  Choose another term, or</p>
                                                    <p><i class="fas fa-asterisk"></i>  Select <span className="accent-word">Profile</span>, and add your first class.</p>
                                                </div>
                                                  
                                            </section>
                                        </div>
                                
                                    ) : (
                                        <div className={dashboardContentClasses}>

                                            <Suggestion {...this.props} />
                                                <h2>What is Due?</h2>
                                               
                                                <div className="deliverables-container">
                                                        <div className="dels-header">
                                                                <div className="dels-label">Deliverables Due Today</div>
                                                                <div className="dels-subhead">
                                                                    <div className="dels-date">{this.props.fCurrentdate}</div>
                                                                    <div className="dels-date">Total Time Required: {this.props.prephrstoday}</div>
                                                                </div>
                                                        </div>
                                                        <ul className="row-week-list-labels background-color-green color-light">
                                                                    <li className="week-list-label">Course Name</li>
                                                                    <li className="week-list-label">Due Date</li>
                                                                    <li className="week-list-label">Impact</li>
                                                                    <li className="week-list-label">Prep Hours</li>
                                                                    <li className="week-list-label">Item Name</li>
                                                                    <li className="week-list-label">Notes</li>
                                                        </ul>
                                                        <div>
                                                            {todaydeliverables}  
                                                        </div> 
                                                    
                                                </div>
                                                <div className="deliverables-container">
                                                    <div className="dels-header">
                                                            <div className="dels-label">Deliverables Due This Week</div>
                                                            <div className="dels-date">Between {this.props.fLastSunday} and {this.props.fNextSunday}</div>
                                                            <div className="dels-date">Total Time Required: {this.props.prephrsthisweek}</div>
                                                    </div>
                                                    <ul className="row-week-list-labels background-color-green color-light">
                                                                <li className="week-list-label">Course Name</li>
                                                                <li className="week-list-label">Due Date</li>
                                                                <li className="week-list-label">Impact</li>
                                                                <li className="week-list-label">Prep Hours</li>
                                                                <li className="week-list-label">Item Name</li>
                                                                <li className="week-list-label">Notes</li>
                                                    </ul>  
                                                    <div>
                                                        {weekdeliverables}
                                                    </div>  
                                                </div>   
                                        </div>
                                    )} 

                </div>
            );
    }
}
