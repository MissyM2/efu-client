import React, { useEffect, useState } from 'react';
import NavBar from "./navbar"

import { FetchCalls } from "../fetch-calls";
import { Link } from "react-router-dom";
import {getCurrentDate} from '../utils';

import {SingleWeek} from './single-week';
import {AddWeekForm} from './add-week-form';


const Weeks = props => {
        const [currentterm, setcurrentterm] = useState("");
        const [currentweeks, setcurrentweeks] = useState("");
        const [currentweek, setcurrentweek] = useState("");
        const [weeks, setweeks] = useState("");
        const [loading, setloading] = useState([]);


        useEffect(() => {

                //set the currentWeek
                setcurrentweek(2);

                // set current courses based on proper term
                FetchCalls.getWeeks.then(weeks => {
                let myweeks = [];
                currentweeks
                        .filter(week => {
                        return week.termDesc = {currentterm}
                        });
                setweeks(myweeks);
                });
        });


        return (
                <main>
                        <NavBar {...props} />
                        <div className="container">
                                <p>Your Weeks for this Term</p>
                                <ul className="week-list-labels">
                                        <li>
                                                <div className="item weekNum">{currentweek}</div>
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
                                
                        </div>
                </main>
        );
}


export default Weeks;
