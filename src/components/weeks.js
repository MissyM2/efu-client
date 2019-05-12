import React, { useEffect, useState } from 'react';
import NavBar from "./navbar"

import { FetchCalls } from "../fetch-calls";
import { AuthCalls } from "../auth-calls";
import { Link } from "react-router-dom";
import {getCurrentDate} from '../utils';

import {SingleWeek} from './single-week';
import {AddWeekForm} from './add-week-form';


const Weeks = props {
        const [currentterm, setcurrentterm] = useState("");
        const [currentweeks, setcurrentweeks] = useState("");
        const [loading, setloading] = useState([]);


    useEffect(() => {

         //set the currentWeek
         setcurrentweek(2);

         //  get all terms for the user
        FetchCalls.getTerms.then(terms => {
                setterms(terms);
        });

        // set current courses based on proper term
        FetchCalls.getWeeks.then(weeks => {
            let mycourses = [];
            weeks
                .filter(week => {
                    return course.termDesc = currentTerm
                })
                .forEach(week => {
                    return myweeks.push({
                        termDesc: week.termDesc
                    })
                });
            setweeks(myweeks);
        })
    });

        fetchAddWeek(newWeek) {
                this.props.dispatch(fetchAddWeek(newWeek));
        }

        render() {
                const weeks = this.props.weeks.map((singleweek, index) => 
                        <div className="single-week" key={index}>
                                <SingleWeek {...singleweek} />
                        </div>
                        );

                return (
                        <main>
                                <NavBar {...props} />
                                <div className="container">
                                <h3>Weeks</h3>
                                <div className="weeks-section">
                                        <ul className="list-horizontal">
                                                <li className="item weeknum">Week Number</li>
                                                <li className="item termDesc">Term</li>
                                                <li className="item likedLeast">Liked Least</li>
                                                <li className="item likedMost">Liked Most</li>
                                                <li className="item mostDifficdivt">Most Difficult</li>
                                                <li className="item leastDifficult">Least Difficult</li>
                                                
                                        </ul>
                                </div>
                                </div>
                        </main>
                        <div className="data-wrapper">
                                
                                <h2>{AuthCalls.getCurrentUsername()}'s Profile</h2>
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
                               <div className="weeks-section">
                                        <ul className="add-wrapper">
                                                <AddWeekForm
                                                type="newWeek"
                                                onAdd={newWeek => 
                                                        this.fetchAddWeek(newWeek)}  />
                                        </ul>
                               </div>
                        </div>
                );
        }
}

const mapStateToProps = state => {
        console.log('the state is ', state);
        return {
                weeks: state.protectedData.weeks,
                title: "Your weeks"
        }
}

export default connect(mapStateToProps)(Weeks);
