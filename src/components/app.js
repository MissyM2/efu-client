import React from 'react';
import { withRouter, Route} from 'react-router-dom';

import { API_BASE_URL } from '../config';
import HomePage from './home-page';
import NavBar from './navbar';
import Dashboard from './dashboard';
import Profile from './profile';
import Weeks from './weeks';
import ReviewCurrentWeek from './review-current-week';
import PlanNextWeek from './plan-next-week';
import RegistrationPage from './registration-page';

import './css/app.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            authToken:'',
            loggedIn: false,
            islogin: true,
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
            nextweek: 0,
            currentcourses: [],
            currentgrades:[],
            currentweeks: [],
            todaydeliverables:[],
            thisweekdeliverables:[],
            sideDrawerOpen: false,
            error: null,
            loading:false
        }
        this.initialState = { ...this.state };
        this.submitregistration = this.submitregistration.bind(this);
        this.submitlogin = this.submitlogin.bind(this);
        this.setlogin = this.setlogin.bind(this);
        this.getcurrentterms=this.getcurrentterms.bind(this);
        this.getcurrentsuggestion=this.getcurrentsuggestion.bind(this);
        this.getcurrentcourses=this.getcurrentcourses.bind(this);
        this.getcurrentgrades=this.getcurrentgrades.bind(this);
        this.getcurrentweeks=this.getcurrentweeks.bind(this);
        this.getcurrentdeliverables=this.getcurrentdeliverables.bind(this);
        this.getcurrentdate=this.getcurrentdate.bind(this);
        this.submitaddterm=this.submitaddterm.bind(this);
        this.submitaddcourse=this.submitaddcourse.bind(this);
        this.submitaddweek=this.submitaddweek.bind(this);
        this.submitdeletecourse=this.submitdeletecourse.bind(this);
        this.submitdeleteweek=this.submitdeleteweek.bind(this);
        this.submitupdatecourse=this.submitupdatecourse.bind(this);
        this.submitupdateweek=this.submitupdateweek.bind(this);
        this.drawertoggleclickhandler=this.drawertoggleclickhandler.bind(this);
        this.backdropclickhandler=this.backdropclickhandler.bind(this);
        
    }

    componentDidMount() {
        this.getcurrentdate();
    }

    //renderRedirect = (newPath) => {
   //     window.location.href = newPath;
    //}

    getcurrentterm = () => {
        
        this.setState({
            currentterm: 'Spring, 2019'
        });
    }

   submitregistration(firstName, lastName, username, password) {

        const newuser = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }
        console.log(newuser);
        console.log("Clicked submit registration");
        fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newuser)
        })
        .then(response => {
            if(response.ok){
                this.setState({
                    errors:{}
                });
                console.log('tje form is valid');
                return response.json();
            }
            //this.setState({
           //     errors
           // });
            throw new Error(response.text)
        })
        .then(responseJSON => {
            console.log(responseJSON);
            //return registered user name and show login form
            //this.renderRedirect('/login');
            this.props.history.push('/login');
        })
        .catch(err => {
            //const {reason, message, location} = err;
            console.log('Error:' + err.reason + ' at ' + err.location);
        });
    }

    submitlogin(username, password) {
        console.log('app:submitlogin');
        const registereduser = {
            username: username,
            password: password
        }

        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registereduser)
        })
        .then(response => {
            console.log('app: submitlogin: response', response);
            if(response.ok){
                this.setState({
                    errors:{}
                });
                console.log('tje form is valid');
                return response.json();
            } else {
                //this.setState({
           //     errors
           // });
                console.log('login name or password is wrong. try again');
                throw new Error(response.status);
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
                nextweek: this.currentweek + 1,
                authToken: responseJSON.authToken
            });
            this.props.history.push('/dashboard');
        }) 
        .catch((err) => {
            console.log('Error:' + err.reason + ' at ' + err.location);
        })
        
    }

    submitlogout() {
        this.setState(this.initialState);
    }

    // GET functions
    getcurrentterms() {
        fetch(`${API_BASE_URL}/terms`, {
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
            this.setState({
                terms: responseJSON
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getcurrentsuggestion() {
        fetch(`${API_BASE_URL}/suggestions`, {
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
            const tempsuggestion = responseJSON[Math.floor(Math.random() * responseJSON.length)];
            this.setState({
                currentsuggestion: tempsuggestion
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getcurrentcourses() {
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
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getcurrentgrades() {
        fetch(`${API_BASE_URL}/grades`, {
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
            const tempgrades = responseJSON.filter(grade => {
                    return grade.term === this.state.currentterm && grade.week === this.state.currentweek;
            });
            this.setState({
                currentgrades: tempgrades
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getcurrentweeks() {
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
            console.log('app: thisweek', thisweek);
            this.setState({
                currentweeks: tempweeks,
                currentweekdetails: thisweek
            });
            console.log('app: this.state.currentweekdetails',this.state.currentweekdetails);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getcurrentdeliverables() {
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

    getcurrentdate = () => {
        let newDate = new Date();
        let newDay = newDate.getDate();
        let newMonth = newDate.getMonth() + 1;
        let newYear = newDate.getFullYear();
        let todayDate =`${newYear} - ${newMonth<10?`0${newMonth}`:`${newMonth}`} - ${newDay}`;
        this.setState({
            currentdate: todayDate
        });
    }

    // ADD functions

    submitaddterm = (newterm) => {
        console.log('made it to  submitaddterm', newterm);
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
         
    submitaddcourse = (newcourse) => {
        console.log('made it to exec submitaddcourse, here is the newCourse ', newcourse);
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
    
    submitaddweek = (newweek) => {
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
                weeks: [...this.state.currentweeks, responseJSON]
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    submitAddGrade(newgrade) { 
        debugger;
        console.log('made it to submitAdd Grade.  Here is newgrade', newgrade);
        fetch(`${API_BASE_URL}/grades`, {
                method: 'POST',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${this.state.authToken}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(newgrade)
            })
            .then(response => {
                if(response.ok) {
                        return response.json()
                }
                throw new Error(response.text)
            })
            .then(grade => {
                console.log("was grade successful..  found a grade", grade);
                return grade;
            })
            .catch((err) => {
                console.log(err);
            }); 
    }
    
    // DELETE functions
    submitdeletecourse = (selectedCourse) => {
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
        
    submitdeleteweek = (selectedweek) => {
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

    // UPDATE(PUT) functions
        
    submitupdatecourse = (updatedcourse) => {
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
        
    submitupdateweek = (updatedweek) => {
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

    setlogin(e) {
        e.preventDefault();
        const currentState = this.state.islogin;
        this.setState({ islogin: !currentState }); 
    }

    drawertoggleclickhandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    }

    backdropclickhandler = () => {
        this.setState({
            sideDrawerOpen: false
        });
    }
        


    
    render() {
        return (
                <div className="app">
                    <main>
                        <Route exact path="/" render={() => <HomePage {...this.state}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        setlogin={(e) => this.setlogin(e)}
                                                        submitregistration={(firstName, lastName, username, password) => this.submitregistration(firstName, lastName, username, password)}
                                                        submitlogin={(username, password) => this.submitlogin(username, password)}
                                                        />} /> 

                        <Route exact path="/navbar" render={() => <NavBar {...this.state} 
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        submitlogout= {() => this.submitlogout()}
                                                        />} /> 
                        <Route exact path="/dashboard" render={() => <Dashboard {...this.state}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        getcurrentterm={() => this.getCurrentTerm()}
                                                        getcurrentsuggestion={() => this.getcurrentsuggestion()}
                                                        getcurrentterms={() => this.getcurrentterms()}
                                                        getcurrentcourses={() => this.getcurrentcourses()}
                                                        getcurrentweeks={() => this.getcurrentweeks()}
                                                        getcurrentdeliverables={() => this.getcurrentdeliverables()}
                                                        getcurrentgrades={() => this.getcurrentgrades()}
                                                        drawertoggleclickhandler={() => this.drawertoggleclickhandler()}
                                                        backdropclickhandler = {() => this.backdropclickhandler()}
                                                        />} /> 
                        <Route exact path="/profile" render={() => <Profile {...this.state}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        submitaddterm={(newterm) => this.submitaddterm(newterm)}
                                                        submitaddcourse={(newcourse) => this.submitaddcourse(newcourse)}
                                                        submitaddweek={(newweek) => this.submitaddweek(newweek)}
                                                        submitdeletecourse={(selectedcourse) => this.submitdeletecourse(selectedcourse)}
                                                        submitdeleteweek={(selectedweek) => this.submitdeleteweek(selectedweek)}
                                                        submitupdatecourse={(updatedcourse) => this.submitupdatecourse(updatedcourse)}
                                                        submitupdateweek={(updatedweek) => this.submitupdateweek(updatedweek)}
                                                        drawertoggleclickhandler={() => this.drawertoggleclickhandler()}
                                                        backdropclickhandler = {() => this.backdropclickhandler()}
                                                        />} /> 
                        <Route exact path="/weeks" render={() => <Weeks {...this.state}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        getcurrentgrades={() => this.getcurrentgrades()}
                                                        drawertoggleclickhandler={() => this.drawertoggleclickhandler()}
                                                        backdropclickhandler = {() => this.backdropclickhandler()}
                                                        />} /> 
                        <Route exact path="/review-current-week" render={() => <ReviewCurrentWeek {...this.state}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        submitupdateweek={(updatedweek) => this.submitupdateweek(updatedweek)}
                                                        submitaddgrade={(newgrade) => this.submitAddGrade(newgrade)}
                                                        drawertoggleclickhandler={() => this.drawertoggleclickhandler()}
                                                        backdropclickhandler = {() => this.backdropclickhandler()}
                                                        />} /> 
                        <Route exact path="/plan-next-week" render={() => <PlanNextWeek {...this.state}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        drawertoggleclickhandler={() => this.drawertoggleclickhandler()}
                                                        backdropclickhandler = {() => this.backdropclickhandler()}
                                                        />} /> 
                       
                    </main>
                </div>
            
        );

    }
        
    }

    export default (withRouter(App));

