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
            backdrop = <Backdrop 
                            rightbackdropclickhandler={this.props.rightbackdropclickhandler} 
                        />
        } 
        
        if(this.props.selectingterm) {
            dashboardContentClasses = 'dashboard-content not-visible';
            dashboardNoDataClasses='modal not-visible';
            navbarClasses='not-visible';
            backdrop= <BackdropGreen />
        } else if (this.props.thistermweekcount === 0) {
            dashboardContentClasses = 'dashboard-content not-visible';
            dashboardNoDataClasses='modal';
           
        } else {
            dashboardContentClasses = 'dashboard-content';
            navbarClasses="";

        }

        

        const todaydeliverables = this.props.todaydeliverables.map((deliverable, index) => {
            return (
                <ul key={index} className="tenpx-bottom-margin ">
                    <Deliverable
                            {...deliverable}
                            allprephrs={this.props.allprephrs}
                            setdeliverableischanged={this.props.setdeliverableischanged}
                            submitupdatedel={this.props.submitupdatedel}
                            deletedel={this.props.deletedeliverable}
                    />     
                </ul>
                
            );
        });

        const weekdeliverables = this.props.thisweekdeliverables.map((deliverable, index) => {
            return (
                <ul key={index} className="tenpx-bottom-margin ">
                    <Deliverable
                        {...deliverable}
                        {...this.props}
                        {...this.state}
                        setdeliverableischanged={this.props.setdeliverableischanged}
                        submitupdatedel={this.props.submitupdatedel}
                        deletedel={this.props.deletedeliverable} 
                    />                                                       
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
                                <RightSideDrawer
                                    {...this.props}
                                    allprephrs={this.props.allprephrs}
                                    currentusername={this.props.currentusername} 
                                    rightdrawertoggleclickhandler={this.props.rightdrawertoggleclickhandler}
                                    rightSideDrawerOpen={this.props.rightSideDrawerOpen}
                                    submitlogout={this.props.submitlogout} 
                                    />
                                    
                            </div>
                            
                        ) : (
                            <div></div>
                        )}
                        {backdrop}
                        
                                    {(this.props.thistermweeks.length === 0) ? (
                                        <div className={dashboardNoDataClasses}>
                                            <header className="modal__header"> No Data</header>
                                            <section className="modal__content">
                                                <div className="message">
                                                    <p>{this.props.currentterm} has not been set up.</p>
                                                    <p><i className="fas fa-asterisk"></i>  Choose another term, or</p>
                                                    <p><i className="fas fa-asterisk"></i>  Select <span className="accent-word">Profile</span>, and add your first class.</p>
                                                </div>
                                                  
                                            </section>
                                        </div>
                                
                                    ) : (
                                        <div className={dashboardContentClasses}>

                                            <Suggestion {...this.props} />
                                                <h2>What is Due?</h2>
                                                <h3>Term:  {this.props.currentterm}</h3>
                                               
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
