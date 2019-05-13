import React, { useEffect, useState } from 'react';
import NavBar from "./navbar"
import { FetchCalls } from "../fetch-calls";
//import { AuthCalls } from "../auth-calls";
import { Link } from "react-router-dom";
import {getCurrentDate} from '../utils';

//import ReviewCurrentWeek from './review-current-week';

const Dashboard = props => {
    const [todaydeliverables, settodaydeliverables] = useState([]);
    const [thisweekdeliverables, setthisweekdeliverables] = useState([]);
    const [title, settitle] = useState([]);
    const [currentterm, setcurrentterm] = useState("");
    const [currentweek, setcurrentweek] = useState();
    const [currentday, setcurrentday] = useState("");
    const [currentsuggestion, setcurrentsuggestion] = useState([]);
    const [loading, setloading] = useState([]);

    //  QUESTION:  this is so wrong  trying to get the deliverables from database and filter for term and weekNum
    useEffect(() => {
        // set the currentTerm
        setcurrentterm("Spring, 2019");

        //set the currentWeek
        setcurrentweek(2);

        //set the currentDay
        setcurrentday("05/12/2019");
        
        //  set the suggestion
        FetchCalls.getSuggestions.then(suggestions => {
            let currSugg = suggestions[Math.floor(Math.random() * suggestions.length)];
                setcurrentsuggestion(currSugg);
        });

        // set todays deliverables (match today's date) and thisweeks deliverables( match the term and weeknum )
        FetchCalls.getDeliverables
            .then(deliverables => {
                let todayDeliverables = [];
                deliverables.forEach(deliverable => {
                    todayDeliverables.push({
                        dueDate: "05/08/2019"
                    })
                })
                settodaydeliverables(todayDeliverables);
            })
            .then(deliverables => {
            // QUESTION: trying to get only the deliverables that match the term in the state and the weekNum in the state
                let thisWeekDeliverables = [];
                deliverables.forEach(deliverable => {
                    thisWeekDeliverables.push({
                        termDesc: deliverable.termDesc,
                        weekNum: deliverable.weekNum
                    });
                });
                setthisweekdeliverables(thisWeekDeliverables);
            })
            setloading(false);
    },[loading]);
/*
    if (!AuthCalls.getCurrentUsername()) {
        alert("Please login first");
        //history.replace("/login");
        return null;
    }
*/
    return (
        <main>
            <NavBar {...props} />
            <div className="container">
                <h2>My Dashboard</h2>
                <h3> Your are working with {currentterm} term and week number {currentweek}</h3>

                <div className="skills-suggestion">
                    <ul className="suggestion-details">
                        <li className="item category">A Suggestion from the {currentsuggestion.category} category</li>
                        <li className="item desc">{currentsuggestion.desc}</li>
                        <li className="item credit">~ {currentsuggestion.credit}</li>
                    </ul>
                </div>
                </div>
                <div className="title">
                <p>Deliverables Due Today, Week {currentday}</p>
                    {todaydeliverables.map((deliverable, index) => (
                        <div key={index} className="deliverable">
                                <div className="item courseName">{deliverable.courseName}</div>
                                <div className="item termDesc">{deliverable.termDesc}</div>
                                <div className="item weekNum">{deliverable.weekNum}</div>
                                <div className="item dueDate">{deliverable.dueDate}</div>
                                <div className="item pressure">{deliverable.pressure}</div>
                                <div className="item prephrs">{deliverable.prephrs}</div>
                                <div className="item deliverableName">{deliverable.deliverableName}</div>
                                <div className="item desc">{deliverable.desc}</div> 
                                {/*<EditBtns type="deliverable" />  */}
                        </div>
                    ))}
                </div>
                <div className="title">
                <p>Deliverables Due This Week, Week {currentweek}</p>
                    {thisweekdeliverables.map((deliverable, index) => (
                        <div key={index} className="deliverable">
                                <div className="item courseName">{deliverable.courseName}</div>
                                <div className="item termDesc">{deliverable.termDesc}</div>
                                <div className="item weekNum">{deliverable.weekNum}</div>
                                <div className="item dueDate">{deliverable.dueDate}</div>
                                <div className="item pressure">{deliverable.pressure}</div>
                                <div className="item prephrs">{deliverable.prephrs}</div>
                                <div className="item deliverableName">{deliverable.deliverableName}</div>
                                <div className="item desc">{deliverable.desc}</div> 
                                {/*<EditBtns type="deliverable" />  */}
                        </div>
                    ))}
                </div>
                <div className="review-and-plan">
                    <h3>Review Last Week and Plan for Next Week</h3>
                    <Link to="/reviewcurrentweek">Review Last Week</Link>
                    <Link to="/plannextweek">Plan Next Week</Link>
                </div>
        </main>
    );

}


export default Dashboard;
       