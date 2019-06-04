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
            currentdate:"",
            currentsuggestion:[],
            currentterm: "",
            currentweek: 1,
            nextweek: 0,
            selectingterm:false,
            selectingweek:false,
            terms:[],
            currentweekdetails:[],
            currentcoursename: '',
            currentcourses: [],
            currentcoursecount:0,
            currentgrades:[],
            currentgradecount:0,
            currentweeks: [],
            currentweekcount:0,
            todaydeliverables:[],
            thisweekdeliverables:[],
            sideDrawerOpen: false,
            showNavButtons:true,
            error: null,
            loading:false,
            SpringFall:16,
            SummerLong:8,
            SummerShort:4,
            Short:4
        }
        this.initialState = { ...this.state };
        this.submitregistration = this.submitregistration.bind(this);
        this.submitlogin = this.submitlogin.bind(this);
        this.setlogin = this.setlogin.bind(this);
        this.setcurrentterm = this.setcurrentterm.bind(this);
        this.getcurrentterm=this.getcurrentterm.bind(this);
        this.setcurrentweek=this.setcurrentweek.bind(this);
        this.getcurrentweekdetails=this.getcurrentweekdetails.bind(this);
        this.getcurrentterms=this.getcurrentterms.bind(this);
        this.getcurrentsuggestion=this.getcurrentsuggestion.bind(this);
        this.getcurrentcourses=this.getcurrentcourses.bind(this);
        this.getcurrentgrades=this.getcurrentgrades.bind(this);
        //this.getcurrentweek=this.getcurrentweek.bind(this);
        this.getcurrentweeks=this.getcurrentweeks.bind(this);
        this.getcurrentdeliverables=this.getcurrentdeliverables.bind(this);
        this.getcurrentdate=this.getcurrentdate.bind(this);
        this.submitaddterm=this.submitaddterm.bind(this);
        this.submitaddcourse=this.submitaddcourse.bind(this);
        this.generateweeksforterm=this.generateweeksforterm.bind(this);
        this.generategradesforcourse=this.generategradesforcourse.bind(this);
        this.submitdeletecourse=this.submitdeletecourse.bind(this);
        this.submitdeleteweek=this.submitdeleteweek.bind(this);
        this.submitupdatecourse=this.submitupdatecourse.bind(this);
        this.submitupdateweek=this.submitupdateweek.bind(this);
        this.drawertoggleclickhandler=this.drawertoggleclickhandler.bind(this);
        this.navbuttonstoggleclickhandler=this.navbuttonstoggleclickhandler.bind(this);
        this.backdropclickhandler=this.backdropclickhandler.bind(this);
        this.modalconfirmhandler=this.modalconfirmhandler.bind(this);
        this.modalcancelhandler=this.modalcancelhandler.bind(this); 
    }

    componentDidMount() {
        this.getcurrentdate();
    }

    componentDidUpdate() {
        //console.log('componentDidUpdate fired currentweeks', this.state.currentweeks);
       // console.log('componentDidUpdate fired currentgrades', this.state.currentgrades);
    }

    setcurrentterm = (term) => {
        this.setState(
            {
            currentterm:term,
            selectingterm:false
            },
        this.getcurrentterm(this.state.currentterm)
        );
    }

    setcurrentweek = (week) => {
        console.log('setcurrentweek: made it week', week);
        this.setState(
            {
            currentweek:week,
            selectingweek:false
            },
        this.getcurrentweekdetails(this.state.currentweek)
        );
    }

    getcurrentterm = (term) => {
        this.getcurrentsuggestion();
        //this.getcurrentdeliverables(); 
        this.getcurrentcourses();
        this.getcurrentweeks(this.state.currentterm);
        //this.getcurrentgrades(this.state.currentterm);

        this.setState({
            selectingterm:false
        });
    }

    navbuttonstoggleclickhandler() {
        this.setState((prevState) => {
            return {showNavButtons: !prevState.showNavButtons};
        })

    }

