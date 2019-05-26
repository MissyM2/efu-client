import React from 'react';
import NavBar from "./navbar";

import {API_BASE_URL} from '../config';


export default class PlanNextWeek extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        course: "",
                        deliverable: "",

                }
        }

        addDeliverable(e) {
                e.preventDefault();
                let newDeliverable = {
                        dueDate: this.props.dueDate,
                        deliverableName: this.props.deliverableName,
                        pressure: this.props.pressure,
                        desc: this.props.desc,
                        prephrs: this.props.prephrs
                };
               
                fetch(`${API_BASE_URL}/deliverables`, {
                        method: 'POST',
                        headers: {
                                // Provide our auth token as credentials
                                Authorization: `Bearer ${this.state.authToken}`,
                                "Content-Type": 'application/json'
                        },
                        body: JSON.stringify(newDeliverable)
                        })
                .then(response => {
                        if(response.ok) {
                                return response.json()
                        }
                        throw new Error(response.text)
                        })
                .then(({deliverable}) => {
                        console.log(deliverable)
                        return deliverable;
                })
                .catch((err) => {
                        console.log(err);
                });

                    
        }

         //    {courseDels}
        render() {
                return (
                        <main>
                                <NavBar {...this.props} />
                                <div className="container">
                                        <h2>Plan for Next Week, Week Number {this.props.nextweek}</h2>
                                        <div className="courses-deliverables">
                                                <ul className="list-horizontal">
                                                        {this.props.currentcourses
                                                                .filter((course) => {
                                                                        return course.week === this.props.currentweek;
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
                                        <form onSubmit={this.props.submitadddeliverable}>
                                                <div>
                                                        <input 
                                                        placeholder="duedate"
                                                        type="date"
                                                        name="duedate"
                                                        aria-label="duedate"
                                                        />
                                                         <input 
                                                        placeholder="deliverable-name"
                                                        type="text"
                                                        name="deliverable-name"
                                                        aria-label="deliverable-name"
                                                        />
                                                         <input 
                                                        placeholder="pressure"
                                                        type="text"
                                                        name="pressure"
                                                        aria-label="pressure"
                                                        />
                                                         <input 
                                                        placeholder="deliverable-desc"
                                                        type="text"
                                                        name="deliverable-desc"
                                                        aria-label="deliverable-desc"
                                                        />
                                                         <input 
                                                        placeholder="prephrs"
                                                        type="number"
                                                        name="prephrs"
                                                        aria-label="prephrs"
                                                        />
                                                </div>
                                                <button
                                                        type="submit"
                                                        className="btn is-primary"
                                                >
                                                        Add Deliverable
                                                </button>
                                        </form>   
                                </div>
                        </main>
                        
                );


        }       
               
        
}
