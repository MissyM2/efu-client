import React from 'react';

import { Link } from 'react-router-dom';

import NavBar from "./navbar";
import SideDrawer from './side-drawer';
import Backdrop from './backdrop';
import BackdropWhite from './backdrop-white';

import './css/weeks.css';
//import './css/course-grades.css';

import Week from './week';
import CourseGrades from './course-grades';

export default class ReviewCurrentWeek extends React.Component {
    
    render() {
        // set up week section
        console.log('review-current-week: after render, this.props', this.props);
        let backdrop;

        if(this.props.sideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        } else {
            backdrop = <BackdropWhite />
        }

        let myweek = this.props.currentweekdetails;
        myweek = myweek.map((week, index) => {
            return (
                <li className="review-section row" key={index}>
                    <Week {...week} {...this.props} weekstatus="one" />
                </li>
            );
        });

        let mygrades = this.props.currentgrades;
        mygrades = mygrades.map((grade, index) => {
           return ( 
                <li className="unit-container-blue" key={index}>
                    <CourseGrades {...grade} {...this.props} />      
                </li>
           );
        });
        
        console.log('reviewcurrweek: this.props', this.props);
        return (
            <div className="content-container">
                <NavBar  {...this.props} />
                <SideDrawer show={this.props.sideDrawerOpen} />
                {backdrop}
                
                <h2>Review Last Week, Week {this.props.currentweek}</h2>
                <div className="content-sub-container">
                        <h3>How did you feel about your week?</h3>
                        <h4>Update your week now.</h4>
                        <ul className="list-vertical">
                            {myweek}
                        </ul>
                </div>
                <div className="content-sub-container">
                        <h3 >How were your grades this week?</h3>
                        <h4>Add your grades now.</h4>
                        <ul className="row">
                            {mygrades}
                        </ul>
                </div>
                <div className="content-sub-container action-links">
                        <Link 
                            className="link navitem item blue-btn" 
                            to={{
                                pathname: '/dashboard',
                                }}
                            onClick={this.props.navbuttonstoggleclickhandler}
                            >
                            Return to Your Dashboard
                        </Link>
                        <Link 
                            className="link navitem item blue-btn" 
                            to={{
                                pathname: '/plan-next-week'
                            }}
                            >
                            Plan Your Next Week
                        </Link>
                </div>
            </div>    
        );  

    }
}