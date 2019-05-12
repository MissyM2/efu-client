import React, { useEffect, useState } from 'react';
import NavBar from "./navbar"
import { FetchCalls } from "../fetch-calls";
import { AuthCalls } from "../auth-calls";
import { Link } from "react-router-dom";
import {getCurrentDate} from '../utils';

const ReviewLastWeek = props => {
    const [currentterm, setcurrentterm] = useState("");
    const [currentweek, setcurrentweek] = useState();
    const [currentcourses, setcurrentcourses] = useState();
    const [currentcoursedropdown, setcurrentcoursedropdown] = useState("");
    const [currentday, setcurrentday] = useState("");
    const [likedmost, setlikedmost] = useState("");
    const [likedleast, setlikedleast] = useState("");
    const [mostdifficult, setmostdifficult] = useState("");
    const [leastdifficult, setleastdifficult] = useState("");
    const [weeknum, setweeknum] = useState();
    const [coursename, setcoursename] = useState("");
    const [gradenum, setgradenum] = useState("");
    

    useEffect(() => {
        // set the currentTerm
        setcurrentterm("Spring, 2019");

        //set the currentWeek
        setcurrentweek(2);

        //set the currentDay
        setcurrentday("05/12/2019");

        // fetch the weeks and set the state with the weeks
        FetchCalls.getWeeks.then(weeks => {
            let myweeks = [];
            weeks
                .filter(week => {
                    return week.termDesc = currentterm && week.weekNum = currentweek
                })
                .forEach(week => {
                    return myweeks.push({
                        weekNum = week.weekNum,
                        termDesc = week.termDesc,
                        likedLeast = week.likedLeast,
                        likedMost = week.likedMost,
                        mostDifficult = week.mostDifficult,
                        leastDifficult = week.leastDifficult
                    })
                });
            setcurrentweeks(myweeks);
        
        });

        // fetch the courses and set the state with the courses
        FetchCalls.getCourses.then(courses => {
            let mycourses = [];
            courses
                .filter(course => {
                    return course.termDesc = currentterm && course.weekNum = currentweek
                })
                .forEach(course => {
                    return mycourses.push({
                        termDesc: course.termDesc
                    })
                });
            setcurrentcourses(mycourses);
        });

        // fetch the grades and set the state with the grades
        FetchCalls.getGrades.then(grades => {
            let mygrades = [];
            grades
                .filter(grade => {
                    return grade.termDesc = currentterm && grade.weekNum = currentweek
                })
                .forEach(grade => {
                    return mygrades.push({
                        termDesc: grade.termDesc
                    })
                });
            setcurrentgrades(mygrades);
        });

        setcurrentcoursedropdown(
            currentcourses.map((course, index) =>
                <option value={course.courseName} key={index}>{course.courseName}</option>)
        );

    }, [loading]);

    // update the week after student enters details
    async function updateWeek(updatedWeek){
        try {
            await FetchCalls.updateWeek({
                termDesc = {currentterm},
                weekNum = {currentweek},
                likedLeast,
                likedMost,
                mostDifficult,
                leastDifficult
            });
            setcurrentterm("");
            setcurrentweek("");
            setlikedmost("");
            setlikedleast("");
            setmostdifficult("");
            setleastdifficult("");
        } catch (error) {
            alert(error.message);
        }
    }

    // update the grades for the week after student enters details
    async function addGrade() {
        try {
            await FetchCalls.addGrade({
                termDesc = {currentterm},
                weekNum = {currentweek},
                courseName = {coursename},
                gradeNum = {gradenum}}
            });
            setcurrentterm("");
            setcurrentweek("");
            setcoursename("");
            setgradenum("");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <main>
            <NavBar {...props} />
            <div className="container">
                <h2>Review Last Week, week number {currentweek}</h2>
                <div className="week">
                    <p>How did you feel about your week?</p>
                    <ul>
                        <form onSubmit={e => e.preventDefault() && false}>
                            <div>
                                <div className="myweek-label">Student Info</div>
                                <div className="student-section-labels">
                                    <div className="myweekitemlabel studentFullName">Student Name</div>
                                    <div className="myweekitemlabel weeknum">Week Number</div>
                                    <div className="myweekitemlabel termDesc">Term</div>
                                </div>
                                <div className="student-section">
                                    <div className="myweekitem studentFullName">{studentFullName}</div>
                                    <div className="myweekitem weeknum">{currentweek}</div>
                                    <div className="myweekitem termDesc">{currentterm}</div>
                                </div>
                            </div>
                            <div>
                                <div className="myweeksectionlabels">
                                    <div className="item-label likedLeast">Course You Liked Least</div>
                                    <div className="item-label likedMost">Course You Liked Most</div>
                                </div>
                                <div className="myweeksection">
                                        <select 
                                            className="item likedLeast" 
                                            type="text" 
                                            value={likedleast}
                                            aria-title="likedleast" 
                                            onChange={e => setlikedleast(e.target.value)} >
                                            {currentcoursedropdown}
                                        </select>
                                        <select 
                                            className="item likedMost" 
                                            type="text" 
                                            value={likedmost}
                                            aria-title="likedmost" 
                                            onChange={e => setlikedmost(e.target.value)}>
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
                                            value={mostdifficult} 
                                            aria-title="mostdifficult" 
                                            onChange={e => setmostdifficult(e.target.value)}>
                                            {currentcoursedropdown}
                                        </select>
                                        <select 
                                            className="item leastDifficult" 
                                            type="text" 
                                            value={leastdifficult} 
                                            aria-title="leastdifficult" 
                                            onChange={e => setleastdifficult(e.target.value)}>
                                        {currentcoursedropdown}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button 
                                    type="submit"
                                    className="button is-primary" 
                                    onClick={updateWeek}
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
                        <form onSubmit={e => e.preventDefault() && false}>
                            {currentcourses
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
                                                        value={grade}
                                                        aria-label={course.courseName}
                                                        data-course = {course.courseName}
                                                        onChange={e => {
                                                                //setcoursename(QUESTION:  how do i get the coursename?);
                                                                setgrade(e.target.value)}
                                                        />
                                                </div>
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="button is-primary"
                                                        onClick={addGrade}>
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



export default ReviewLastWeek;