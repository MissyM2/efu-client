import React from 'react';

import { Link } from 'react-router-dom';

import NavBar from "./navbar";
import SideDrawer from './side-drawer';
import Backdrop from './backdrop';

import './css/review-current-week.css';
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
        }

        let myweek = this.props.currentweekdetails;
        myweek = myweek.map((week, index) => {
            return (
                <li className="review-section row" key={index}>
                    <Week {...week} {...this.props} weekstatus="one" />
                </li>
            );
        });
        
        console.log('reviewcurrweek: this.props', this.props);
        return (
            <div className="container">
                <NavBar  {...this.props} />
                <SideDrawer show={this.props.sideDrawerOpen} />
                {backdrop}
                <div className="container">
                    <h2>Review Last Week, week number {this.props.currentweek}</h2>
                    <div className="attitudes">
                        <div className="section-head color-light">How did you feel about your week?</div>
                            <ul className="list-vertical week-list">
                               {myweek}
                            </ul>
                        
                    </div>
                    <div className="grades">
                        <div className="section-head color-light">Add Your Grades as of Today</div>
                        <ul className="profile-row coursegrades-list">
                            <CourseGrades {...this.props} />
                        </ul>
                    </div>
                    <div className="help">
                                                <Link 
                                                    className="link navitem item btn btn-med" 
                                                    to={{
                                                        pathname: '/dashboard',
                                                        }}
                                                    onClick={this.props.navbuttonstoggleclickhandler}
                                                    >
                                                    Return to Your Dashboard
                                                </Link>
                                                <Link 
                                                    className="link navitem item btn btn-med" 
                                                    to={{
                                                        pathname: '/plan-next-week'
                                                    }}
                                                    >
                                                    Plan Your Next Week
                                                </Link>
                                        </div>
                </div>  
            </div>    
        );  

    }
}