import React from 'react';

import { Link } from 'react-router-dom';

import NavBar from "./navbar";
import RightSideDrawer from './right-side-drawer';
import Backdrop from './backdrop';
import BackdropWhite from './backdrop-white';

import './css/review-current-week.css';

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

        let weekClasses = 'dropdown unit-container-green';

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

        let myweek = this.props.currentweekdetails;
        myweek = myweek.map((week, index) => {
            return (
                <li className="" key={index}>
                    <Week {...week} {...this.props} weekstatus="one" />
                </li>
            );
        });

        let mygrades = this.props.currentgrades;
        mygrades = mygrades.map((grade, index) => {
           return ( 
                <li className="unit-course-grade-blue fivepx-margin course-grade" key={index}>
                    <CourseGrades {...grade} {...this.props} />      
                </li>
           );
        });
        
        console.log('reviewcurrweek: this.props', this.props);
        return (
            <div className="content-container">
                <NavBar  {...this.props} />
                <RightSideDrawer show={this.props.rightSideDrawerOpen} submitlogout={this.props.submitlogout} />
                {backdrop}
                <h2>Review Last Week, Week {this.props.currentweek}</h2>
                <div className="instructions-small">
                    Select from the dropdown to select a different week.
                </div>
                <div>
                    <select 
                        className="dropdown unit-container-green week" 
                        value={this.props.currentweek} 
                        onChange={this.setSelectedWeek}>
                            <option value="-1" selected="true">Choose a week</option>
                            {allweeks}
                    </select>
                    
                </div>
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
                        <ul className="course-grades">
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