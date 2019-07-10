import React from 'react';
import './css/courses.css';

import NavBar from "./navbar";
import RightSideDrawer from './right-side-drawer';
import Backdrop from './backdrop';
import BackdropBlack from './backdrop-black';
import BackdropWhite from './backdrop-white';
import ModalDeleteCourse from './modal-delete-course';

import AddCourseForm from './add-course-form';
import Course from './course';



export default class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            delMessage: '',
            courseIsChanged: false
        }
    }

    componentDidMount() {
        this.props.setcourseanddeliverableflags();
        this.props.setPageFlags("Courses");
    }

    setCourseIsChanged = (bool) => {
            this.setState({
                courseIsChanged: bool
            });
        
    }

    cancelcoursedelete() {
        this.props.setcoursedeletemodal(false);
    }

    deletecourse(e) {
        e.preventDefault();
        let selectedCourse = {
            termDesc: this.props.termDesc,
            courseName:this.props.courseName
        };
        this.props.submitdeletecourse(selectedCourse); 
        if(this.props.courseDeleted) {
            this.setState({delMessage: `${selectedCourse.courseName} has been deleted`});
        } else {
            this.setState({message: 'There was a problem with the deletion.'})
        }
    }
 
    render() {

        let backdrop;

        if(this.props.rightSideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        } else {
            backdrop = <BackdropWhite />
        }

        const mycourses = this.props.thistermcourses.map((course, index) => {
            return (
                <li className="course-li" key={index} id={course.id}>
                    <Course 
                        {...course} 
                        {...this.props} 
                        {...this.state}
                        courseName={course.courseName} 
                        setCourseIsChanged={this.setCourseIsChanged}
                        submitupdatecourse={this.props.submitupdatecourse} 
                        deletecoursedetails={this.props.deletecoursedetails} />
                </li>
            );
        });
        return (
            <div className="content-container">
            <div className="">
                <NavBar {...this.props}/>
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
            {(this.props.showCourseDeleteModal === true) ? 
                    (
                        <div>
                            <BackdropBlack />
                            <ModalDeleteCourse 
                                    {...this.props} 
                                    cancelcoursedelete={this.cancelcoursedelete} 
                                    coursedelete={this.coursedelete}
                                    />
                        </div>
                     ) : (
                         null
                     )
                     }

                
                <div className="content-sub-container">
                    <header className="page-header">
                        <h2>My courses</h2>
                        <h3>Term:  {this.props.currentterm}</h3>
                    </header>
                        
                        <div>
                            <div className="message-style">{this.state.message}</div>
                            <AddCourseForm 
                                type="course" 
                                {...this.props} 
                                submitaddcourse={this.props.submitaddcourse}
                                setCourseIsChanged={this.setCourseIsChanged} 
                            />
                            <ul className="course-row">
                                    {mycourses} 
                            </ul>
                        </div>
                        
                </div>
            </div>
        );

    }
}

    