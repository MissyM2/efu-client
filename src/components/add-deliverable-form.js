import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import './css/add-deliverable-form.css';

import NavBar from "./navbar";
import RightSideDrawer from './right-side-drawer';
import Backdrop from './backdrop';
import BackdropWhite from './backdrop-white';



export class AddDeliverableForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                editing: false,
                fields: {
                    courseName:"",
                    dueDate:"",
                    deliverableName:"",
                    desc: "",
                },
                errors: {}
            }
            this.setSelectedCourseForAdd = this.setSelectedCourseForAdd.bind(this);
            this.handleValidation = this.handleValidation.bind(this);
        }
    

        _onFocus(e){
            e.currentTarget.type = "date";
        }
    
        _onBlur(e){
            e.currentTarget.type = "text";
            e.currentTarget.placeholder = "Enter a Date";
        }
       
        handleChange(field,e){
            let fields = this.state.fields;
            fields[field] = e.target.value;
            this.setState({fields});
            console.log('handleChange', this.state.fields["dueDate"]);
        }

        handleValidation = () => {
            console.log('made it to handleValidation');
            let fields = this.state.fields;
            let errors={};
            let formIsValid = true;
    
            if(!fields["dueDate"] || !fields["deliverableName"] ) {
                    console.log('one of the fields is false', this.state.fields);
                    formIsValid = false;
                    errors["emptyFields"] = "All the following information is required:  Course Name, Due Date and Deliverable Name.";
            }
            console.log('this.state after handling validation', this.state);
    
            this.setState({
                    errors:errors
            });
    
            return formIsValid;
        }
    
        setSelectedCourseForAdd = (e) => {
                console.log("add-del, this.props", this.props);
            e.preventDefault();
            console.log('setSelectedCourseForAdd');
            this.props.setdeliverableadded(false);
            this.props.setdeliverableupdated(false);
            let fields = this.state.fields;
            let courseName=fields["courseName"];
            courseName = e.target.value;
            this.props.setcurrentcoursename(courseName);;
            this.setState({
                //courseName:e.target.value,
                courseIsChanged:true
            }, () => {
                console.log('this.state after selecting course', this.state);
                console.log('this.props after selecting course', this.props);
                    this.props.setdeliverableadding(true);
                    
            });
                    
    
        }


        addDeliverableSubmit = (e) => {
            e.preventDefault();
            console.log('made it to adddeliverablesubmit, deliverableName)', this.state.fields.deliverableName);
            if(this.handleValidation()) {
                let impactValue = "";
                let prephrsValue = 0;
                switch(this.state.fields.deliverableName) {
                    case "Quiz":
                        console.log('Quiz');
                            impactValue = "moderate";
                            prephrsValue = 6;
                    break;
                    case "Test":
                            console.log('Test');
                                    impactValue = "high";
                                    prephrsValue = 16;
                    break;
                    case "Midterm":
                            console.log('Midterm');
                                    impactValue = "high-plus";
                                    prephrsValue = 20;
                    break;
                    case "Final":
                            console.log('Final');
                                    impactValue = "high-plus";
                                    prephrsValue = 20;
                    break;
                    case "Lab/Essay":
                            console.log('Lab/Essay');
                                    impactValue = "moderate";
                                    prephrsValue = 2;
                    break;
                    case "Term Paper/Group Project Final":
                            console.log('Term Paper/Group Project Final');
                                    impactValue = "high-plus";
                                    prephrsValue = 20;
                    break;
                    case "Term Paper/Group-Project Checkpoint":
                            console.log('Term Paper/Group-Project Checkpoint');
                                    impactValue = "moderate";
                                    prephrsValue = 6;
                    break;
                    case "Homework":
                            console.log('Homework');
                                    impactValue = "low";
                                    prephrsValue = 2;
                    break;
                    case "Participation":
                            console.log('Participation');
                                    impactValue = "low";
                                    prephrsValue = 2;
                                    console.log('prephrsValue', prephrsValue);
                        break;
                    default:
                                    impactValue = "moderate";
                                    prephrsValue = 6;
                }
                const newDeliverable = {
                    termDesc: this.props.currentterm,
                    courseName: this.props.currentcoursename,
                    dueDate: this.state.fields["dueDate"],
                    deliverableName: this.state.fields["deliverableName"],
                    impact: impactValue,
                    desc: this.state.fields["desc"],
                    prephrs: prephrsValue
                }

                console.log('newDeliverable after prep', newDeliverable);
                this.setState({
                    dueDate:"",
                    deliverableName:"",
                    desc: ""
                });
                //this.props.adddeliverable(newDeliverable);
                console.log('add-deliverable complete');
                this.props.getcurrentweekdetails(this.props.adddeliverable(newDeliverable));
                this.props.history.push("/deliverables");
            }
        }
            
        
        render() {
                let backdrop;

                if(this.props.sideDrawerOpen) {
                    backdrop = <Backdrop rightbackdropclickhandler={this.props.rightbackdropclickhandler} />
                } else {
                        backdrop = <BackdropWhite />
                }
                let impactClasses;


                if(this.props.thiscoursedeliverables.length === 0 || this.props.thistermdeliverables.length === 0) {
                        impactClasses = "impact-key not-visible";
                } else {
                        impactClasses = "impact-key";
                }

                const delNames = this.props.deliverableNames.map((delname, index) => {
                    return (
                            <option 
                                key = {index}
                                value={delname}
                            >
                                    {delname}
                            </option>
                    );
                });


                const mycoursedropdown = this.props.thistermcourses.map((course, index) => {
                        return (
                            <option 
                                key={index}
                                value={course.courseName}
                                onChange={this.handleChange}
                                >
                                {course.courseName}
                            </option>
                        );
                    });
                return (
                        <div className="content-container">
                                <div className="">
                                        <NavBar {...this.props} />
                                </div>
                                <div className="">
                                        <RightSideDrawer 
                                                {...this.props}
                                                user={this.props.currentusername} 
                                                rightdrawertoggleclickhandler={this.props.rightdrawertoggleclickhandler} 
                                                rightSideDrawerOpen={this.props.rightSideDrawerOpen} 
                                                submitlogout={this.props.submitlogout} 
                                        />
                                </div>
                                {backdrop}
                                        
                                        <div className="content-sub-container">
                                            <div className="add-deliverable-form">
                                                <select
                                                        type="text"
                                                        className="course-select"
                                                        defaultValue='DEFAULT'
                                                        onChange={this.setSelectedCourseForAdd}
                                                        >
                                                        <option value="DEFAULT" selected disabled>Choose a course</option>
                                                                {mycoursedropdown}
                                                </select>
                                                <form className="del-form" onSubmit={this.addDeliverableSubmit.bind(this)}>
                                                    <div className="message-style">
                                                            {this.state.errors["emptyFields"]}
                                                    </div>
                                                    <ul className="unit-container-blue ul-deliverable">
                                                            <li className="del-row">
                                                                    <input 
                                                                            className="del-unit-container fivepx-margin duedate"
                                                                            placeholder="Due Date"
                                                                            type="text"
                                                                            onFocus={this._onFocus}
                                                                            onBlur={this._onBlur}
                                                                            onChange={this.handleChange.bind(this, "dueDate")}
                                                                            value={this.state.fields["dueDate"]}
                                                                            aria-label="dueDate"
                                                                    />
                                                                    <select 
                                                                            className="del-unit-container fivepx-margin delname" 
                                                                            defaultValue="DEFAULT"
                                                                            type="text"
                                                                            onChange={this.handleChange.bind(this, "deliverableName")}
                                                                            aria-label="deliverableName"
                                                                            required
                                                                            >
                                                                                <option className="default-value" value="DEFAULT" disabled selected hidden>What kind of deliverable is this?  Make a choice.</option> 
                                                                                {delNames}
                                                                    </select>

                                                            </li>
                                                            <li className="del-row">
                                                                    <input 
                                                                            className="del-unit-container fivepx-margin desc"
                                                                            placeholder="Describe what needs to be prepped(i.e. study chapters...)"
                                                                            type="text"
                                                                            onChange={this.handleChange.bind(this, "desc")}
                                                                            aria-label="deliverable-desc"
                                                                    />
                                                            </li>
                                                            
                                                    </ul>
                                                    <div className="action-btns">
                                                        <button type="submit" className="blue-btn btn-small fivepx-margin">Add </button>
                                                        
                                                        <button className="blue-btn btn-small fivepx-margin" type="button">
                                                                <Link to="/deliverables">
                                                                Return     
                                                                </Link>
                                                        </button>    
                                                    </div>
                                                </form> 
                                            </div>
                                         </div>
                        </div>
                );
        }      
}

export default withRouter(AddDeliverableForm);
