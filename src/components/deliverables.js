import React from 'react';
import './css/deliverables.css';

import NavBar from "./navbar";
import RightSideDrawer from './right-side-drawer';
import Backdrop from './backdrop';
import BackdropWhite from './backdrop-white';

import AddDeliverableForm from './add-deliverable-form';
import DeliverableFromMenu from './deliverable';




export default class Deliverables extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        courseSelected: "",
                        courseIsChanged:false,
                        fields:{},
                        errors:{},
                        delMessage: '',
                        deliverableIsChanged:false,
                        addMessage:"Deliverable has been added.",
                        updateMessage: "Deliverable has been updated.",
                        deleteMessage: "Deliverable has been deleted."

                }
                this.setSelectedCourse = this.setSelectedCourse.bind(this);
        }

        componentDidMount() {
                this.props.setcourseanddeliverableflags();
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

        

        setSelectedCourse(e) {
                e.preventDefault();
                this.props.setdeliverableadded(false);
                this.setState({
                    courseSelected: e.target.value,
                    courseIsChanged:true
                }, () => {
                        this.props.setcurrentcoursename(this.state.courseSelected);
                });
        
            }

        
        render() {
                let backdrop;

                if(this.props.sideDrawerOpen) {
                    backdrop = <Backdrop rightbackdropclickhandler={this.props.rightbackdropclickhandler} />
                } else {
                        backdrop = <BackdropWhite />
                }

                const thiscoursedeliverables = this.props.thiscoursedeliverables.map((deliverable, index) => {
                        return (
                                <ul key={index} className="tenpx-bottom-margin ">
                                        <DeliverableFromMenu
                                                {...deliverable}
                                                {...this.props}
                                                {...this.state}
                                                setdeliverableischanged={this.setdeliverableischanged}
                                                submitupdatedeliverable={this.props.submitupdatedeliverable}
                                                deletedeliverable={this.props.deletedeliverable}
                                        />   
                                </ul>
                        );
                });

                

                const thistermdeliverables = this.props.thistermdeliverables.map((deliverable, index) => {
                        return (
                                <ul key={index} className="tenpx-bottom-margin ">
                                        <DeliverableFromMenu
                                                {...deliverable}
                                                {...this.props}
                                                {...this.state}
                                                setdeliverableischanged={this.setdeliverableischanged}
                                                submitupdatedel={this.props.submitupdatedel}
                                                deletedel={this.props.deletedeliverable}
                                        />   
                                </ul>
                        );
                })

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
                console.log('deliverables: this.props', this.props);
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
                                                                        setdeliverableischanged={this.props.setdeliverableischanged}
                                                                />
                                                        ) : (
                                                                <div></div>
                                                        )
                                                }
                                                {(this.state.courseIsChanged === true) ?  (
                                                        <div>
                                                                {thiscoursedeliverables}
                                                        </div>
                                                ) : (
                                                        <div>
                                                                {thistermdeliverables}
                                                        </div>
                                                )
                                                }
                                                       
                                        </div>
                        </div>
                        
                );


        }       
               
        
}
