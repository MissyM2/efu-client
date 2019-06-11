import React from 'react';
import './css/profile.css';

import NavBar from "./navbar";
import SideDrawer from './side-drawer';
import Backdrop from './backdrop';

import AddForm from './add-form';
import Term from './term';
import Course from './course';



export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            termSelected: props.currentterm
        }
        //this.setSelectedTerm = this.setSelectedTerm.bind(this);
    }
/*
    componentDidMount() {
        this.setState({
            termSelected:this.props.currentterm
        })
        this.props.getcurrentterm(this.props.currentterm);
        console.log('profile: componentDidMount this.props.currentcourses', this.props.currentcourses);
    }
 

    setSelectedTerm(e) {
        e.preventDefault();
        this.setState({
            termSelected: e.target.value
        }, () => {
            console.log('changed the dropdown');
            this.props.getcurrentterm(this.state.termSelected);

        });
    }
       */
 
    render() {
        let backdrop;

        if(this.props.sideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        }

        const mycourses = this.props.currentcourses.map((course, index) => {
            return (
                <li className="section" key={index}>
                    <Course {...course} courseName={course.courseName} submitupdatecourse={this.props.submitupdatecourse} submitdeletecourse={this.props.submitdeletecourse} />
                </li>
            );
        });
        console.log('profile: this.props', mycourses);
        return (
            <div className="container">
                <NavBar {...this.props}/>
                <SideDrawer show={this.props.sideDrawerOpen} />
                {backdrop}
                <div>
                        <h3>My Profile for {this.props.currentterm}</h3>
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

    