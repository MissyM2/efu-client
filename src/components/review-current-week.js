import React from 'react';
import NavBar from "./navbar"
import './css/course-grades.css';

import Week from './week';
import CourseGrades from './course-grades';

export default class ReviewCurrentWeek extends React.Component {
    

    render() {
        // set up week section
        console.log('review-current-week: after render, this.props', this.props);
        let myweek = this.props.currentweekdetails;
        myweek = myweek.map((week, index) => {
            return (
                <li className="row" key={index}>
                    <Week {...week} {...this.props} weekstatus="one" submitupdateweek={this.props.submitUpdateWeek} submitdeleteweek={this.props.submitDeleteWeek} />
                </li>
            );
        });
        

        return (
            <main>
                <NavBar  {...this.props} />
                <div className="container">
                    <h2>Review Last Week, week number {this.props.currentweek}</h2>
                    <div className="week">
                        <div className="section-label">How did you feel about your week?</div>
                            <ul className="list-vertical week-list">
                               {myweek}
                            </ul>
                        
                    </div>
                    <div className="grades">
                        <h3>Add Your Grades as of Today</h3>
                        <ul>
                         <CourseGrades {...this.props} />
                        </ul>
                    </div>
                </div>  
            </main>    
        );  

    }
}