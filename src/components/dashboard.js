import React from 'react';
import './css/dashboard.css';
import { Link } from 'react-router-dom';

import NavBar from "./navbar";
import Deliverable from './deliverable';
import TodayDeliverable from './todaydeliverable';
import SideDrawer from './side-drawer';
import Backdrop from './backdrop';
import Modal from './modal';




//import ReviewCurrentWeek from './review-current-week';

export default class Dashboard extends React.Component {

    componentDidMount() {
        this.props.getcurrentterms();
    }
      
            
    render() {
        let backdrop;

        if(this.props.sideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        }

        const todaydeliverables = this.props.todaydeliverables.map((deliverable, index) => {
            return (
                <ul key={index} className="row-deliverable ">
                     <TodayDeliverable deliverable={deliverable} />     
                </ul>
                
            );
        })

        const weekdeliverables = this.props.thisweekdeliverables.map((deliverable, index) => {
            return (
                <ul key={index} className="row-deliverable ">
                        <Deliverable deliverable={deliverable} />                                                        
                </ul>
            );
    })
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
                    {this.props.selectingterm && <Backdrop />}
                    {this.props.selectingterm && <Modal {...this.props} title="Please select Term" >
                        <p>Modal Content</p>
                    </Modal>}
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
                    </div> 
                </div>  
            );
    }
}
