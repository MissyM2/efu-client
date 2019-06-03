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
    constructor(props) {
        super(props);
        this.state = {
            weekSelected: 1,
            termSelected: 'Spring (16 weeks)'
        }
        this.setSelectedWeek = this.setSelectedWeek.bind(this);
        this.setSelectedTerm = this.setSelectedTerm.bind(this);
    }

    componentDidMount() {
        this.props.getcurrentterms();
    }

    setSelectedWeek(e) {
        console.log('got to setSelectedTerm');
        e.preventDefault();
        this.setState({
            weekSelected: e.target.value
        }, () => {
            console.log('this.state.weekSelected', this.state.weekSelected);
            this.props.getcurrentweek(this.state.weekSelected);
        });
    }

    setSelectedTerm(e) {
        console.log('got to setSelectedTerm');
        e.preventDefault();
        this.setState({
            termSelected: e.target.value
        }, () => {
            console.log('this.state.termSelected', this.state.termSelected);
            this.props.getcurrentterm(this.state.termSelected);
        });
    }
    

            
    render() {
        let backdrop;

        if(this.props.sideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        }

        let weekClasses = 'dropdown-large';
 /*       if (this.props.currentweek == this.props.weekNum) {
            weekClasses='dropdown-item selected';
        }
*/
        let termClasses = 'dropdown-large';
                // whatever term is in currentterm, the class should be selected
                if (this.props.currentterm === this.props.termDesc) {
                    termClasses='dropdown-item selected';
        }

        const allterms = this.props.terms.map((term, index) => {
            return (
                <option 
                    key={index}
                    value={term.termDesc}
                    className={termClasses}
                    data-identifier={term.termDesc}
                >
                    {term.termDesc}
                </option>
            );
        });

        const availableweeks = this.props.currentweeks.map((week, index) => {
            return (
                <option
                    key={index}
                    value={week.weekNum}
                    className={weekClasses}
                    data-identifier={week.weekNum}
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
                    <div className="dashboard-content">
                    {this.props.selectingterm && <Backdrop />}
                    {this.props.selectingterm && <Modal {...this.props} title="Please select Term" >
                        <p>Modal Content</p>
                    </Modal>}
                    <NavBar  {...this.props} />
                    <SideDrawer show={this.props.sideDrawerOpen} />
                    {backdrop}
                     <div>
                        {(this.props.currentweeks.length === 0) ? (
                                <div className="dashboard-no-data">
                                        <div className="instructions-large">
                                            You have not set up your Profile, yet, for {this.props.currentterm}.  Either choose another term from the dropdown or
                                            select Profile, select your term and add your first class.  This will generate the appropriate number of weeks.
                                        </div>
                                        <div>
                                        <div>Available Terms</div>
                                            <select className="term-row dropdown-large" onChange={this.setSelectedTerm}>
                                            {allterms} 
                                            </select>
                                        </div>
                                </div>
                                
                            ) : (
                                <React.Fragment>
                                        <h2>My Dashboard</h2>
                                        <h3> Your are working with Week {this.state.weekSelected}, {this.props.currentterm} Term</h3>
                                        <div className="instructions-small">
                                            Select from the dropdown to view details of another week.
                                        </div>
                                        <div>
                                            <select className="dropdown-large" onChange={this.setSelectedWeek}>
                                                {availableweeks}
                                            </select>
                                            
                                        </div>

                                        <ul className="skills-suggestion"> 
                                                <li >
                                                    <div>{this.props.currentsuggestion.category}</div>
                                                    <div>{this.props.currentsuggestion.desc}</div>
                                                    <div>~ {this.props.currentsuggestion.credit}</div>
                                                </li>
                                        </ul> 

                                        <div className="review-and-plan">
                                                <Link 
                                                    className="link navitem item btn btn-large" 
                                                    to={{
                                                        pathname: '/review-current-week',
                                                        state: {
                                                            weekstatus: 'one'
                                                    }}}
                                                    >
                                                    Review This Week
                                                </Link>
                                                <Link 
                                                    className="link navitem item btn btn-large" 
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
                </div>  
            );
    }
}
