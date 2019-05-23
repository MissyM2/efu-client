import React from 'react';

import NavBar from './navbar';

import AddForm from './add-form';
import Term from './term';
import Course from './course';
import Week from './week';



export default class Profile extends React.Component {
    constructor(props){
        super(props);
        
        }

        componentDidMount() {
            console.log('profile: this.state', this.state);
            console.log('profile: this.props', this.props);
            this.props.getCurrentTerms();
            this.props.getCurrentCourses();
            this.props.getCurrentWeeks();
           
           
            
        }


   // setEditing(editing) {
     //   this.setState({
    //        editing
    //    });
   // }
   //
 
    render() {

        console.log('inside profile ', this.props)
        const myterms = this.props.terms.map((term, index) => {
            return (
                <li key={index} >
                    <Term {...term} getselectedterm={this.props.getSelectedTerm} />
                </li>
            );
        });
        //console.log(myterms);
        const mycourses = this.props.currentcourses.map((course, index) => {
            return (
                <li key={index}>
                    <Course {...course} updatecourse={this.props.submitUpdateCourse} deletecourse={this.props.submitDeleteCourse} />
                </li>
            );
        });

        const myweeks = this.props.currentweeks.map((week, index) => {
            return (
                <li className="list-horizontal" key={index}>
                    <Week {...week} {...this.props} weekstatus="all" updateweek={this.props.submitUpdateWeek} deleteweek={this.props.submitDeleteWeek} />
                </li>
            );
        });
/*
        if (!this.state.editing) {
            const text = `Add a term`;
            return (
                <div className="btn add-button"
                        onClick={(e) => {
                            e.preventDefault();
                            this.setEditing(true)
                        }}>
                        <a href="#">{text}...</a>
                </div>
            );
        }
        const label = `Enter a term`;
    */
        return (
            <main>
                <NavBar />
                <div className="container">
                        <h3>My Profile for {this.props.currentterm}</h3>
                        <div className="terms">
                            <div className="section-label">Your Terms</div>
                            <ul className="list-horizontal term-list">
                               {myterms} 
                            </ul>
                            <div>
                                <AddForm type="term" submitaddterm={this.props.submitAddTerm}   />
                            </div>
                        </div>
                        <hr />
                       <div className="courses">
                            <div className="section-label">Your Courses</div>
                            <ul className="list-horizontal course-list">
                               {mycourses} 
                               </ul>
                               <div>
                                <AddForm type="course" currentterm={this.props.currentterm} submitaddcourse={this.props.submitAddCourse} />
                               </div>
                            
                        </div>
                        <hr />
                        <div className="weeks">
                            <div className="section-label">Your Weeks</div>
                            <div className="item weekNum">
                                <div className="item">Week Number</div>  
                            </div>
                            <ul className="list-vertical week-list">
                               {myweeks} 
                            </ul>
                            <div>
                                <AddForm type="week" currentterm={this.props.currentterm} submitaddweek={this.props.submitAddWeek} />
                            </div>
                            
                    </div>
                </div>
            </main>
        );

    }
}

    