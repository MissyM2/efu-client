import React, { useEffect, useState } from 'react';
import NavBar from "./navbar";

import { FetchCalls } from "../fetch-calls";
//import { AuthCalls } from "../auth-calls";

import { Link } from 'react-router-dom';

const Profile = props => {
    const [currentterm, setcurrentterm] = useState("");
    const [currentweek, setcurrentweek] = useState();
    const [currentday, setcurrentday] = useState("");
    const [term, setterm] = useState("");
    const [course, setcourse] = useState("");
    const [week, setweek] = useState("");
    const [terms, setterms] = useState("");
    const [currentcourses, setcurrentcourses] = useState("");
    const [currentweeks, setcurrentweeks] = useState("");
    const [loading, setloading] = useState([]);


    useEffect(() => {
         // set the currentTerm
         setcurrentterm("Spring, 2019");

         //set the currentWeek
         setcurrentweek(2);
 
         //set the currentDay
         setcurrentday("05/12/2019");

         //  get all terms for the user
        FetchCalls.getTerms.then(terms => {
                setterms(terms);
        });

        // set current courses based on proper term
        FetchCalls.getCourses.then(courses => {
            let mycourses = [];
            courses
                .filter(course => {
                    return course.termDesc = currentterm
                })
                .forEach(course => {
                    return mycourses.push({
                        termDesc: course.termDesc
                    })
                });
            setcurrentcourses(mycourses);
        });

        FetchCalls.getWeeks.then(weeks => {
            let myweeks = [];
            weeks
                .filter(week => {
                    return week.termDesc = currentterm
                })
                .forEach(week => {
                    return myweeks.push({
                        weekNum:week.weekNum,
                        termDesc:week.termDesc,
                        likedLeast:week.likedLeast,
                        likedMost:week.likedMost,
                        mostDifficult:week.mostDifficult,
                        leastDifficult:week.leastDifficult
                    })
                });
            setcurrentweeks(myweeks);
        
        });
    })

    async function addTerm() {
        try {
            await FetchCalls.addTerm({
                currentweek
            });
            // set current term to include this term and show
        } catch (error) {
            alert(error.message);
        }
    }

    async function addCourse() {
        try {
            await FetchCalls.addCourse({
                term: {currentterm},
                course
            });
            // reset current courses to include this course and show

        } catch (error) {
            alert(error.message);
        }
    }

    async function addWeek() {
        try {
            await FetchCalls.addWeek({
                term: {currentterm},
                currentweek
            });
            // set current weeks to include this week and show
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <main>
            <NavBar {...props} />
            <div className="container">
                    <h2>My Profile</h2>
                    <div className="terms">
                        <p>Your Terms</p>
                        <ul className="term-list">
                            {terms
                                .map((term, index) => {
                                    return (
                                        <li key={index}>
                                            <div 
                                                className={currentterm === term.termDesc ? 'item termDesc highlight': 'item termDesc'}
                                                onClick={setcurrentterm = term.termDesc}>
                                                {term.termDesc}
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <hr />
                        <form onSubmit={e => e.preventDefault() && false}>
                            <div>
                                <input 
                                    placeholder="term"
                                    type="text"
                                    value={term}
                                    aria-label="term"
                                    onChange={e => setterm(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="button is-primary"
                                onClick={addTerm}
                            >
                                Add Term
                            </button>
                        </form>
                    </div>

                    <div class="courses">
                        <p>Your Courses for this Term</p>
                        <ul className="course-list">
                            {currentcourses
                                .filter((course) => {
                                    return course.term === currentterm;
                                })
                                .map((course, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="item courseName">{course.courseName}</div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <hr />
                        <form onSubmit={e => e.preventDefault() && false}>
                            <div>
                                <input 
                                    placeholder="course"
                                    type="text"
                                    value={course}
                                    aria-label="course"
                                    onChange={e => setcourse(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="button is-primary"
                                onClick={addCourse}
                            >
                                Add Course
                            </button>
                        </form>
                    </div>

                    <div class="weeks">
                        <p>Your Weeks for this Term</p>
                        <ul className="week-list-labels">
                            <li>
                                <div className="item weekNum">{week.weekNum}</div>
                                <div className="item weeknum">Week Number</div>
                                <div className="item termDesc">Term</div>
                                <div className="item likedLeast">Liked Least</div>
                                <div className="item likedMost">Liked Most</div>
                                <div className="item mostDifficdivt">Most Difficult</div>
                                <div className="item leastDifficult">Least Difficult</div>
                            </li>
                        </ul>
                        <ul className="week-list">
                            {currentweeks
                                .filter((week) => {
                                    return week.term === currentterm;
                                })
                                .map((week, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="week-data-item weeknum">{week.weekNum}</div>
                                            <div className="week-data-item termDesc">{week.termDesc}</div>
                                            <div className="week-data-item likedLeast">{week.likedLeast}</div>
                                            <div className="week-data-item likedMost">{week.likedMost}</div>
                                            <div className="week-data-item mostDifficult">{week.mostDifficult}</div>
                                            <div className="week-data-item leastDifficult">{week.leastDifficult}</div>
                                        </li>
                                        );
                                })
                            }
                        </ul>
                        <hr />
                        <form onSubmit={e => e.preventDefault() && false}>
                            <div>
                                <input 
                                    placeholder="week"
                                    type="text"
                                    value={week}
                                    aria-label="week"
                                    onChange={e => setweek(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="button is-primary"
                                onClick={addWeek}
                            >
                                Add Week
                            </button>
                        </form>
                    </div>
            </div>
        </main>
    );
}


export default Profile;