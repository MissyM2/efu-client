import React from 'react';
import './css/deliverables.css';

import NavBar from "./navbar";
import RightSideDrawer from './right-side-drawer';
import Backdrop from './backdrop';
import BackdropWhite from './backdrop-white';
import BackdropBlack from './backdrop-black';
import AddDeliverableForm from './add-deliverable-form';
import ModalAddDeliverableComplete from './modal-add-deliverable-complete';
import Deliverable from './deliverable';




export default class Deliverables extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        courseSelected: "",
                        fields:{},
                        errors:{},
                        delMessage: '',
                        deliverableIsChanged:false,
                        addMessage:"Deliverable has been added."
                }
                this.handleChange = this.handleChange.bind(this);
                this.setSelectedCourse = this.setSelectedCourse.bind(this);
                this.setDeliverableIsChanged = this.setDeliverableIsChanged.bind(this);
        }

        componentDidMount() {
                console.log('deliverables: this is within componentdidmount');
                this.props.setcourseanddeliverableflags();
        }

        setDeliverableIsChanged = (bool) => {
                this.setState({
                    deliverableIsChanged: bool
                });
            
        }

        canceldeldelete() {
                console.log('inside canceldeldelete', this.props);
                this.props.setdeldeletemodal(false);
        }

        deletedeliverable(e) {
                e.preventDefault();
                console.log('made it to deletedeliverable')
                let selectedDel = {
                    termDesc: this.props.currentterm,
                    courseName:this.props.currentcoursename,
                    dueDate: "01/01/2019",
                    deliverableName:'testDeliverable', 
                    impact:'low', 
                    prephrs: 5
                };
                this.props.submitdeletedel(selectedDel); 
                if(this.props.delDeleted) {
                    this.setState({delMessage: `${selectedDel.delName} has been deleted`});
                } else {
                    this.setState({message: 'There was a problem with the deletion.'})
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

        setSelectedCourse(e) {
                e.preventDefault();
                this.props.setdeliverableadded(false);
                this.setState({
                    courseSelected: e.target.value
                }, () => {
                    console.log('deliverables: this.setSelectedCourse, this.state.courseSelected', this.state.courseSelected);
                        this.props.setcurrentcoursename(this.state.courseSelected);
                });
        
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
                

                if(this.handleValidation()) {
                        this.setState({
                                fields:{}
                        });
                        console.log('headed to handleValidation');
                        this.props.submitadddeliverable(newDeliverable);
                                
                } else {
                        console.log("add deliverable form is false", this.handleValidation());
                }       
        }

        
        render() {
                let backdrop;

                if(this.props.sideDrawerOpen) {
                    backdrop = <Backdrop click={this.props.backdropclickhandler} />
                } else {
                        backdrop = <BackdropWhite />
                }

                const thistermdeliverables = this.props.thistermdeliverables.map((deliverable, index) => {
                        console.log('deliverables: mydeliverables, deliverable', deliverable);
                        return (
                                <ul key={index} className="row-deliverable tenpx-bottom-margin ">
                                        <Deliverable
                                                {...deliverable}
                                                setDeliverableIsChanged={this.setDeliverableIsChanged}
                                                submitupdatedel={this.props.submitupdatedel}
                                                deletedel={this.props.deletedeliverable}
                                        />   
                                </ul>
                        );
                })

                const mycoursedropdown = this.props.currentcourses.map((course, index) => {
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
                    console.log('deliverables, this.props', this.props);
                    //console.log('deliverables, this.state', this.state);
                return (
                        <div className="content-container">
                                <div className="">
                                        <NavBar {...this.props} />
                                </div>
                                <div className="">
                                        <RightSideDrawer 
                                                user={this.props.currentusername} 
                                                click={this.props.rightdrawertoggleclickhandler} 
                                                show={this.props.rightSideDrawerOpen} 
                                                submitlogout={this.props.submitlogout} 
                                        />
                                </div>
                                {backdrop}
                                        
                                        <div className="content-sub-container">
                                                <h3>My deliverables for {this.props.currentterm}</h3>
                                                {this.props.thistermdeliverables.length === 0 ? (
                                                                <div>
                                                                        <h4>There are no deliverables currently set up for this term.</h4>
                                                                        <h4>Select a course to add deliverables for that course.</h4>
                                                                </div>
                                                        ) : (
                                                                <div>
                                                                        <h4>Select a course to add deliverables for that course.</h4>
                                                                </div>
                                                        )
                                                }
                                                
                                                <select
                                                        type="text"
                                                        className="dropdown unit-container-green fivepx-margin course"
                                                        defaultValue='DEFAULT'
                                                        onChange={this.setSelectedCourse}
                                                        >
                                                        <option value="DEFAULT" disabled>Choose a course</option>
                                                                {mycoursedropdown}
                                                </select>

                                                {(this.props.deliverableAdded === true) ? (
                                                        <div className="error-msg">{this.state.addMessage}</div>
                                                ) : (
                                                        <div></div>
                                                )}
                                                
                                                {(this.props.currentcoursename) !== "" ? (
                                                                <AddDeliverableForm
                                                                        {...this.props}
                                                                        submitadddeliverable={this.props.submitadddeliverable}
                                                                        setdeliverableischanged={this.setDeliverableIsChanged}
                                                                />
                                                        ) : (
                                                                <div></div>
                                                        )
                                                }
                                                
                                                <div>
                                                        {thistermdeliverables}
                                                </div>  
                                        </div>
                        </div>
                        
                );


        }       
               
        
}
