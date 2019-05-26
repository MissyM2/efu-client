import React from 'react';

import NavBar from './navbar';

import AddForm from './add-form';
import Term from './term';
import Course from './course';
import Week from './week';



export default class Profile extends React.Component {
 
    render() {
        const myterms = this.props.terms.map((term, index) => {
            return (
                <li key={index} >
                    <Term {...term} getselectedterm={this.props.getselectedterm} />
                </li>
            );
        });
        const mycourses = this.props.currentcourses.map((course, index) => {
            return (
                <li key={index}>
                    <Course {...course} {...this.props} submitupdatecourse={this.props.submitupdatecourse} submitdeletecourse={this.props.submitdeletecourse} />
                </li>
            );
        });

        const myweeks = this.props.currentweeks.map((week, index) => {
            return (
                <li className="list-horizontal" key={index}>
                    <Week {...week} {...this.props} weekstatus="all" submitupdateweek={this.props.submitupdateweek} submitdeleteweek={this.props.submitdeleteweek} />
                </li>
            );
        });

        return (
            <main>
                <NavBar {...this.props}/>
                <div className="container">
                        <h3>My Profile for {this.props.currentterm}</h3>
                        <div className="terms">
                            <div className="section-label">Your Terms</div>
                            <ul className="list-horizontal term-list">
                               {myterms} 
                            </ul>
                            <div>
                                <AddForm type="term" {...this.props} submitaddterm={this.props.submitaddterm}   />
                            </div>
                        </div>
                        <hr />
                       <div className="courses">
                            <div className="section-label">Your Courses</div>
                            <ul className="list-horizontal course-list">
                               {mycourses} 
                               </ul>
                               <div>
                                <AddForm type="course" {...this.props} submitaddcourse={this.props.submitaddcourse} />
                               </div>
                            
                        </div>
                        <hr />
                        <div className="weeks">
                            <div className="section-label">Your Weeks</div>
                                <ul className="list-vertical week-list">
                                {myweeks} 
                                </ul>
                            <div>
                                <AddForm type="week" {...this.props} submitaddweek={this.props.submitaddweek} />
                            </div>
                    </div>
                </div>
            </main>
        );

    }
}

    