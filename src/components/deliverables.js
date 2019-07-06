import React from 'react';
import './css/deliverables.css';

import NavBar from "./navbar";
import RightSideDrawer from './right-side-drawer';
import Backdrop from './backdrop';
import BackdropWhite from './backdrop-white';

import AddDeliverableForm from './add-deliverable-form';
import DeliverableProfile from './deliverable-profile';




export default class Deliverables extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        courseSelected: "",
                        courseIsChanged:false,
                        fields:{},
                        errors:{},
                        //deliverableUpdated:false,
                        addMessage:"Deliverable has been added.",
                        updateMessage: "Deliverable has been updated.",
                        deleteMessage: "Deliverable has been deleted."
                }
                this.setSelectedCourse = this.setSelectedCourse.bind(this);
        }

        componentDidMount() {
                this.props.setcourseanddeliverableflags();
                this.props.setPageFlags("Deliverables");
                
        }

        
/*
        canceldeldelete() {
                //console.log('inside canceldeldelete', this.props);
                this.props.setdeldeletemodal(false);
        }

        deletedeliverable(e) {
                e.preventDefault();
                //console.log('made it to deletedeliverable')
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

      */  

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
                let impactClasses;


                if(this.props.thiscoursedeliverables.length === 0 || this.props.thistermdeliverables.length === 0) {
                        impactClasses = "impact-key not-visible";
                } else {
                        impactClasses = "impact-key";
                }

                const thiscoursedeliverables = this.props.thiscoursedeliverables.map((deliverable, index) => {
                        return (
                                <ul key={index} id={deliverable.id} className="deliverable-width tenpx-bottom-margin ">
                                        <DeliverableProfile
                                                {...deliverable}
                                                {...this.props}
                                                {...this.state}
                                                submitupdatedeliverable={this.props.submitupdatedeliverable}
                                                submitdeletedeliverable={this.props.deletedeliverable}
                                        />   
                                </ul>
                        );
                });

                

                const thistermdeliverables = this.props.thistermdeliverables.map((deliverable, index) => {
                        return (
                                <ul key={index} id={deliverable.id} className="deliverable-width tenpx-bottom-margin ">
                                        <DeliverableProfile
                                                {...deliverable}
                                                {...this.props}
                                                {...this.state}
                                                submitupdatedeliverable={this.props.submitupdatedeliverable}
                                                submitdeletedeliverable={this.props.submitdeletedeliverable}
                                        />   
                                </ul>
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
                                                <header className="page-header">
                                                        <h2>My Deliverables</h2>
                                                        <h3>Term: {this.props.currentterm}</h3>
                                                        <h4>{this.props.deliverableMessage}</h4>
                                                </header>
                                                
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
                                                        <div className="message-style">{this.state.addMessage}</div>
                                                ) : (
                                                        <div></div>
                                                )}
                                                {(this.props.deliverableUpdated) ? (
                                                            <div className="msg-style">{this.state.deleteMessage}</div>
                                                            ):(
                                                        ""
                                                    )}
                                                
                                                {(this.props.currentcoursename) !== "" ? (
                                                                <AddDeliverableForm
                                                                        {...this.props}
                                                                        submitadddeliverable={this.props.submitadddeliverable}
                                                                />
                                                        ) : (
                                                                <div></div>
                                                        )
                                                }
                                                {(this.state.courseIsChanged === true) ?  (
                                                        <div className="deliverable-flex">
                                                                <ul className={impactClasses}> 
                                                                        <li>
                                                                                <div className="key-emphasis">Impact</div> 
                                                                                <div className="key-tagline">How does this affect your grade?</div>

                                                                        </li>
                                                                        <li className="indent-twelvepx">
                                                                                <div className="key-option"><em className="key-emphasis">Low</em> less than 5% of final grade</div>
                                                                                <div className="key-option"><em className="key-emphasis">Moderate</em> about 10% of final grade</div>
                                                                                <div className="key-option"><em className="key-emphasis">High</em> at least 15% of final grade</div>
                                                                                <div className="key-option"><em className="key-emphasis">High Plus</em> at least 35% of final grade</div>

                                                                        </li>
                                                                </ul> 
                                                                {thiscoursedeliverables}
                                                        </div>
                                                ) : (
                                                        <div className="deliverable-flex">
                                                                <ul className={impactClasses}> 
                                                                        <li>
                                                                                <div className="key-emphasis">Impact</div> 
                                                                                <div className="key-tagline">How does this affect your grade?</div>

                                                                        </li>
                                                                        <li className="indent-twelvepx">
                                                                                <div className="key-option"><em className="key-emphasis">Low</em> less than 5% of final grade</div>
                                                                                <div className="key-option"><em className="key-emphasis">Moderate</em> about 10% of final grade</div>
                                                                                <div className="key-option"><em className="key-emphasis">High</em> at least 15% of final grade</div>
                                                                                <div className="key-option"><em className="key-emphasis">High Plus</em> at least 35% of final grade</div>

                                                                        </li>
                                                                </ul>
                                                                {thistermdeliverables}
                                                        </div>
                                                )
                                                }
                                                       
                                        </div>
                        </div>
                        
                );


        }       
               
        
}
