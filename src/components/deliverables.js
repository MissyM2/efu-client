import React from 'react';

import { Link } from 'react-router-dom';

import NavBar from "./navbar";
import SideDrawer from './side-drawer';
import Backdrop from './backdrop';
import BackdropWhite from './backdrop-white';

import {API_BASE_URL} from '../config';
import './css/plan-next-week.css';
import './css/deliverables.css';


export default class Deliverables extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        fields:{}
                }
        }

        handleChange(field, e) {
                console.log('this.state', this.state);
                let fields = this.state.fields;
                fields[field]= e.target.value;
                this.setState({fields});
        }

        addDeliverable(e) {
                console.log('got to adddeliverable');
                e.preventDefault();
                let newDeliverable = {
                        termDesc: this.props.currentterm,
                        courseName: this.state.fields["courseName"],
                        dueDate: this.state.fields["dueDate"],
                        deliverableName: this.state.fields["deliverableName"],
                        pressure: this.state.fields["pressure"],
                        desc: this.state.fields["desc"],
                        prephrs: this.state.fields["prephrs"]
                };

                console.log('newDeliverable', newDeliverable);
               
                

                    
        }

         //    {courseDels}
        render() {
                let backdrop;

                if(this.props.sideDrawerOpen) {
                    backdrop = <Backdrop click={this.props.backdropclickhandler} />
                } else {
                        backdrop = <BackdropWhite />
                }

                const mycoursedropdown = this.props.currentcourses.map((course, index) => {
                        return (
                            <option 
                                key={index}
                                value={course.courseName}
                                onChange={this.handleChange.bind(this, "course")}
                                >
                                {course.courseName}
                            </option>
                        );
                    });
                    console.log('plan-next-week, this.props', this.props);
                return (
                        <div className="content-container">
                                <NavBar {...this.props} />
                                <SideDrawer show={this.props.sideDrawerOpen} />
                                {backdrop}
                                <div className="container">
                                        <h2>Add Your Deliverables</h2>
                                        
                                        <div className="content-sub-container">
                                        <form className="del-form" onSubmit={this.props.submitadddeliverable}>
                                                <select
                                                        type="text"
                                                        className="dropdown unit-container-green fivepx-margin course"
                                                        onChange={this.handleChange.bind(this, "course")}
                                                        >
                                                        <option value="-1" selected="true">Choose a course</option>
                                                                {mycoursedropdown}
                                                </select>
                                        
                                                <ul className="unit-container-blue ul-deliverable">
                                                        <li className="del-row">
                                                                <input 
                                                                        className="del-unit-container fivepx-margin duedate"
                                                                        refs="duedate"
                                                                        placeholder="Due Date"
                                                                        type="date"
                                                                        onChange={this.handleChange.bind(this, "dueDate")}
                                                                        value={this.state.fields["duedate"]}
                                                                        aria-label="dueDate"
                                                                />
                                                                <input 
                                                                        className="del-unit-container fivepx-margin delname" 
                                                                        refs="deliverableName"
                                                                        placeholder="Name of Deliverable"
                                                                        type="text"
                                                                        onChange={this.handleChange.bind(this, "deliverableName")}
                                                                        value={this.state.fields["deliverableName"]}
                                                                        aria-label="deliverableName"
                                                                />
                                                                <input 
                                                                        className="del-unit-container fivepx-margin prephrs" 
                                                                        refs="lastName"
                                                                        placeholder="Prep Hours Required"
                                                                        type="number"
                                                                        onChange={this.handleChange.bind(this, "prephrs")}
                                                                        value={this.state.fields["prephrs"]}
                                                                        aria-label="prephrs"
                                                                />
                                                        </li>
                                                        <li className="del-row">
                                                                <input 
                                                                        className="del-unit-container fivepx-margin pressure" 
                                                                        refs="pressure"
                                                                        placeholder="How much will it impact your grade?"
                                                                        type="text"
                                                                        onChange={this.handleChange.bind(this, "pressure")}
                                                                        value={this.state.fields["pressure"]}
                                                                        aria-label="pressure"
                                                                />
                                                                <input 
                                                                        className="del-unit-container fivepx-margin desc"
                                                                        refs="desc"
                                                                        placeholder="Description"
                                                                        type="text"
                                                                        onChange={this.handleChange.bind(this, "desc")}
                                                                        value={this.state.fields["desc"]}
                                                                        aria-label="deliverable-desc"
                                                                />
                                                        </li>
                                                        
                                                </ul>
                                                <button
                                                        type="submit"
                                                        className="blue-btn btn-large fivepx-margin"
                                                >
                                                        Add Deliverable
                                                </button>
                                        </form>   
                                </div>
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
                                                        pathname: '/review-current-week'
                                                }}
                                        >
                                        Back to Review Last Week
                                        </Link>
                                </div>
                        </div>
                        
                );


        }       
               
        
}
