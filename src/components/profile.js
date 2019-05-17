import React from 'react';

import {API_BASE_URL} from '../config';

import NavBar from './navbar';

import AddForm from './add-form';
import Term from './term';
import Course from './course';
import Week from './week';



export default class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentterm:'',
            currenterm:props.location.state.currentterm,
            terms: props.location.state.terms,
            courses: props.location.state.currentcourses,
            weeks: props.location.state.currentweeks,
            error: null,
            loading: false
        }
        this.authToken=localStorage.getItem('authToken');
        //this.submitAddTerm = this.submitAddTerm.bind(this);
        this.getSelectedTerm = this.getSelectedTerm.bind(this);
    }



   submitAddTerm = (newterm) => {
    console.log('made it to  submitAddTerm', newterm);
        fetch(`${API_BASE_URL}/terms`, {
            method: 'POST',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newterm)
            })
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {
                console.log('responseJSON looks like ', responseJSON);
                this.setState((responseJSON) => ({
                    terms: [...this.state.terms, responseJSON]
                }));
                console.log(this.state);
               return responseJSON;
            })   
            .catch((err) => {
                console.log(err);
            });
    }
 
    submitAddCourse = (newcourse) => {
        console.log('made it to exec submitAddCourse, here is the newCourse ', newcourse);
        fetch(`${API_BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newcourse)
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.text)
        })
        .then(responseJSON =>  {
            this.setState({
                courses: [...this.state.courses, responseJSON]
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    submitAddWeek = (newweek) => {
        fetch(`${API_BASE_URL}/weeks`, {
            method: 'POST',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newweek)
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.text)
        })
        .then(responseJSON =>  {
            this.setState({
                weeks: [...this.state.weeks, responseJSON]
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteCourse = (selectedCourse) => {
        fetch(`${API_BASE_URL}/courses`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                    'Content-Type': 'application/json'},
                body: JSON.stringify(selectedCourse)
            })
            .then(response => {
                if(response.ok) {
                        return response.json()
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {
                const tempcourses = responseJSON.filter(course => {
                        return course.termDesc === this.state.currentterm;
                });
                console.log('this.state within deleteCourse on return from fetch', this.state);
                this.setState({
                    courses: tempcourses
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteWeek = (selectedWeek) => {
        console.log('made it to delete Week selectedweek ', selectedWeek)
        fetch(`${API_BASE_URL}/weeks`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                    'Content-Type': 'application/json'},
                body: JSON.stringify(selectedWeek)
            })
            .then(response => {
                console.log('response', response);
                if(response.ok) {
                        return response.json()
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {
                console.log('responseJSON after deletion and before filter', responseJSON);

                const tempweeks = responseJSON.filter(week => {
                    console.log('inside map, week.termDesc', week.termDesc);
                    console.log('inside map, this.state.currentterm', this.state.currentterm);
                        return week.termDesc === this.state.currentterm;
                });
                console.log('tempweeks AFTER filter ', tempweeks);
                this.setState({
                    weeks: tempweeks
                });
                console.log('this.state.weeks', this.state.weeks);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getSelectedTerm(selTerm){
        console.log('this.state returning from term.js', this.state)
        console.log('made it to getSelectedTerm');
        console.log('selTerm is', selTerm);
      
        console.log('this.props', this.props)
        this.setState({
            currentterm: selTerm
        });
        console.log('this.state.selectedterm', this.state.currentterm)
       document.getElementById(selTerm).setAttribute("class", "highlight");
    }


   // setEditing(editing) {
     //   this.setState({
    //        editing
    //    });
   // }
   //
    /*
        submitAddWeekForm(e) {
            e.preventDefault();
            let newWeek = {
                termDesc:this.props.currentterm,
                weekNum: e.currentTarget.newweek.value
            }
            this.props.submitAddCourse(newWeek);
        }
    
    */
    render() {
        console.log('inside profile ', this.state.currentcourses)
        const myterms = this.state.terms.map((term, index) => {
            return (
                <li key={index} >
                    <Term {...term} getselectedterm={this.getSelectedTerm} />
                </li>
            );
        });
        //console.log(myterms);
        const mycourses = this.state.courses.map((course, index) => {
            return (
                <li key={index}>
                    <Course {...course} deletecourse={this.deleteCourse} />
                </li>
            );
        });

        const myweeks = this.state.weeks.map((week, index) => {
            return (
                <li className="list-horizontal" key={index}>
                    <Week {...week}  deleteweek={this.deleteWeek} />
                </li>
            );
        });
/*
        if (!this.state.editing) {
            const text = `Add a term`;
            return (
                <div className="add-button"
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
                        <h2>My Profile</h2>
                        <div className="terms">
                            <p>Your Terms</p>
                            <ul className="list-horizontal term-list">
                               {myterms} 
                            </ul>
                            <div> missy
                            <div>
                                <AddForm type="term" submitaddterm={this.submitAddTerm}   />
                            </div>
                            </div>
                        </div>
                        <hr />
                       <div className="courses">
                            <p>Your Courses</p>
                            <ul className="list-horizontal course-list">
                               {mycourses} 
                               </ul>
                               <div>
                                <AddForm type="course" currentterm={this.props.location.state.currentterm} submitaddcourse={this.submitAddCourse}/>
                               </div>
                            
                        </div>
                        <hr />
                        <div className="weeks">
                            <p>Your Weeks</p>
                            <ul className="list-vertical week-list">
                               {myweeks} 
                            </ul>
                            <div>
                                <AddForm type="week" currentterm={this.props.location.state.currentterm} submitaddweek={this.submitAddWeek} />
                            </div>
                            
                    </div>
                </div>
            </main>
        );

    }
}

    