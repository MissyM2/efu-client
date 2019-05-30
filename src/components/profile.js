import React from 'react';
import './css/profile.css';

import NavBar from "./navbar";
import SideDrawer from './side-drawer';
import Backdrop from './backdrop';

import AddForm from './add-form';
import Term from './term';
import Course from './course';



export default class Profile extends React.Component {
 
    render() {
        let backdrop;

        if(this.props.sideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        }

        const allterms = this.props.terms.map((term, index) => {
            return (
                <li key={index} >
                    <Term {...term} {...this.props} />
                </li>
            );
        });
        const mycourses = this.props.currentcourses.map((course, index) => {
            return (
                <li className="section" key={index}>
                    <Course {...course} {...this.props} submitupdatecourse={this.props.submitupdatecourse} submitdeletecourse={this.props.submitdeletecourse} />
                </li>
            );
        });

        return (
            <div className="container">
                <NavBar {...this.props}/>
                <SideDrawer show={this.props.sideDrawerOpen} />
                {backdrop}
                <div className="container">
                        <h3>My Profile for {this.props.currentterm}</h3>
                        <div>
                            <div className="section-label">Available Terms</div>
                            <ul className="profile-row">
                               {allterms} 
                            </ul>
                        </div>
                       <div className="courses">
                            <div className="section-label">Your Courses</div>
                            <ul className="profile-row course-list ">
                                    {mycourses} 
                            </ul>
                            <div>
                                <AddForm type="course" {...this.props} submitaddcourse={this.props.submitaddcourse} />
                            </div>
                            
                        </div>
                        
                </div>
            </div>
        );

    }
}

    