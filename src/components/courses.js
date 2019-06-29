import React from 'react';
import './css/courses.css';

import NavBar from "./navbar";
import RightSideDrawer from './right-side-drawer';
import Backdrop from './backdrop';
import BackdropBlack from './backdrop-black';
import BackdropWhite from './backdrop-white';
import ModalDeleteCourse from './modal-delete-course';

import AddForm from './add-form';
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
    }

    setCourseIsChanged = (bool) => {
            this.setState({
                courseIsChanged: bool
            });
        
    }

    cancelcoursedelete() {
        console.log('inside cancelcoursedelete', this.props);
        this.props.setcoursedeletemodal(false);
    }

    deletecourse(e) {
        e.preventDefault();
        console.log('made it to deletecourse')
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

        if(this.props.sideDrawerOpen) {
            backdrop = <Backdrop click={this.props.backdropclickhandler} />
        } else {
            backdrop = <BackdropWhite />
        }

        const mycourses = this.props.currentcourses.map((course, index) => {
           // console.log('courses: this.props', this.props);
            return (
                <li className="" key={index}>
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
                    user={this.props.currentusername} 
                    click={this.props.rightdrawertoggleclickhandler} 
                    show={this.props.rightSideDrawerOpen} 
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
                        <h3>My courses for {this.props.currentterm}</h3>
                        <div>
                            <div className="error-msg">{this.state.message}</div>
                            <AddForm 
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

    