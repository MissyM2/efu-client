import React from 'react';
import NavBar from "./navbar"
import {API_BASE_URL} from '../config';

import Week from './week';

export default class ReviewCurrentWeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentcoursedropdown: props.location.state.currentcourses,
            currentterm: props.location.state.currentterm,
            currentweek: props.location.state.currentweek,
            currentweekdetails: props.location.state.currentweekdetails,
            currentcourses: props.location.state.currentcourses,
            week:{
                likedmost: "",
                likedleast: "",
                mostdifficult: "",
                leastdifficult: ""
            },
            courseName: "",
            gradeNum: 0,
        }
        this.authToken=localStorage.getItem('authToken');
        this.addGrade=this.addGrade.bind(this);
        }

    componentDidMount() {
        const { receivedData } = this.props.location.state;
        //this.getCurrentGrades();
    }
    
    // update the week after student enters details
    submitUpdateWeek = (updatedweek) => {
        fetch(`${API_BASE_URL}/weeks`, {
            method: 'PUT',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(updatedweek)
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.text)
        })
        .then(responseJSON =>  {
            const tempweeks = responseJSON.filter(week => {
                return week.termDesc === this.state.currentterm && week.weekNum === this.state.currentweek;
            });
            this.setState({
                weeks: tempweeks
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }
   

    // handle changes in grade
    handleGradeChange(e, field) {
        this.setState({
            [field]: e.target.value,
            courseName: e.target.id
        });
        console.log('this field should be changing', this.state);
    }

    // update the grades for the week after student enters details
    addGrade(e) {
            e.preventDefault();
            let newGrade= {
                termDesc: this.props.location.state.currentterm,
                weekNum: this.props.location.state.currentweek,
                courseName: this.state.courseName,
                gradeNum:   this.state.gradeNum
            }
            console.log('newgrade', newGrade);
            fetch(`${API_BASE_URL}/grades`, {
                    method: 'POST',
                    headers: {
                        // Provide our auth token as credentials
                        Authorization: `Bearer ${this.authToken}`,
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(newGrade)
                })
                .then(response => {
                    if(response.ok) {
                            return response.json()
                    }
                    throw new Error(response.text)
                })
                .then(grade => {
                    console.log("was grade successful..  found a grade", grade);
                    return grade;
                })
                .catch((err) => {
                    console.log(err);
                }); 
    }

    render() {
        // set up week section
        let myweek = this.props.location.state.currentweekdetails;
        myweek = myweek.map((week, index) => {
            return (
                <li className="list-horizontal" key={index}>
                    <Week {...week} {...this.state} weekstatus="one" updateweek={this.submitUpdateWeek} />
                </li>
            );
        });
        
        // set up courses and grades section
        let mycoursesgrades = this.state.currentcourses.map((course, index) => {
                                        return (
                                            <li className="list-horizontal" key={index}>
                                                <div 
                                                    className="item-label course">
                                                    {course.courseName}
                                                </div>
                                                <div className="item">
                                                    <input 
                                                        type="number" 
                                                        id={course.courseName}
                                                        index={index}
                                                        onChange={e =>this.handleGradeChange(e, "gradeNum")}
                                                        />
                                                </div>
                                                <div className="item">
                                                    <button
                                                        type="submit"
                                                        data-mycourse={course.courseName}
                                                        className="btn is-primary">
                                                        Commit Grade
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    });

        return (
            <main>
                <NavBar />
                <div className="container">
                    <h2>Review Last Week, week number {this.state.currentweek}</h2>
                    <div className="week">
                        <div className="section-label">How did you feel about your week?</div>
                        <div className="weeks">
                            <div className="section-label">Your Weeks</div>
                            <div className="item weekNum">
                                <div className="item">Week Number</div>  
                            </div>
                            <ul className="list-vertical week-list">
                                week goes here
                               {myweek}

                            </ul>
                    </div>
                    </div>
                    
                    <div className="grades">
                        <p>Add Your Grades as of Today</p>
                        <ul>
                            <form onSubmit={this.addGrade}>
                                {mycoursesgrades}
                            </form>
                        </ul>
                    </div>
                </div>  
            </main>    
        );  

    }
}