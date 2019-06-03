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
            termSelected: 'Spring (16 weeks)'
        }
        this.setSelectedTerm = this.setSelectedTerm.bind(this);
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
                            <select className="term-row dropdown-large" onChange={this.setSelectedTerm}>
                               {allterms} 
                            </select>
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

    