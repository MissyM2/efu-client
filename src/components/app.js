import React from 'react';
import { withRouter, Route} from 'react-router-dom';

import { API_BASE_URL } from '../config';
import HomePage from './home-page';
import NavBar from './navbar';
import Dashboard from './dashboard';
import Profile from './profile';
import RegistrationPage from './registration-page';

import './css/app.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            authToken:'',
            loggedIn: false,
            currentusername:'',
            password: '',
            currentweek: "",
            currentweekdetails:[],
            currentdate:"",
            currentterm: "",
            nextweek: "",
            currentsuggestion:[],
            terms:[],
            currentweek: 0,
            nextweek: this.currentweek + 1,
            currentcourses: [],
            currentgrades:[],
            currentweeks: [],
            todaydeliverables:[],
            thisweekdeliverables:[],
            error: null,
            loading:false
        }
        this.submitLogin = this.submitLogin.bind(this);
        this.getCurrentTerms=this.getCurrentTerms.bind(this);
        this.getCurrentSuggestion=this.getCurrentSuggestion.bind(this);
        this.getCurrentCourses=this.getCurrentCourses.bind(this);
        this.getCurrentGrades=this.getCurrentGrades.bind(this);
        this.getCurrentWeeks=this.getCurrentWeeks.bind(this);
        this.getCurrentDeliverables=this.getCurrentDeliverables.bind(this);
        this.getCurrentDate=this.getCurrentDate.bind(this);
        this.submitAddTerm=this.submitAddTerm.bind(this);
        this.submitAddCourse=this.submitAddCourse.bind(this);
        this.submitAddWeek=this.submitAddWeek.bind(this);
        this.submitDeleteCourse=this.submitDeleteCourse.bind(this);
        this.submitDeleteWeek=this.submitDeleteWeek.bind(this);
        this.submitUpdateCourse=this.submitUpdateCourse.bind(this);
        this.submitUpdateWeek=this.submitUpdateWeek.bind(this);
    }

    //renderRedirect = (newPath) => {
   //     window.location.href = newPath;
    //}

    submitLogin(username, password) {
        console.log('app: username', username);
        console.log('app: password', password);

        const registereduser = {
            username: username,
            password: password
        }
        console.log('registereduser ', registereduser);

        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registereduser)
        })
        .then(response => {
            if(response.ok){
                console.log('app: after response.ok loggedIn', this.state.loggedIn);
                return response.json();
            }
        })
        .then(responseJSON => {
            this.setState({
                currentusername: username,
                password: password,
                loggedIn: true,
                error: null,
                loading: true,
                currentterm: "Spring, 2019",
                currentweek: 2,
                nextweek: this.state.currentweek + 1,
                authToken: responseJSON.authToken
            })

            this.props.history.push('/dashboard');
            
            //this.renderRedirect('/dashboard');
            
/*
            this.state.history.push({
                pathname:"/dashboard",
                state:{
                    username: username,
                    password: password,
                    loggedIn: true,
                    error: null,
                    loading: true,
                    currentterm: "Spring, 2019",
                    currentweek: 2,
                    nextweek: this.state.currentweek + 1
                 }
               });
               console.log('app: this.state', this.state);

*/
        }) 
        
    }

    getCurrentTerms() {
        console.log('getCurrentTerms executing');
        fetch(`${API_BASE_URL}/terms`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.state.authToken}`
                }
        })
        .then(response => {
            console.log('inside getCurrentTerms, response', response);
            if(response.ok) {
                    return response.json()
            }
            throw new Error(response.text)
        })
        .then(responseJSON => {
            console.log('inside getCurrentTerms, responseJSON', responseJSON);
            this.setState({
                terms: responseJSON
            });
            //console.log('currentterms are ', this.state.terms);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getCurrentSuggestion() {
        fetch(`${API_BASE_URL}/suggestions`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.state.authToken}`
            }
        })
        .then(response => {
            console.log('getCurrentSuggestion, response', response);
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

    getCurrentCourses() {
        fetch(`${API_BASE_URL}/courses`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.state.authToken}`
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
                Authorization: `Bearer ${this.state.authToken}`
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
                Authorization: `Bearer ${this.state.authToken}`
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

    getCurrentDeliverables() {
        fetch(`${API_BASE_URL}/deliverables`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.state.authToken}`
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

// adds, updates and deletes for profile

    submitAddTerm = (newterm) => {
        console.log('made it to  submitAddTerm', newterm);
            fetch(`${API_BASE_URL}/terms`, {
                method: 'POST',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${this.state.authToken}`,
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
                    console.log('responseJSON looks like ', responseJSON);
                    this.setState((responseJSON) => ({
                        terms: [...this.state.terms, responseJSON]
                    }));
                    console.log(this.state);
                    return responseJSON;
                })   
                .catch((err) => {
                    console.log(err);
                });
    }
         
    submitAddCourse = (newcourse) => {
        console.log('made it to exec submitAddCourse, here is the newCourse ', newcourse);
        fetch(`${API_BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.state.authToken}`,
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
                currentcourses: [...this.state.currentcourses, responseJSON]
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
                Authorization: `Bearer ${this.state.authToken}`,
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
        .then(responseJSON =>  {
            this.setState({
                weeks: [...this.state.weeks, responseJSON]
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }
        
    submitDeleteCourse = (selectedCourse) => {
        console.log('app: this.state', this.state);
        console.log('app: delete course');
        fetch(`${API_BASE_URL}/courses`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${this.state.authToken}`,
                    'Content-Type': 'application/json'},
                body: JSON.stringify(selectedCourse)
            })
            .then(response => {
                console.log('deletecourse response', response);
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
            })
            .catch((err) => {
                console.log(err);
            });
    }
        
    submitDeleteWeek = (selectedweek) => {
        console.log('made it to delete Week selectedweek ', selectedweek)
        fetch(`${API_BASE_URL}/weeks`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${this.state.authToken}`,
                    'Content-Type': 'application/json'},
                body: JSON.stringify(selectedweek)
            })
            .then(response => {
                console.log('response', response);
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
                    weeks: tempweeks
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
        
    submitUpdateCourse = (updatedcourse) => {
        fetch(`${API_BASE_URL}/courses`, {
            method: 'PUT',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.state.authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(updatedcourse)
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.text)
        })
        .then(responseJSON =>  {
                const tempcourses = responseJSON.filter(course => {
                    return course.termDesc === this.state.currentterm;
                });
                this.setState({
                    currentcourses: tempcourses
                });
        })
        .catch((err) => {
            console.log(err);
        });
    }
        
    submitUpdateWeek = (updatedweek) => {
        console.log('app: updated week', updatedweek);
        fetch(`${API_BASE_URL}/weeks`, {
            method: 'PUT',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.state.authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(updatedweek)
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.text)
        })
        .then(responseJSON =>  {
            const tempweeks = responseJSON.filter(week => {
                return week.termDesc === this.state.currentterm && week.weekNum === this.state.currentweek;
            });
            this.setState({
                weeks: tempweeks
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }
        
    getSelectedTerm(selTerm){
        this.setState({
            currentterm: selTerm
        });
        document.getElementById(selTerm).setAttribute("class", "highlight");
    }
        


    
    render() {
        return (
                <div className="app">
                    <main>
                        <Route exact path="/" render={() => <HomePage {...this.state}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        submitLogin={(username, password) => this.submitLogin(username, password)}
                                                        />} /> 
                        <Route exact path="/navbar" render={() => <NavBar {...this.state} 
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        />} /> 
                        <Route exact path="/dashboard" render={() => <Dashboard {...this.state}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        getCurrentSuggestion={() => this.getCurrentSuggestion()}
                                                        getCurrentTerms={() => this.getCurrentTerms()}
                                                        getDeliverables={() => this.getCurrentDeliverables()}
                                                        />} /> 
                        <Route exact path="/profile" render={() => <Profile {...this.state}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        getCurrentTerms={() => this.getCurrentTerms()}
                                                        getCurrentCourses={() => this.getCurrentCourses()}
                                                        getCurrentWeeks={() => this.getCurrentWeeks()}
                                                        submitAddTerm={(newterm) => this.submitAddTerm(newterm)}
                                                        submitAddCourse={(newcourse) => this.submitAddCourse(newcourse)}
                                                        submitAddWeek={(newweek) => this.submitAddWeek(newweek)}
                                                        submitDeleteCourse={(selectedcourse) => this.submitDeleteCourse(selectedcourse)}
                                                        submitDeleteWeek={(selectedweek) => this.submitDeleteWeek(selectedweek)}
                                                        submitUpdateCourse={(updatedcourse) => this.submitUpdateCourse(updatedcourse)}
                                                        submitUpdateWeek={(updatedweek) => this.submitUpdateWeek(updatedweek)}
                                                        />} /> 
                      
                        <Route exact path="/registration" component={RegistrationPage} />
                    </main>
                </div>
            
        );

    }
        
    }

    export default (withRouter(App));

