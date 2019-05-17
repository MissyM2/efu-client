import React from 'react';
import './css/dashboard.css';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

import NavBar from "./navbar"




//import ReviewCurrentWeek from './review-current-week';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentterm:"",
            currentweek: "",
            currentdate:"",
            nextweek: "",
            currentsuggestion:[],
            terms: [],
            currentcourses: [],
            currentweeks: [],
            todaydeliverables:[],
            thisweekdeliverables:[],
            error: null,
            loading:false

        }
        this.authToken=localStorage.getItem('authToken');
        this.getCurrentSuggestion = this.getCurrentSuggestion.bind(this);
        this.getCurrentTerms = this.getCurrentTerms.bind(this);
        this.getCurrentCourses = this.getCurrentCourses.bind(this);
        this.getCurrentWeeks = this.getCurrentWeeks.bind(this);
        this.getDeliverables = this.getDeliverables.bind(this);
        this.getCurrentDate = this.getCurrentDate.bind(this)
    }

    componentDidMount() {
        this.setState({
            error: null,
            loading: true,
            currentterm: "Spring, 2019",
            currentweek: 2,
            nextweek: this.state.currentweek + 1,
        });
        this.getCurrentSuggestion();
        this.getCurrentTerms();
        this.getCurrentCourses();
        this.getCurrentWeeks();
        this.getDeliverables(); 
        this.getCurrentDate(); 
}

        getCurrentSuggestion() {
            fetch(`${API_BASE_URL}/suggestions`, {
                method: 'GET',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${this.authToken}`
                }
            })
            .then(response => {
                if(response.ok) {
                        return response.json()
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {
                const tempsuggestion = responseJSON[Math.floor(Math.random() * responseJSON.length)];
                this.setState({
                    currentsuggestion: tempsuggestion
                });
            })
            .catch((err) => {
                console.log(err);
            });

            


        }
        getCurrentTerms() {
            fetch(`${API_BASE_URL}/terms`, {
                method: 'GET',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${this.authToken}`
                    }
            })
            .then(response => {
                if(response.ok) {
                        return response.json()
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {
                this.setState({
                    terms: responseJSON
                });
                //console.log('currentterms are ', this.state.terms);
            })
            .catch((err) => {
                console.log(err);
            });
        }

        getCurrentCourses() {
            fetch(`${API_BASE_URL}/courses`, {
                method: 'GET',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${this.authToken}`
                    }
            })
            .then(response => {
                if(response.ok) {
                        return response.json()
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {
                const tempcourses = responseJSON.filter(course => {
                        return course.termDesc === this.state.currentterm;
                });
                this.setState({
                    currentcourses: tempcourses
                });
                //console.log('currentcourses is ', this.state.currentcourses);
            })
            .catch((err) => {
                console.log(err);
            });
        }

        getCurrentWeeks() {
            fetch(`${API_BASE_URL}/weeks`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                    }
            })
            .then(response => {
                if(response.ok) {
                        return response.json()
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {
                const tempweeks = responseJSON.filter(week => {
                    return week.termDesc === this.state.currentterm;
                });
                this.setState({
                    currentweeks: tempweeks
                });
                //console.log('currentweeks is ', this.state.currentweeks);
            })
            .catch((err) => {
                console.log(err);
            });
        }

         getDeliverables() {
            fetch(`${API_BASE_URL}/deliverables`, {
                method: 'GET',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${this.authToken}`
                }
            })
            .then(response => {
                if(response.ok) {
                        return response.json()
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {

                console.log('deliverables responseJSON ', responseJSON);
                const temptodaydeliverables = responseJSON.filter(deliverable => {
                        return deliverable.termDesc === this.state.currentterm && deliverable.dueDate === this.state.currentdate;
                });
                this.setState({
                    todaydeliverables: temptodaydeliverables
                });
                const tempweekdeliverables = responseJSON.filter(deliverable => {
                    return deliverable.termDesc === this.state.currentterm && deliverable.weekNum === this.state.currentweek;
                }); 
                this.setState({
                    thisweekdeliverables: tempweekdeliverables
                });
            })
            .catch((err) => {
                console.log(err);
            });

         }

         getCurrentDate = () => {
            let newDate = new Date();
            console.log('newDate', newDate);
            let newDay = newDate.getDate();
            console.log('newDay', newDay);
            let newMonth = newDate.getMonth() + 1;
            console.log('newMonth', newMonth);
            let newYear = newDate.getFullYear();
            console.log('newYear', newYear);
            let todayDate =`${newYear} - ${newMonth<10?`0${newMonth}`:`${newMonth}`} - ${newDay}`;
            console.log('todayDate is ', todayDate);
            this.setState({
                currentdate: todayDate
            });
            
        }
        
        
              /*

        how about the loading thing?
            if (!AuthCalls.getCurrentUsername()) {
                alert("Please login first");
                //history.replace("/login");
                return null;
            }*/ 
    render() {

        //const {suggestion, loading} = this.state;
        //if (error) {
        //    return <p>{error.message}</p>
        //}

        //if (loading) {
       //     return <p>Loading ...</p>
        //}
        //console.log('thisweekdeliverables ', this.state.thisweekdeliverables);
            return (
                <div> 
                    <NavBar {...this.state}/>
                     <div className="container">
                        <h2>My Dashboard</h2>
                        <div className="list-horizontal">
                                <Link className="item button is-primary" 
                                    to={{
                                        pathname: '/weeks', 
                                        state: {
                                            currentweeks: this.state.currentweeks,
                                            currentterm: this.state.currentterm
                                        },
                                    }} >
                                            weeks
                                </Link>
                               <Link 
                                    className="item button is-primary" 
                                    to={{
                                        pathname: '/profile', 
                                        state: { 
                                            terms: this.state.terms,
                                            currentcourses: this.state.currentcourses, 
                                            currentweeks: this.state.currentweeks,
                                            currentterm: this.state.currentterm
                                        },
                                        getcurrentterms:this.getCurrentTerms
                                    }}
                                    > 
                                        profile
                                </Link> 
                        </div>
                       
                        <h3> Your are working with {this.state.currentterm} term and week number {this.state.currentweek}</h3>

                      <ul className="skills-suggestion"> 
                                <li >
                                    <div>{this.state.currentsuggestion.category}</div>
                                    <div>{this.state.currentsuggestion.desc}</div>
                                    <div>~ {this.state.currentsuggestion.credit}</div>
                                </li>
                          </ul> 
                        <div className="today-deliverables">
                            <p className="subtitle">Deliverables Due Today, {this.state.currentdate}</p>
                            <div className="list-horizontal week-list-labels">
                                    <div className="item-label weeknum">Week Number</div>
                                    <div className="item-label dueDate">Due Date</div>
                                    <div className="item-label pressure">Pressure</div>
                                    <div className="item-label prehrs">Prep Hours</div>
                                    <div className="item-label deliverableName">Item Name</div>
                                    <div className="item-label desc">Notes</div>
                            </div>
                            <div>
                                {this.state.todaydeliverables
                                .map((deliverable, index) => {
                                    return (
                                        <div key={index} className="list-horizontal deliverable">
                                                <div className="item courseName">{deliverable.courseName}</div>
                                                <div className="item dueDate">{deliverable.dueDate}</div>
                                                <div className="item pressure">{deliverable.pressure}</div>
                                                <div className="item prephrs">{deliverable.prephrs}</div>
                                                <div className="item deliverableName">{deliverable.deliverableName}</div>
                                                <div className="item desc">{deliverable.desc}</div> 
                                        </div>
                                    );
                                })}
                            </div>
                                
                        </div>
                        <div className="this-week-deliverables">
                            <p className="subtitle">Deliverables Due This Week, Week {this.state.currentweek}</p>
                            <div className="list-horizontal week-list-labels">
                                                <div className="item-label weeknum">Week Number</div>
                                                <div className="item-label dueDate">Due Date</div>
                                                <div className="item-label pressure">Pressure</div>
                                                <div className="item-label prehrs">Prep Hours</div>
                                                <div className="item-label deliverableName">Item Name</div>
                                                <div className="item-label desc">Notes</div>
                                        </div>
                                    <div>
                            </div>
                            <div>
                                {this.state.thisweekdeliverables
                                        .map((deliverable, index) => {
                                            return (
                                                <div key={index} className="list-horizontal deliverable">
                                                        <div className="item courseName">{deliverable.courseName}</div>
                                                        <div className="item dueDate">{deliverable.dueDate}</div>
                                                        <div className="item pressure">{deliverable.pressure}</div>
                                                        <div className="item prephrs">{deliverable.prephrs}</div>
                                                        <div className="item deliverableName">{deliverable.deliverableName}</div>
                                                        <div className="item desc">{deliverable.desc}</div> 
                                                </div>
                                            );
                                    })}

                            </div>  
                        </div>
                        <div className="review-and-plan">
                            <p className="subtitle">Review Last Week and Plan for Next Week</p>
                            <div className="list-horizontal">
                            
                                    <Link
                                        className="item button is-primary"
                                        to={{
                                            pathname: "/reviewcurrentweek",
                                            state: {
                                                currentweek: this.state.currentweek
                                            }
                                        }}>
                                            Review Last Week
                                    </Link>
                                    <Link 
                                        className="item button is-primary"
                                        to={{
                                            pathname: "/plannextweek",
                                            state: {
                                                currentcourses: this.state.currentcourses
                                            }
                                        }}>
                                            Plan Next Week
                                        </Link>
                            </div>
                        </div>
                    </div>
                </div> 


                
            );
    }
}
