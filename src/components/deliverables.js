import React from 'react';
import { Link } from 'react-router-dom';
import './css/deliverables.css';

import NavBar from "./navbar";
import RightSideDrawer from './right-side-drawer';

import BackdropBlack from './backdrop-black';
import BackdropWhite from './backdrop-white';
import ModalImpact from './modal-impact';

import AddDeliverableForm from './add-deliverable-form';
import DeliverableProfile from './deliverable-profile';




export default class Deliverables extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        courseSelected: "",
                        courseIsChanged:false,
                        showImpactModal: false,
                        fields:{},
                        errors:{},
                        //deliverableUpdated:false,
                        addMessage:"Deliverable has been added.",
                        updateMessage: "Deliverable has been updated.",
                        deleteMessage: "Deliverable has been deleted.",
                        setEditing:false
                }
                this.setSelectedCourseForView = this.setSelectedCourseForView.bind(this);
                this.toggleimpact = this.toggleimpact.bind(this);
        }

        componentDidMount() {
                this.props.setcourseanddeliverableflags();
                this.props.setPageFlags("Deliverables");
                
        }

        setSelectedCourseForView = (e) => {
                e.preventDefault();
                this.setState({
                    courseSelected: e.target.value,
                    courseIsChanged:true,
                    setEditing: true
                }, () => {
                        this.props.setcurrentcoursename(this.state.courseSelected);
                });
        
        }

        toggleimpact(e) {
                e.preventDefault();
                if (this.state.showImpactModal === true) {
                        this.setState({
                                showImpactModal:false
                        });
                } else {
                        this.setState({
                                showImpactModal: true
                        });
                }
        
        }

        
        render() {
                let backdrop;

                if(this.props.sideDrawerOpen) {
                    backdrop = <BackdropBlack rightbackdropclickhandler={this.props.rightbackdropclickhandler} />
                } else {
                        backdrop = <BackdropWhite />
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
                                                getcurrentweekdetails={this.props.getcurrentweekdetails}
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
                                                        {(this.props.thistermdeliverables.length === 0 )  ? (
                                                               <div className="message-style">{this.props.deliverableMessage}</div>
                                                        ) : (
                                                                <div></div>
                                                        )}
                                                </header>
                                                <div className="deliverable-option-bar-full">
                                                        <div className="deliverable-option-bar">
                                                                <div className="view-deliverables">
                                                                        <div className="view-deliverables-label">View Deliverables by Course</div>
                                                                        <select
                                                                                type="text"
                                                                                className="course-select"
                                                                                defaultValue='DEFAULT'
                                                                                onChange={this.setSelectedCourseForView}
                                                                                >
                                                                                <option value="DEFAULT" disabled>Choose a course</option>
                                                                                        {mycoursedropdown}
                                                                        </select>
                                                                </div>
                                                                <div className="add-deliverable">
                                                                        <div className="add-deliverable-link-spacer"></div>
                                                                        <div className="blue-btn btn-med tenpx-bottom-margin add-deliverable-link-div">
                                                                                <Link 
                                                                                        className="add-deliverable-link"
                                                                                        to={{
                                                                                                pathname: '/add-deliverable'
                                                                                        }}
                                                                                        >
                                                                                                Add Deliverable
                                                                                        
                                                                                </Link>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div className="show-impact">
                                                                <div className="add-deliverable-link-spacer-impact"></div>
                                                                <button 
                                                                        className="simple-btn tenpx-bottom-margin add-deliverable-link-div"
                                                                        onClick={this.toggleimpact}>
                                                                        Click to understand 'Impact'
                                                                </button>
                                                        </div>
                                                </div>
                                                {(this.state.showImpactModal === true) ? (
                                                                <div>
                                                                        <BackdropBlack />
                                                                        <ModalImpact 
                                                                                {...this.props}
                                                                                toggleimpact={this.toggleimpact}
                                                                        />
                                                                </div>
                                                                ) : (
                                                                        null
                                                                )}
                                        
                                        
                                        {/*

                                                {(this.props.deliverableAdded === true) ? (
                                                        <div className="message-style">{this.state.addMessage}</div>
                                                ) : (
                                                        null
                                                )}
                                                */}
                                                {(this.props.deliverableDeleted) ? (
                                                            <div className="message-style">{this.state.deleteMessage}</div>
                                                            ):(
                                                        null
                                                )}
                                                
                                                {(this.props.currentcoursename !== "" && this.props.deliverableAdding === true) ? (
                                                                <AddDeliverableForm
                                                                        {...this.props}
                                                                        submitadddeliverable={this.props.submitadddeliverable}
                                                                />
                                                ) : (
                                                        <div></div>
                                                )}
                                                        
                                                {(this.state.courseIsChanged === true) ?  (
                                                        <div className="deliverables-wrapper">
                                                                {thiscoursedeliverables}  
                                                        </div>
                                                ) : ( 
                                                        <div className="deliverables-wrapper">
                                                                {thistermdeliverables}    
                                                        </div>   
                                                )}
                                                
                                        </div>
                        </div>
                );
        }      
}
