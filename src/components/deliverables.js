import React from 'react';

import { Link } from 'react-router-dom';

import NavBar from "./navbar";
import RightSideDrawer from './right-side-drawer';
import Backdrop from './backdrop';
import BackdropWhite from './backdrop-white';
import BackdropBlack from './backdrop-black';
import ModalAddDeliverableComplete from './modal-add-deliverable-complete';

import './css/deliverables.css';


export default class Deliverables extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        fields:{},
                        errors:{}
                }
        }

        handleValidation() {
                console.log('made it to handleValidation');
                let fields = this.state.fields;
                let errors={};
                let formIsValid = true;

                if(!fields["courseName"] || !fields["dueDate"] || !fields["deliverableName"] || !fields["impact"] || !fields["prephrs"]) {
                        console.log('one of the fields is false', this.state.fields);
                        formIsValid = false;
                        errors["emptyFields"] = "All the following information is required:  Course Name, Due Date, Deliverable Name, Grade Impact and Prep Hours Needed.";
                }

                this.setState({
                        errors:errors
                });

                return formIsValid;
               

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
                        impact: this.state.fields["impact"],
                        desc: this.state.fields["desc"],
                        prephrs: this.state.fields["prephrs"]
                };
                

                console.log('newDeliverable', newDeliverable);

                if(this.handleValidation()) {
                        this.setState({
                                fields:{}
                        });
                        console.log('headed to handleValidation');
                        this.props.submitadddeliverable(newDeliverable)
                } else {
                        console.log("add deliverable form is false", this.handleValidation());
                }       
        }

        clearDeliverableForm(e) {
                e.preventDefault();
               
                this.props.modaldeliverablecancelhandler();
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
                    console.log('deliverables, this.props', this.props);
                return (
                        <div className="content-container">
                                <div className="">
                                        <NavBar {...this.props} />
                                </div>
                                <div className="">
                                        <RightSideDrawer user={this.props.currentusername} click={this.props.rightdrawertoggleclickhandler} show={this.props.rightSideDrawerOpen} submitlogout={this.props.submitlogout} />
                                </div>
                                {backdrop}
                                {(this.props.showAddDeliverableCompleteModal === true) ? 
                                        (
                                        <div>
                                                <BackdropBlack />
                                                <ModalAddDeliverableComplete 
                                                        {...this.props} 
                                                        addanother={this.clearDeliverableForm.bind(this)} 
                                                        />
                                        </div>
                                        ) : (
                                        null
                                        )
                                        }
                                        <h2>Add Your Deliverables</h2>
                                        
                                        <div className="content-sub-container">
                                                <form className="del-form" action="/" onSubmit={this.addDeliverable.bind(this)}>
                                                        <select
                                                                type="text"
                                                                className="dropdown unit-container-green fivepx-margin course"
                                                                onChange={this.handleChange.bind(this, "courseName")}
                                                                >
                                                                <option value="-1" selected="true">Choose a course</option>
                                                                        {mycoursedropdown}
                                                        </select>

                                                        <div className="error-msg">
                                                                {this.state.errors["emptyFields"]}
                                                        </div>
                                                
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
                                                                                placeholder="Prep Hours"
                                                                                type="number"
                                                                                onChange={this.handleChange.bind(this, "prephrs")}
                                                                                value={this.state.fields["prephrs"]}
                                                                                aria-label="prephrs"
                                                                        />
                                                                </li>
                                                                <li className="del-row">
                                                                        <select 
                                                                                className="del-unit-container fivepx-margin impact" 
                                                                                refs="impact"
                                                                                placeholder="How much will it impact your grade?"
                                                                                type="text"
                                                                                onChange={this.handleChange.bind(this, "impact")}
                                                                                value={this.state.fields["impact"]}
                                                                                aria-label="impact"
                                                                                >
                                                                                <option value="-1" selected="true">Choose the impact</option>
                                                                                <option 
                                                                                        key = "1"
                                                                                        value='low'
                                                                                        >
                                                                                        Low Impact: less than 5% of final grade
                                                                                </option>
                                                                                <option 
                                                                                        key = "2"
                                                                                        value='moderate'
                                                                                        >
                                                                                        Moderate Impact: about 10% of final grade
                                                                                </option>
                                                                                <option 
                                                                                        key = "3"
                                                                                        value='high'
                                                                                        >
                                                                                        High Impact: 15% or greater of final grade
                                                                                </option>
                                                                        </select>
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
                                                        className="add-deliverable blue-btn btn-med fivepx-margin"
                                                >
                                                        Add Deliverable
                                                </button>
                                        </form>   
                                        </div>
                                <div className="content-sub-container action-links">
                                        <Link 
                                                className="link navitem item blue-btn btn-med" 
                                                to={{
                                                        pathname: '/dashboard',
                                                        }}
                                                onClick={this.props.navbuttonstoggleclickhandler}
                                        >
                                        Return to Your Dashboard
                                        </Link>
                                        
                                </div>
                        </div>
                        
                );


        }       
               
        
}
