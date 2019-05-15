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
            currentday:"05/04/2019",
            nextweek: "",
            currentsuggestion:"",
            terms: [],
            currentcourses: [],
            currentweeks: [],
            todaydeliverables:[],
            thisweekdeliverables:[],
            error: null,
            loading:false

        }
        this.authToken=localStorage.getItem('authToken');
       // this.getCurrentDate = this.getCurrentDate.bind(this)
    }

    componentDidMount() {
        this.setState({
            error: null,
            loading: true,
            currentterm: "Spring, 2019",
            currentweek: 2,
            nextweek: this.state.currentweek + 1,
        });
        console.log('authToken is ', this.authToken);


        //get suggestions
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
            console.log('currentsuggestion is ', this.state.currentsuggestion);
        })
        .catch((err) => {
            console.log(err);
        });

        //get terms
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
            console.log('currentterms are ', this.state.terms);
        })
        .catch((err) => {
            console.log(err);
        });

        //get courses

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
                    return course.term === this.state.currentterm;
            });
            this.setState({
                currentcourses: tempcourses
            });
            console.log('currentcourses is ', this.state.currentcourses);
        })
        .catch((err) => {
            console.log(err);
        });

        //get weeks

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
            console.log('currentweeks is ', this.state.currentweeks);
        })
        .catch((err) => {
            console.log(err);
        });

        //get deliverables

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
                    return deliverable.termDesc === this.state.currentterm;
            });
            this.setState({
                todaydeliverables: temptodaydeliverables
            });
            console.log('todaydeliverables is ', this.state.todaydeliverables);
            const tempweekdeliverables = responseJSON.filter(deliverable => {
                return deliverable.termDesc === this.state.currentterm && deliverable.weekNum === this.state.currentweek;
            });
            this.setState({
                weekdeliverables: tempweekdeliverables
            });
            console.log('weekdeliverables is ', this.state.weekdeliverables);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    
    getCurrentDate(separator=''){
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`;
    }
    
    submitAddTerm = (newterm) => {
            fetch(`${API_BASE_URL}/terms`, {
                method: 'POST',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${this.authToken}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(newterm)
                })
                .then(response => {
                    if(response.ok){
                        return response.json();
                    }
                    throw new Error(response.text)
                })
                .then(responseJSON => {
                    this.setState({
                        terms: [...this.state.terms, {responseJSON}]
                    });
                })   
                .catch((err) => {
                    console.log(err);
                });
    }

    submitAddCourse =(newcourse) => {
        fetch(`${API_BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newcourse)
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.text)
        })
        .then(responseJSON =>  {
            this.setState({
                currentcourses: [...this.props.currentcourses, {responseJSON}]
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    submitAddWeek = (newweek) => {
        fetch(`${API_BASE_URL}/weeks`, {
            method: 'POST',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newweek)
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.text)
        })
        .then((responseJSON) => {
            //QUESTION:  WHAT DO I RETURN?
            //this.setState({
            //    currentweeks: [...this.state.currentweeks], {newweek}]
            //});
        })
        .catch((err) => {
            console.log(err);
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
            return (
                <div> 
                    <NavBar />
                     <div className="container">
                        <h2>My Dashboard</h2>
                       <Link className="button is-primary" to={{
                           pathname: "/weeks",
                           state: {
                               currentweeks: this.state.currentweeks
                           }}}>
                                    weeks
                        </Link>
                        <Link 
                            className="button is-primary" 
                            to={{
                                pathname: '/profile', 
                                state: { 
                                    terms: this.state.terms,
                                    currentcourses: this.state.currentcourses, 
                                    currentweeks: this.state.currentweeks
                                }
                            }}
                            //submitAddTerm={this.submitAddTerm}
                            //submitAddCourse={this.submitAddCourse}
                           // submitAddWeek={this.submitAddWeek}
                            >
                                profile
                        </Link>
                        <h3> Your are working with {this.state.currentterm} term and week number {this.state.currentweek}</h3>

                     {/*}   <ul className="skills-suggestion">
                            {this.state.currentsuggestion.map(currentsuggestion =>  
                                <li key={currentsuggestion.objectID}>
                                    <div>{currentsuggestion.category}</div>
                                    <div>{currentsuggestion.desc}</div>
                                    <div>~ {currentsuggestion.credit}</div>
                                </li>
                                )}
                        
                            </ul>
                            */}
                        <div className="today-deliverables">
                            <p>Deliverables Due Today, {this.state.currentday}</p>
                                {this.state.todaydeliverables.map((deliverable, index) => (
                                    <div key={index} className="list-horizontal deliverable">
                                            <div className="item courseName">{deliverable.courseName}</div>
                                            <div className="item termDesc">{deliverable.termDesc}</div>
                                            <div className="item weekNum">{deliverable.weekNum}</div>
                                            <div className="item dueDate">{deliverable.dueDate}</div>
                                            <div className="item pressure">{deliverable.pressure}</div>
                                            <div className="item prephrs">{deliverable.prephrs}</div>
                                            <div className="item deliverableName">{deliverable.deliverableName}</div>
                                            <div className="item desc">{deliverable.desc}</div> 
                                    </div>
                                ))}
                        </div>
                        <div className="this-week-deliverables">
                            <p>Deliverables Due This Week, Week {this.state.currentweek}</p>
                                {this.state.thisweekdeliverables.map((deliverable, index) => (
                                    <div key={index} className="list-horizontal deliverable">
                                            <div className="item courseName">{deliverable.courseName}</div>
                                            <div className="item termDesc">{deliverable.termDesc}</div>
                                            <div className="item weekNum">{deliverable.weekNum}</div>
                                            <div className="item dueDate">{deliverable.dueDate}</div>
                                            <div className="item pressure">{deliverable.pressure}</div>
                                            <div className="item prephrs">{deliverable.prephrs}</div>
                                            <div className="item deliverableName">{deliverable.deliverableName}</div>
                                            <div className="item desc">{deliverable.desc}</div> 
                                    </div>
                                ))}
                        </div>
                        <div className="review-and-plan">
                            <h3>Review Last Week and Plan for Next Week</h3>
                            <Link 
                                className="button is-primary"
                                to={{
                                    pathname: "/reviewcurrentweek",
                                    state: {
                                        currentweek: this.state.currentweek
                                    }
                                }}>
                                    Review Last Week
                            </Link>
                            <Link 
                                className="button is-primary"
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


                
            );
    }
}
