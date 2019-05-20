import React from 'react';
import './css/dashboard.css';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

import NavBar from "./navbar"




//import ReviewCurrentWeek from './review-current-week';

export default class Dashboard extends React.Component {
    /*
    constructor(props) {
        super(props);
        this.state = {
            currentterm:"",
            currentweek: "",
            currentweekdetails:[],
            currentdate:"",
            nextweek: "",
            currentsuggestion:[],
            terms: [],
            currentcourses: [],
            currentgrades:[],
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
        this.getCurrentGrades = this.getCurrentGrades.bind(this)
        this.getCurrentDate = this.getCurrentDate.bind(this);
        
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
        this.getCurrentGrades();
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

        getCurrentGrades() {
            fetch(`${API_BASE_URL}/grades`, {
                method: 'GET',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${this.authToken}`
                    }
            })
            .then(response => {
                console.log('response is', response);
                if(response.ok) {
                        return response.json()
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {
                console.log('responseJSON', responseJSON);
                const tempgrades = responseJSON.filter(grade => {
                        return grade.term === this.state.currentterm && grade.week === this.state.currentweek;
                });
                console.log('tempgrades', tempgrades);
                this.setState({
                    currentgrades: tempgrades
                });
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
                const thisweek = responseJSON.filter(week => {
                    return week.termDesc === this.state.currentterm && week.weekNum ===this.state.currentweek;
                });
                this.setState({
                    currentweeks: tempweeks,
                    currentweekdetails: thisweek
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
            let newDay = newDate.getDate();
            let newMonth = newDate.getMonth() + 1;
            let newYear = newDate.getFullYear();
            let todayDate =`${newYear} - ${newMonth<10?`0${newMonth}`:`${newMonth}`} - ${newDay}`;
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
        console.log('this.state in dashboard', this.state);
        console.log('this.props in dashboard', this.props);
        //console.log('this.props.location.state.', this.props.location.state);

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
                    <NavBar />
                     <div className="container">
                        <h2>My Dashboard</h2>
                       
                        <h3> Your are working with {this.props.location.state.currentterm} term and week number {this.props.location.state.currentweek}</h3>

                      <ul className="accent skills-suggestion"> 
                                <li >
                                    <div>{this.props.location.state.currentsuggestion.category}</div>
                                    <div>{this.props.location.state.currentsuggestion.desc}</div>
                                    <div>~ {this.props.location.state.currentsuggestion.credit}</div>
                                </li>
                          </ul> 
                        <div className="today-deliverables">
                            <div className="section-label">Deliverables Due Today, {this.props.location.state.currentdate}</div>
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
                            <div className="section-label">Deliverables Due This Week, Week {this.props.location.state.currentweek}</div>
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
                                {this.props.location.state.thisweekdeliverables
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
                            <div className="section-label">Review Last Week and Plan for Next Week</div>
                            <div className="list-horizontal section-body">
                            
                                    <Link
                                        className="item btn is-primary"
                                        to={{
                                            pathname: "/reviewcurrentweek",
                                            state: {
                                                currentterm: this.props.location.state.currentterm,
                                                currentweek: this.props.location.state.currentweek,
                                                currentweekdetails: this.props.location.state.currentweekdetails,
                                                currentcourses: this.props.location.state.currentcourses
                                            }
                                        }}>
                                            Review Last Week
                                    </Link>
                                    <Link 
                                        className="item btn is-primary"
                                        to={{
                                            pathname: "/plannextweek",
                                            state: {
                                                currentcourses: this.props.location.state.currentcourses
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