/*
    getcurrentweek(week) {
        console.log('app: getcurrentweek, week', week);
        
        this.setState({
            currentweek: week
        });
        this.getcurrentweeks(this.state.currentterm);
        console.log('getcurrentweek, this.state', this.state);
        //this.getcurrentweekdetails();
        this.getcurrentsuggestion();
        this.getcurrentdeliverables(week); 
        this.getcurrentgrades();

        this.setState({
            selectingweek:false
        }); 
    }
*/
    submitregistration(firstName, lastName, username, password) {
        const newuser = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }
        console.log("app: submitregistration, newuser", newuser);
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
           this.submitlogin(newuser.username, newuser.password);
        })
        .catch(err => {
            //const {reason, message, location} = err;
            console.log('Error:' + err.reason + ' at ' + err.location);
        });
    }

    submitlogin(username, password) {
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
            if(response.ok){
                this.setState({
                    errors:{}
                });
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
                nextweek: this.currentweek + 1,
                authToken: responseJSON.authToken,
                selectingterm: true
            }, () => {
                console.log('app: this.state', this.state);
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
        //console.log('made it to getcurrcourses');
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
                        currentcourses: tempcourses,
                        currentcoursecount: tempcourses.length
                    });

        })
        .catch((err) => {
            console.log(err);
        });
    }

    getcurrentgrades(term) {
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
        .then(grades => {
            const tempgrades = grades.filter(grade => {
                                   return grade.term === term;
            });
            this.setState ({
                    currentgrades: tempgrades,
                    currentgradecount: tempgrades.length
                });
                
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getcurrentweeks(term) {
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
            const sortedweeks = responseJSON
                                .sort((a, b) => a.weekNum - b.weekNum)
                                .filter(week => {
                                        return week.termDesc === this.state.currentterm;
                                });
            const thisweek = responseJSON.filter(week => {
                return week.termDesc === term && week.weekNum === this.state.currentweek;
            });
            console.log('app: getcurrentweeks, thisweek', thisweek);
            this.setState(
                {
                    currentweeks: sortedweeks,
                    currentweekdetails: thisweek,
                    currentweekcount: sortedweeks.length
                },
                this.getcurrentgrades(this.state.currentterm)
            );
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getcurrentweekdetails = (week) => {
        console.log('getcurrentweekdetails: week', week);
        const thisweek= this.state.currentweeks.filter(week => {
            return week.weekNum === this.state.currentweek;
        })
        console.log('getcurrweekdets: thisweek', thisweek);

        this.setState({
            currentweekdetails:  thisweek
        })
    }

    getcurrentdeliverables(week) {

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
                return deliverable.termDesc === this.state.currentterm && deliverable.weekNum == week;
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
        console.log('newcourse', newcourse);
        this.setState({
            currentcourseName: newcourse.courseName
        });
      
        //  add the course
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
                    currentcourses: [...this.state.currentcourses, responseJSON],
                    currentcoursecount: this.state.currentcoursecount + 1
                });
            //  once the currentcoursecount is set in the state to include the new course,
            //  generate the weeks for the term
            return this.generateweeksforterm(this.state.currentterm, newcourse);
        })  
        .catch((err) => {
            console.log(err);
        });

    }

    
    
    generateweeksforterm = (term, course) => {

        if(this.state.currentcoursecount === 1) {
                let termWeeks=0;
                if(term  === 'Spring (16 weeks)' || term === 'Fall (16 weeks)') {
                    termWeeks= this.state.SpringFall;
                } else if (term === 'Summer (8 weeks)') {
                    termWeeks = this.state.SummerLong;
                } else if (term === 'Winter (4 weeks)') {
                    termWeeks = this.state.Short;
                } else if (term === 'Summer (4 weeks)') {
                    termWeeks = this.state.SummerShort
                }
                console.log('genweeks: termWeeks', termWeeks);
                for(let i = 1; i <= termWeeks; i++) {
                    let newweek = {
                        termDesc: this.state.currentterm,
                        weekNum:i,
                        likedLeast: 'no selection',
                        likedMost: 'no selection',
                        mostDifficult: 'no selection',
                        leastDifficult: 'no selection'
                    }
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
                    .then(week =>  {
                        this.setState(
                                {
                                    currentweeks: [...this.state.currentweeks, week],
                                    currentweekcount: this.state.currentweekcount + 1
                                });

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            
            } else {
                
                console.log('there is more than one class so no new weeks should have been generated.', this.state.currentcoursecount);
            } 
            this.generategradesforcourse(term, course.courseName);
    }

    generategradesforcourse = (term, course) => {
            let courseGrades = 0;
            if(term  === 'Spring (16 weeks)' || term === 'Fall (16 weeks)') {
                courseGrades= this.state.SpringFall;
            } else if (term === 'Summer (8 weeks)') {
                courseGrades = this.state.SummerLong;
            } else if (term === 'Winter (4 weeks)') {
                courseGrades = this.state.Short;
            } else if (term === 'Summer (4 weeks)') {
                courseGrades = this.state.SummerShort;
            }
            for(let i = 1; i <= courseGrades; i++) {
                let newgrade = {
                    termDesc: this.state.currentterm,
                    courseName: course,
                    weekNum:i,
                    gradeNum: 100
                }
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
                    this.setState(
                        {
                        currentgrades: [...this.state.currentgrades, grade],
                        currentgradecount: this.state.currentgradecount + 1
                        }
                    );
                    return this.getcurrentgrades(this.state.currentterm); 
                })
                .catch((err) => {
                    console.log(err);
                }); 
            }
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

    modalconfirmhandler =() => {
        //different function:  when you click on one of the terms, put the currentTarget into a variable
        // set the state with the variable
        //filter the data
        //close the modal on the confirm button.
       
        this.setState({selectingterm:false});
        console.log('click went to modalconfirmhandler', this.state.selectingterm);
    }

    modalcancelhandler = () => {
        this.setState({selectingterm:false});
        console.log('click went to modalCANCELhandler', this.state.selectingterm);
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
                                                        getcurrentterm={(term) => this.getcurrentterm(term)}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        setcurrentterm = {(term) => this.setcurrentterm(term)}
                                                        submitlogout= {() => this.submitlogout()}
                                                        />} /> 
                        <Route exact path="/dashboard" render={() => <Dashboard {...this.state}
                                                        setcurrentterm = {(term) => this.setcurrentterm(term)}
                                                        setcurrentweek = {(week) => this.setcurrentweek(week)}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        getcurrentterm={(term) => this.getcurrentterm(term)}
                                                        //getcurrentweek={(week) => this.getcurrentweek(week)}
                                                        getcurrentsuggestion={() => this.getcurrentsuggestion()}
                                                        getcurrentterms={() => this.getcurrentterms()}
                                                        getcurrentcourses={() => this.getcurrentcourses()}
                                                        getcurrentweeks={(term) => this.getcurrentweeks(term)}
                                                        getcurrentdeliverables={(week) => this.getcurrentdeliverables(week)}
                                                        getcurrentgrades={(term) => this.getcurrentgrades(term)}
                                                        drawertoggleclickhandler={() => this.drawertoggleclickhandler()}
                                                        navbuttonstoggleclickhandler={() => this.navbuttonstoggleclickhandler()}
                                                        backdropclickhandler = {() => this.backdropclickhandler()}
                                                        modalconfirmhandler = {() => this.modalconfirmhandler()}
                                                        modalcancelhandler = {() => this.modalcancelhandler()}

                                                        />} /> 
                        <Route exact path="/profile" render={() => <Profile {...this.state}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        setcurrentterm = {(term) => this.setcurrentterm(term)}
                                                        getcurrentterm={(selectedterm) => this.getcurrentterm(selectedterm)}
                                                        getcurrentweeks={(term) => this.getcurrentweeks(term)}
                                                        submitaddcourse={(newcourse) => this.submitaddcourse(newcourse)}
                                                        generateweeksforterm={(term) => this.generateweeksforterm(term)}
                                                        generategradesforcourse={(term, course) => this.generategradesforcourse(term, course)}
                                                        submitdeletecourse={(selectedcourse) => this.submitdeletecourse(selectedcourse)}
                                                        submitdeleteweek={(selectedweek) => this.submitdeleteweek(selectedweek)}
                                                        submitupdatecourse={(updatedcourse) => this.submitupdatecourse(updatedcourse)}
                                                        submitupdateweek={(updatedweek) => this.submitupdateweek(updatedweek)}
                                                        drawertoggleclickhandler={() => this.drawertoggleclickhandler()}
                                                        backdropclickhandler = {() => this.backdropclickhandler()}
                                                        />} /> 
                        <Route exact path="/weeks" render={() => <Weeks {...this.state}
                                                        setcurrentterm = {(term) => this.setcurrentterm(term)}
                                                        getcurrentterm={(selectedterm) => this.getcurrentterm(selectedterm)}
                                                        getcurrentweeks = {(term) => this.getcurrentweeks(term)}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        getcurrentgrades={(term) => this.getcurrentgrades(term)}
                                                        drawertoggleclickhandler={() => this.drawertoggleclickhandler()}
                                                        backdropclickhandler = {() => this.backdropclickhandler()}
                                                        />} /> 
                        <Route exact path="/review-current-week" render={() => <ReviewCurrentWeek {...this.state}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        setcurrentweek={(week) => this.setcurrentweek(week)}
                                                        submitupdateweek={(updatedweek) => this.submitupdateweek(updatedweek)}
                                                        submitaddgrade={(newgrade) => this.submitAddGrade(newgrade)}
                                                        getcurrentweekdetails={() => this.getcurrentweekdetails()}
                                                        drawertoggleclickhandler={() => this.drawertoggleclickhandler()}
                                                        backdropclickhandler = {() => this.backdropclickhandler()}
                                                        navbuttonstoggleclickhandler={() => this.navbuttonstoggleclickhandler()}
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

