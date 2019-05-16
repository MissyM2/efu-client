import React from 'react';

import {API_BASE_URL} from '../config';

import NavBar from './navbar';

import AddForm from './add-form';
import EditForm from './edit-form';
import Term from './term';
import Course from './course';
import Week from './week';



export default class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currenterm:this.props.location.state.currentterm,
            terms: this.props.location.state.terms,
            courses: this.props.location.state.currentcourses,
            weeks: this.props.location.state.weeks,
            error: null,
            loading: false
        }
        this.authToken=localStorage.getItem('authToken');
    }

 

   
    onSubmit(e) {
       
        e.preventDefault();
        console.log('am i making it to onsubmit?');
        const text =this.textInput.value.trim();
        let newTerm = {
                termDesc:text
        }
        fetch(`${API_BASE_URL}/terms`, {
            method: 'POST',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newTerm)
            })
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {
                console.log('responseJSON looks like ', responseJSON);
                this.setState(responseJSON => {
                    const terms = state.terms.concat(responseJSON.value);
                    });
                console.log('this.state.terms', this.state.terms);
            })   
            .catch((err) => {
                console.log(err);
            });
       // this.setState({
        //    terms: [...this.state.terms], newterm]
       // });
       // console.log('PROFILE, terms ', terms);
        
        //TODO:  add the term, course or week
        this.textInput.value="";
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
       // console.log('PROFILE this.state just after render ', this.state);
       // console.log('PROFILEthis.props.location.state just after render ', this.props.location.state);
       //console.log('this.props.location on componentDidMount ', this.props.location);
       // console.log('this.state in the profile ', this.state);
        const myterms = this.props.location.state.terms.map((term, index) => {
            return (
                <li key={index}>
                    <Term {...term} />
                </li>
            );
        });
        //console.log(myterms);
        const mycourses = this.props.location.state.currentcourses.map((course, index) => {
            return (
                <li key={index}>
                    <Course {...course} />
                    <EditForm />
                </li>
            );
        });

        const myweeks = this.props.location.state.currentweeks.map((week, index) => {
            return (
                <li className="list-horizontal" key={index}>
                    <Week {...week} />
                    <EditForm />
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
                                
                               <form className="course add-form" onSubmit={(e) => this.onSubmit(e)} >
                                    <input 
                                        type="text"
                                        ref={input => this.textInput = input}
                                        //aria-label={label} 
                                    />
                                    <button>Add </button>
                                  {/*  <button type="button" onClick={() => this.setEditing(false)}>
                                        Cancel
        </button>      */} 

                                </form>
        
                            </div>
                        </div>
                        <hr />
                       <div className="courses">
                            <p>Your Courses</p>
                            <ul className="list-horizontal course-list">
                               {mycourses} 
                               </ul>
                               <div>
                                <AddForm type="course" currentterm={this.props.location.state.currentterm} submitAddCourse={this.submitAddCourse} />
                               </div>
                            
                        </div>
                        <hr />
                        <div className="weeks">
                            <p>Your Weeks</p>
                            <ul className="list-vertical week-list">
                               {myweeks} 
                            </ul>
                            <div>
                                <AddForm type="week" currentterm={this.props.location.state.currentterm} submitAddWeek={this.submitAddWeek} />
                            </div>
                            
                    </div>
                </div>
            </main>
        );

    }
    
}