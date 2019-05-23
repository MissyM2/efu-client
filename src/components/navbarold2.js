import React from 'react';

import { API_BASE_URL } from '../config';

import './css/navbar.css';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            currentusername: "",
            currentdate:"",
            currentterm:"",
            currentweek: "",
            currentweekdetails:[],
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
       // this.authToken=localStorage.getItem('authToken');
        //this.getCurrentUsername = this.getCurrentUsername.bind(this);
        //this.getCurrentSuggestion = this.getCurrentSuggestion.bind(this);
       // this.getCurrentTerms = this.getCurrentTerms.bind(this);
      //  this.getCurrentCourses = this.getCurrentCourses.bind(this);
      //  this.getCurrentWeeks = this.getCurrentWeeks.bind(this);
      //  this.getDeliverables = this.getDeliverables.bind(this);
      //  this.getCurrentGrades = this.getCurrentGrades.bind(this)
       // this.getCurrentDate = this.getCurrentDate.bind(this);
        
    }

    componentDidMount() {
       // console.log('navbar: this props', this.props);
       // console.log('navbar:this props.location look at  logged in ', this.props.location);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('navbar: inside shouldComponentUpdate: this.state.loggedIn', this.state.loggedIn);
        console.log('navbar: inside shouldComponentUpdate: nextState.loggedIn', nextState.loggedIn);
        console.log('navbar: inside shouldComponentUpdate: this.props.loggedIn', this.state.loggedIn);
        console.log('navbar: inside shouldComponentUpdate: nextProps.loggedIn', nextProps.loggedIn);
        console.log('navbar: inside shouldComponentUpdate: this.state.loggedIn', this.state.loggedIn);
        return this.state.loggedIn != nextState.loggedIn;

           console.log('navbar: this.state', this.state);
        console.log('navbar: this.state.loggedIn != nextState.loggedIn', this.state.value != nextState.value);
    }
         /*
      
        if (nextProps.loggedIn) {
           // console.log('this.getCurrentUsername componentDidMount Navbar', this.state.username);
            this.setState({
                loggedIn: true,
                error: null,
                loading: true,
                currentterm: "Spring, 2019",
                currentweek: 2,
                nextweek: this.state.currentweek + 1,
            });
            
        }
        
        
   
       
            this.getCurrentSuggestion();
            this.getCurrentTerms();
            this.getCurrentCourses();
            this.getCurrentWeeks();
            this.getCurrentGrades();
            this.getDeliverables(); 
            this.getCurrentDate(); 
        } else {
            console.log('navbar: within componentDidMount, did not get data/no one is logged in');
        }
       
}

    getCurrentUsername() {
        const username = localStorage.getItem('username');
        console.log('got user name', username);
        console.log('is username !== true or false', username !== null);
        if (username !== null) {
            this.setState({
                currentusername: username,
            });
            this.setState ({
                currentUser: true
            })
        }
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

    logout(e) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
    }

*/
    render(){
        
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <p>this is a test</p>

            
    
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            {this.props.loggedIn !== true ? (
                                <div className="list-horizontal buttons">
                                    <Link className="item btn is-primary" to="/registration">
                                        <strong>Sign up</strong>
                                    </Link>
                                    <Link className="item btn is-light" to="/login">
                                        Log in
                                    </Link>
                                </div>
                            ) : (
                                <div className="list-horizontal buttons">
                                    <div>This is a test  should be logged in</div>
                                    
                                    {/*
                                    <Link className="item btn is-primary dashboard" to="/dashboard">
                                        to={{
                                                pathname: '/dashboard', 
                                                state: {
                                                    currentterm: this.props.currentterm,
                                                    currentweek: this.props.currentweek,
                                                    todaydeliverables:this.props.todaydeliverables,
                                                    thisweekdeliverables: this.props.thisweekdeliverables
                                                },
                                            }} >
                                            <strong>Dashboard</strong>
                                    </Link>
                                    <div className="list-horizontal">
                                    <Link className="item btn is-primary" 
                                        to={{
                                            pathname: '/weeks', 
                                            state: {
                                                currentterm: this.props.currentterm,
                                                currentweeks: this.props.currentweeks,
                                                currentcourses: this.props.currentcourses,
                                                currentgrades: this.props.currentgrades,
                                            },
                                        }} >
                                                weeks
                                    </Link>
                                    <Link 
                                        className="item btn is-primary" 
                                        to={{
                                            pathname: '/profile', 
                                            state: { 
                                                currentterm: this.props.currentterm,
                                                terms: this.props.terms,
                                                currentcourses: this.props.currentcourses, 
                                                currentweeks: this.props.currentweeks
                                            }
                                        }}
                                        submitaddterm={this.submitAddTerm}
                                        submitaddcourse={this.submitAddCourse}
                                        submitaddweek={this.submitAddWeek}
                                        >
                                            profile
                                    </Link>
                                
                                </div>
                                <Link className="item btn is-light" onClick={this.logout} to="/login">
                                    Log out
                                </Link>
                                    <a className="item btn is-light logout" href="/logout" onClick={this.logout}>
                                        Log out
                                    </a> 
                                </div>*/}
                            )} 
                        </div>
                    </div>
                </div>
                
            </nav>
        );


    }

    
}




    
   