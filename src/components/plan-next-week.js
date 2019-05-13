import React, { useEffect, useState } from 'react';
import NavBar from "./navbar";

import { FetchCalls } from "../fetch-calls";
//import { AuthCalls } from "../auth-calls";

const PlanNextWeek = props => {
        const [currentterm, setcurrentterm] = useState("");
        const [currentweek, setcurrentweek] = useState();
        const [nextweek, setnextweek] = useState();
        const [currentday, setcurrentday] = useState("");
        const [course, setcourse] = useState("");
        const [deliverable, setdeliverable] = useState("");
        const [currentcourses, setcurrentcourses] = useState("");
        const [currentdeliverables, setcurrentdeliverables] = useState("");
        const [loading, setloading] = useState([]);

        useEffect(() => {
                // set the currentTerm
                setcurrentterm("Spring, 2019");

                //set the currentWeek
                setcurrentweek(2);

                //set the currentWeek
                setnextweek({currentweek} + 1);
        
                //set the currentDay
                setcurrentday("05/12/2019");

                FetchCalls.getDeliverables.then(deliverables => {
                        let mydeliverables = [];
                        deliverables
                                .filter(deliverables => {
                                        return deliverables.termDesc = {currentterm}
                                })
                                .forEach(deliverable => {
                                        return mydeliverables.push({
                                                dueDate: deliverable.dueDate,
                                                deliverableName: deliverable.deliverableName,
                                                pressure: deliverable.pressure,
                                                desc: deliverable.desc,
                                                prephrs: deliverable.prephrs
                                        })
                                });
                        setcurrentdeliverables(mydeliverables);
                });
       
        });

        async function addDeliverable() {
                try {
                    await FetchCalls.addDeliverable({
                        term: {currentterm},
                        currentweek
                    });
                    // set current weeks to include this week and show
                } catch (error) {
                    alert(error.message);
                }
            }

                
                //    {courseDels}
        return (
                <main>
                        <NavBar {...props} />
                        <div className="container">
                                <h2>Plan for Next Week, Week Number {nextweek}</h2>
                                <div className="courses-deliverables">
                                        <ul className="list-horizontal">
                                                { currentcourses
                                                        .filter((course) => {
                                                                return course.term === currentterm && course.week === {currentweek};
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
                                </div>
                                <hr />
                                <form onSubmit={e => e.preventDefault() && false}>
                                        <div>
                                                <input 
                                                placeholder="deliverable"
                                                type="text"
                                                value={deliverable}
                                                aria-label="deliverable"
                                                onChange={e => setdeliverable(e.target.value)}
                                                />
                                        </div>
                                        <button
                                                type="submit"
                                                className="button is-primary"
                                                onClick={addDeliverable}
                                        >
                                                Add Deliverable
                                        </button>
                                </form>   
                        </div>
                </main>
                
        );
}

export default PlanNextWeek;