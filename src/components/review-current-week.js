import React from 'react';
import NavBar from "./navbar"
import {API_BASE_URL} from '../config';

export default class ReviewCurrentWeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            week:{
                likedmost: "",
                likedleast: "",
                mostdifficult: "",
                leastdifficult: ""
            },
            course: {
                coursename: ""
            },
            grade: {
                gradenum: 0
            }
        }
        this.authToken=localStorage.getItem('authToken');
        }

    componentDidMount() {
        const { receivedData } = this.props.location.state;
    }
    
    // update the week after student enters details
    updateWeek(e) {
        e.preventDefault();
        let updatedWeek= {
            termDesc: this.props.currentterm,
            weekNum: this.props.currentweek,
            likedLeast: e.currentTarget.likedleast.value,
            likedMost: e.currentTarget.likedmost.value,
            mostDifficult: e.currentTarget.mostdifficult.value,
            leastDifficult: e.currentTarget.leastdifficult.value,
        }
        fetch(`${API_BASE_URL}/weeks`, {
            method: 'PUT',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(updatedWeek)
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.text)
        })
        .then(updatedWeek =>  {
            //QUESTION:  WHAT AM I SUPPPOSED TO DO WITH THIS UPDATED WEEK?
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // update the grades for the week after student enters details
    addGrade(e) {
            e.preventDefault();
            let newGrade= {
                termDesc: this.props.currentterm,
                weekNum: this.props.currentweek,
                // QUESTION:  Need to figure out how to get the coursename
                courseName: 'Need to figure out how to get the coursename',
                gradeNum:   this.props.newgrade
            }

            //console.log("above fetch ", newGrade);
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
        console.log('inside reviewcurrentweek, currentweek ', this.props.location.state.currentweek);
        const currentcoursedropdown = this.state.currentcourses.map(course =>  
            <option key={course.objectID}>
                <div>{course.courseName}</div>
            </option>
        );
        return (
            <main>
                <NavBar />
                <div className="container">
                    <h2>Review Last Week, week number {this.state.currentweek}</h2>
                    <div className="week">
                        <p>How did you feel about your week?</p>
                        <ul>
                            <form onSubmit={this.updateWeek}>
                                <div>
                                    <div className="myweek-label">Student Info</div>
                                    <div className="student-section-labels">
                                        <div className="myweekitemlabel studentFullName">Student Name</div>
                                        <div className="myweekitemlabel weeknum">Week Number</div>
                                        <div className="myweekitemlabel termDesc">Term</div>
                                    </div>
                                    <div className="student-section">
                                        <div className="myweekitem studentFullName">FIND STUDENT FULLNAME</div>
                                        <div className="myweekitem weeknum">{this.props.currentweek}</div>
                                        <div className="myweekitem termDesc">{this.props.currentterm}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="myweeksectionlabels">
                                        <div className="item-label likedLeast">Course You Liked Least</div>
                                        <div className="item-label likedMost">Course You Liked Most</div>
                                    </div>
                                    <div className="myweeksection">
                                            <select 
                                                className="item likedleast" 
                                                type="text" 
                                                name="likedleast" >
                                                {currentcoursedropdown}
                                            </select>
                                            <select 
                                                className="item likedMost" 
                                                type="text" 
                                                name="likedmost">
                                                {currentcoursedropdown}
                                            </select>
                                    </div>
                                    <div className="myweeksectionlabels">
                                        <div className="item-label mostDifficult">Your Most Difficult Course</div>
                                        <div className="item-label leastDifficult">Your Least Difficult Course</div>
                                    </div>
                                    <div className="myweeksection">
                                            <select 
                                                className="item mostDifficult" 
                                                type="text" 
                                                name="mostdifficult" >
                                                {currentcoursedropdown}
                                            </select>
                                            <select 
                                                className="item leastdifficult" 
                                                type="text" 
                                                name="leastdifficult"  >
                                            {currentcoursedropdown}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <button 
                                        type="submit"
                                        className="button is-primary" 
                                        onClick={this.updateWeek}
                                    >
                                        Commit Week Details
                                    </button>
                                </div>
                            </form>              
                        </ul>
                    </div>
                    
                    <div className="grades">
                        <p>Add Your Grades as of Today</p>
                        <ul>
                            <form onSubmit={this.addGrade}>
                                {this.state.currentcourses
                                    .map((course, index) => {
                                        return (
                                            <li key={index}>
                                                    <div 
                                                        className="item course">
                                                        {course.courseName}
                                                    </div>
                                                    <div>
                                                        <input 
                                                            type="number" 
                                                            index={index}
                                                            name="newgrade"
                                                            // QUESTION:  I NEED THE TO GET THE COURSE FROM HERE ALSO, course.courseName
                                                            />
                                                    </div>
                                                    <div>
                                                        <button
                                                            type="submit"
                                                            className="button is-primary">
                                                            Commit Grade
                                                        </button>
                                                    </div>
                                            </li>
                                        );
                                    })
                                }
                            </form>
                        </ul>
                    </div>
                </div>  
            </main>    
        );  

    }
}