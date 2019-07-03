import React from 'react';
import { withRouter, Switch,  Route} from 'react-router-dom';

import { API_BASE_URL } from '../config';
import HomePage from './home-page';
import NavBar from './navbar';
import Dashboard from './dashboard';
import Courses from './courses';
import Weeks from './weeks';
import ReviewCurrentWeek from './review-current-week';
import Deliverables from './deliverables';

import './css/app.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            authToken:'',
            currentusername:'',
            currentdate:"",
            fCurrentDate:"",
            pCurrentDate:0,
            courseAdded:false,
            courseDeleted: false,
            courseUpdated:false,
            currentsuggestion:[],
            currentterm: "",
            currentweek: null,
            currentcoursename: '',
            deliverableAdded: false,
            deliverableIsChanged:false,
            deliverableDeleted: false,
            deliverabletobedeleted:{
                termDesc:"",
                courseName: "",
                dueDate: null,
                deliverableName: "",
                prephrs: 0,
                desc: "",
                impact:""
            },
            deliverableNames:['Quiz', 'Test', 'Midterm', 'Final', 'Lab/Essay', 'Term Paper/Group Project Final', 'Term Paper/Group-Project Checkpoint', 'Homework', 'Participation'],
            deliverablesUpdated:false,
            error:'',
            isError: false,
            islogin: true,
            isModal: false,
            lastSunday:"",
            pLastSunday:0,
            loading:false,
            loggedIn: false,
            nextweek: 0,
            nextSunday:"",
            pNextSunday:0,
            followingSunday:"",
            password: "",
            allprephrs:[1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            prephrstoday:0,
            prephrsthisweek:0,
            rightSideDrawerOpen: false,
            selectingterm:false,
            selectingweek:false,
            showNavButtons:true,
            showcoursedeletemodal: false,
            dashboardFlag:false,
            weeksFlag:false,
            reviewWeekFlag:false,
            coursesFlag:false,
            deliverablesFlag:false,
            SpringFall:16,
            SummerLong:8,
            SummerShort:4,
            Short:4,
            terms:[],
            todaydate:"",
            thistermweekcount:0,
            thistermweeks: [],
            thisweekdetails:[],
            thisweekLikedMost:"",
            thisweekLikedLeast:"",
            thisweekMostDifficult:"",
            thisweekLeastDifficult:"",
            thistermcoursecount:0,
            thistermcourses: [],
            todaydeliverables:[],
            thisweekdeliverables:[],
            thistermdeliverables:[],
            thiscoursedeliverables:[],
            thistermgradecount:0,
            thistermgrades:[],
            thisweekgrades:[]
            
        }
        //**********  BINDINGS  **********/

        this.initialState = {...this.state};

        // for login/auth functions
        this.getcurrentdates=this.getcurrentdates.bind(this);
        this.submitregistration = this.submitregistration.bind(this);
        this.submitlogin = this.submitlogin.bind(this);
        this.submitlogout=this.submitlogout.bind(this);

        // for setter functions
        this.setlogin = this.setlogin.bind(this);
        this.setcurrentcoursename = this.setcurrentcoursename.bind(this);
        this.setcurrentterm = this.setcurrentterm.bind(this);
        this.setcurrentweek=this.setcurrentweek.bind(this);
        this.setloadingflag=this.setloadingflag.bind(this);
        this.setdeliverableischanged=this.setdeliverableischanged.bind(this);
        this.setcoursedeletemodal=this.setcoursedeletemodal.bind(this);
        this.setdeliverabletobedeleted=this.setdeliverabletobedeleted.bind(this);
        this.setdeliverableadded=this.setdeliverableadded.bind(this);
        this.setcourseanddeliverableflags=this.setcourseanddeliverableflags.bind(this);
        this.setPageFlags=this.setPageFlags.bind(this);

        // for event handlers
        this.rightdrawertoggleclickhandler=this.rightdrawertoggleclickhandler.bind(this);
        this.rightbackdropclickhandler=this.rightbackdropclickhandler.bind(this);
        this.navbuttonstoggleclickhandler=this.navbuttonstoggleclickhandler.bind(this);
        this.modaldeliverablecancelhandler=this.modaldeliverablecancelhandler.bind(this);
        this.modalconfirmhandler=this.modalconfirmhandler.bind(this);
        this.modalcancelhandler=this.modalcancelhandler.bind(this); 

        // for suggestions AJAX functions
        this.getcurrentsuggestion=this.getcurrentsuggestion.bind(this);


        // for terms AJAX functions
        this.getcurrentterms=this.getcurrentterms.bind(this);
        this.getcurrenttermdetails=this.getcurrenttermdetails.bind(this);
        this.submitaddterm=this.submitaddterm.bind(this);

        // for courses AJAX functions
        this.getthistermcourses=this.getthistermcourses.bind(this);
        this.submitaddcourse=this.submitaddcourse.bind(this);
        this.submitupdatecourse=this.submitupdatecourse.bind(this);
        this.submitdeletecourse=this.submitdeletecourse.bind(this);
        this.deletecoursedetails=this.deletecoursedetails.bind(this);

        // for weeks AJAX functions
        this.getthistermweeks=this.getthistermweeks.bind(this);
        this.getthisweekdetails=this.getthisweekdetails.bind(this);
        this.generateweeksforterm=this.generateweeksforterm.bind(this);
        this.submitupdateweek=this.submitupdateweek.bind(this);
        this.submitdeleteweek=this.submitdeleteweek.bind(this);

        // for grades AJAX functions
        this.getcurrentgrades=this.getcurrentgrades.bind(this);
        this.generategradesforcourse=this.generategradesforcourse.bind(this);
        this.submitupdategrade=this.submitupdategrade.bind(this);
        this.submitdeletecoursegrades=this.submitdeletecoursegrades.bind(this);

        // for deliverables AJAX functions
        this.getthistermdeliverables=this.getthistermdeliverables.bind(this);
        this.submitadddeliverable=this.submitadddeliverable.bind(this);
        this.submitupdatedeliverable=this.submitupdatedeliverable.bind(this);
        this.submitdeletedeliverable=this.submitdeletedeliverable.bind(this);
        this.submitdeletedeliverables=this.submitdeletedeliverables.bind(this);
    }



    errorHandler = (errorStatus) => {
        switch (errorStatus) {
            case 400:
                this.setState({
                    error:'Bad Request: You must enter login and password.'
                });
                break;
            case 401:
                this.setState({
                    error:'Unauthorized: Either your login or password is incorrect.'
                });
                break;
            case 422:
                this.setState({
                    error: 'Username already taken.'
                });
                break;
            default:
                this.setState({
                    error:'Unaddressed error: see your Administrator'
                });
        }
    }

    getcurrentdates = () => {

        var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

        //get today
        var now = new Date();
        let newDate = new Date();
        let newDay = newDate.getDate();
        let newMonth = newDate.getMonth() + 1;
        let newYear = newDate.getFullYear();
        let todayDate =`${newYear}-${newMonth<10?`0${newMonth}`:`${newMonth}`}-${newDay}`;
        this.setState({
            currentdate: todayDate
        });
        
        let today=new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let todayDayName=days[now.getDay()];
        let todayDay = today.getDate();
        let todayMonth = today.getMonth() + 1;
        let todayMonthName = monthShortNames[todayMonth];
        let todayFormatted =`${todayDayName}, ${todayMonthName} ${todayDay}`;
        let pToday = Date.parse(today);
        this.setState({
            fCurrentdate: todayFormatted,
            pCurrentDate: pToday
        }, () => {
            //console.log('this.state', this.state);
        });

        // get last Sunday
        let lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));
        let lastSundayDay = lastSunday.getDate();
        let lastSundayDayName=days[lastSunday.getDay()];
        let lastSundayMonth = lastSunday.getMonth() + 1;
        let lastSundayMonthName = monthShortNames[lastSundayMonth];
        //let lastSundayYear = lastSunday.getFullYear();
        let lastSundayFormatted =`${lastSundayDayName}, ${lastSundayMonthName} ${lastSundayDay}`;
        let pLastSunday = Date.parse(lastSunday);
        this.setState({
                fLastSunday: lastSundayFormatted,
                pLastSunday: pLastSunday
        }, () => {
            //console.log('this.state', this.state);
        })

       // get next Sunday
        let nextSunday = lastSunday;
        nextSunday = new Date(nextSunday.setDate(nextSunday.getDate() + 7));
        let nextSundayDay = nextSunday.getDate();
        let nextSundayDayName = days[nextSunday.getDay()];
        let nextSundayMonth = nextSunday.getMonth() + 1;
        let nextSundayMonthName = monthShortNames[nextSundayMonth];
        //let nextSundayYear = nextSunday.getFullYear();
        let nextSundayFormatted =`${nextSundayDayName}, ${nextSundayMonthName} ${nextSundayDay}`;
        var pNextSunday = Date.parse(nextSunday);
        this.setState({
            fNextSunday: nextSundayFormatted,
            pNextSunday: pNextSunday
        }, () => {
            //console.log('this.state', this.state);
        });
       
    }

    /******************************************
     *   LOGIN/REG/LOGOUT ROUTINES
     ******************************************/

    submitregistration(firstName, lastName, username, password) {
        const newuser = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }
        this.setloadingflag(true);
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
                    error:null,
                    isError: false
                });
                return response.json();
            } else {
                this.errorHandler(response.status);
            }
            throw new Error('on throw new Error', response.status);
        })
        .then(responseJSON => {
            //return registered user name and show login form
           return this.submitlogin(newuser.username, newuser.password);
        })
        .then(response => {
            if(response.ok) {
                this.setloadingflag(false);
            }
            return response.json;
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
                    error: null,
                    isError:false,
                })
                return response.json();
            } 
        })
        .then(responseJSON => {
            this.setState({
                currentusername: username,
                password: password,
                loggedIn: true,
                loading: true,
                nextweek: this.currentweek + 1,
                authToken: responseJSON.authToken,
                selectingterm: true
            }, () => {
            });
            //console.log('this.state after login', this.state);
            this.props.history.push('/dashboard');
        }) 
        .catch((err) => {
            console.log(err);
        })
        
    }

    submitlogout() {
       // console.log('this initial state', this.state);
        this.setState(this.initialState, () => {
            //console.log('this.state now', this.state);
        });
    }

    /********************************
     *   SETTERS
     *********************************/

    setloadingflag = (bool) => {
        console.log('made it to setloadingflag');
        this.setState({
            loading: bool
        })
    }
    setcurrentterm = (term) => {
        this.setState({
            currentterm:term,
            selectingterm:false,
            thisweekLikedMost:"",
            thisweekLikedLeast:"",
            thisweekMostDifficult:"",
            thisweekLeastDifficult:"",
            }, () => {
                this.getcurrenttermdetails();
            });
    }

    setPageFlags(page) {
        switch(page) {
            case "Dashboard":
                    this.setState({
                        dashboardFlag:true,
                        weeksFlag:false,
                        reviewWeekFlag:false,
                        coursesFlag:false,
                        deliverablesFlag:false
                    }, () => {
                        //console.log('this.state.dashboardFlag', this.state.dashboardFlag);
                    });
              break;
            case "Weeks":
                this.setState({
                    dashboardFlag:false,
                    weeksFlag:true,
                    reviewWeekFlag:false,
                    coursesFlag:false,
                    deliverablesFlag:false
                }, () => {
                    //console.log('this.state.weeksFlag', this.state.weeksFlag);
                });
              break;
            case "ReviewWeek":
                this.setState({
                    dashboardFlag:false,
                    weeksFlag:false,
                    reviewWeekFlag:true,
                    coursesFlag:false,
                    deliverablesFlag:false
                }, () => {
                    //console.log('this.state.reviewWeekFlag', this.state.reviewWeekFlag);
                });
              break;
            case "Courses":
                this.setState({
                    dashboardFlag:false,
                    weeksFlag:false,
                    reviewWeekFlag:false,
                    coursesFlag:true,
                    deliverablesFlag:false,
                }, () => {
                    //console.log('this.state.coursesFlag', this.state.coursesFlag);
                });
              break;
            case "Deliverables":
                this.setState({
                    dashboardFlag:false,
                    weeksFlag:false,
                    reviewWeekFlag:false,
                    coursesFlag:false,
                    deliverablesFlag:true
                }, () => {
                    console.log('this.state.deliverablesFlag', this.state.deliverablesFlag);
                });
              break;
           
            default:
                    this.setState({
                        dashboardFlag:false,
                        weeksFlag:false,
                        reviewWeekFlag:false,
                        coursesFlag:false,
                        deliverablesFlag:false
                    }, () => {
                        console.log('this.state.dashboardFlag', this.state);
                    });

                           
          }
    }

    setcoursedeletemodal(bool) {
        //console.log('made it to the setcoursedeletemodal');
        this.setState({
          showCourseDeleteModal:bool
        },() => {
            //console.log('this.state.showCourseDeleteModal should be set properly', this.state.showCourseDeleteModal);
        });
    }

    setdeliverableischanged = (bool) => {
        this.setState({
            deliverableIsChanged: bool
        });
    }
    setdeliverabletobedeleted(deliverable) {
        console.log('inside setdeliverabletobedeleted', deliverable);
        this.setState({
            deliverabletobedeleted:{
                termDesc: deliverable.termDesc,
                courseName: deliverable.courseName,
                dueDate: deliverable.dueDateFormatted,
                deliverableName: deliverable.deliverableName,
                prephrs: deliverable.prephrs,
                desc: deliverable.desc,
                impact:deliverable.impact
            }
          },() => {
              console.log('this.state.deliverabletobedeleted should be set properly', this.state.deliverabletobedeleted);
          });
    }

   

    setcurrentweek = (week) => {
        this.setState(
            {
            currentweek:parseInt(week),
            nextweek: parseInt(week) + 1,
            selectingweek:false
            }, () => {
                this.getthisweekdetails();
            }
        );
    }

    setcurrentcoursename = (course) => {
        this.setState(
            {currentcoursename: course}, 
            () => {
                this.getthistermdeliverables();
            }
        );
    }

    setlogin(e) {
        e.preventDefault();
        const currentState = this.state.islogin;
        this.setState({ 
            islogin: !currentState ,
            error:''
        }); 
    }

    setcourseanddeliverableflags = () => {
        this.setState({
            courseAdded: false,
            courseUpdated:false,
            courseDeleted:false,
            deliverableAdded:false,
            deliverableUpdated:false,
            deliverableDeleted:false
        });
    }

    setdeliverableadded = (bool) => {
        this.setState({
            deliverableAdded:bool
        },() => {
            //console.log('this.state.showCourseDeleteModal should be set properly', this.state.showCourseDeleteModal);
        });
    }

    


    /*****************************************************
     *   ROUTINES TO GET ALL DETAILS FOR TERM AND WEEK
     ****************************************************/

    getcurrenttermdetails = () => {
        console.log('made it to getcurrenttermdetails');
        this.getcurrentdates();
        this.getcurrentsuggestion();

        //create promise for getting the courses
        new Promise((resolve, reject) => {
            this.getthistermcourses(resolve, reject);
            })
            .then(res => {
                return this.getthistermweeks();
            })
            .then(res => {
                return this.getcurrentgrades();
            })
            .then(res => {
                return this.getthistermdeliverables(); 
            })
            .then(res => {
                return this.setcurrentweek(1);
            })
            .then(res => {
                return this.getthisweekdetails();
            })
            .then(res => {
                return console.log('getcurrentterms routine is complete');
            })
            .catch(err => {
                console.log('Error:' + err.reason + ' at ' + err.location);
            });

        
        
       
    }

    getthisweekdetails = () => {
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
            const thisweek = this.state.thistermweeks.filter(week => {
                return week.weekNum ===this.state.currentweek;
            });

            const thisweekgrades = grades.filter(grade => {
                    return grade.term === this.state.currentterm && grade.week === this.state.currentweek;
            });

            this.setState({
                thisweekLikedLeast: thisweek[0].likedLeast,
                thisweekLikedMost: thisweek[0].likedMost,
                thisweekMostDifficult: thisweek[0].mostDifficult,
                thisweekLeastDifficult: thisweek[0].leastDifficult,
                thisweekgrades: thisweekgrades
                }, () => {
                    //console.log('currentweek state is set');
                   
                });
        })
        .catch((err) => {
            console.log(err);
        });       
            
    }

    getthistermweeks(resolve, reject) {
        fetch(`${API_BASE_URL}/weeks`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.state.authToken}`
                }
        })
        .then(response => {
            //console.log('getthistermweeks: response', response);
            if(response.ok) {
                    return response.json()
            }
            throw new Error(response.text)
        })
        .then(responseJSON => {
            //console.log('getthistermweeks: responseJSON', responseJSON);
            const sortedweeks = responseJSON
                                .sort((a, b) => a.weekNum - b.weekNum)
                                .filter(week => {
                                        return week.termDesc === this.state.currentterm;
                                });

            return this.setState(
                {
                    thistermweeks: sortedweeks,
                    thistermweekcount: sortedweeks.length
                }
            );
        })
        .then(arg => {
            this.getcurrentgrades();
        })
        .catch((err) => {
            console.log(err);
            reject();
        });
    }


    /*************************************************
     *   EVENT HANDLERS
     *************************************************/

    navbuttonstoggleclickhandler() {
        this.setState((prevState) => {
            return {showNavButtons: !prevState.showNavButtons};
        })

    }

    rightdrawertoggleclickhandler = () => {
            this.setState((prevState) => {
                return {rightSideDrawerOpen: !prevState.rightSideDrawerOpen}
            });
    }

    rightbackdropclickhandler = () => {
        this.setState({
            rightSideDrawerOpen: false
        });
    }

    modalconfirmhandler =() => {
        this.setState({selectingterm:false});
    }

    modalcancelhandler = () => {
        this.setState({selectingterm:false});
    }

    modaldeliverablecancelhandler = () => {
        this.setState({showAddDeliverableCompleteModal:false});
    }


    
    /*******************************************
     *      GET functions
     * *****************************************/ 

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

    getthistermcourses(resolve, reject) {
        //console.log('made it to getthistermcourses');
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
            //console.log('after .then with responseJson', responseJSON);
            const tempcourses = responseJSON.filter(course => {
                    return course.termDesc === this.state.currentterm;
            });
            this.setState({
                        thistermcourses: tempcourses,
                        thistermcoursecount: tempcourses.length,
                        courseUpdated: true
                    },() => {
                        resolve({message: 'DID COURSES GET UPDATEDfinished coursesPromise'});
                    });
        })
        .catch((err) => {
            console.log(err);
            reject();
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
        .then(grades => {
            const temptermgrades = grades.filter(grade => {
                    return grade.term === this.state.currentterm;
            });
            const tempweekgrades = grades.filter(grade => {
                return grade.term === this.state.currentterm && grade.week === this.state.currentweek;
        });
            return this.setState ({
                    thistermgrades: temptermgrades,
                    thisweekgrades: tempweekgrades,
                    thistermgradecount: temptermgrades.length
                }); 
        })
        .catch((err) => {
            console.log('there are no grades', err);
        });
    }


    getthistermdeliverables() {

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
            // get deliverables for the term
            console.log('getthistermdeliverables: responseJSON', responseJSON);
                    const temptermdeliverables = responseJSON.filter(deliverable => {
                        return deliverable.termDesc === this.state.currentterm;
                    });
                    this.setState({
                        thistermdeliverables: temptermdeliverables
                    }, () => {
                        //console.log('getthistermdeliverables: temptermdeliverables', temptermdeliverables);
                    });
                    

            //get deliverables for the week
                    
                    const tempweekdeliverables = responseJSON.filter(deliverable => {
                        var pTempDueDate = Date.parse(deliverable.dueDate);
                        return (pTempDueDate <= this.state.pNextSunday && pTempDueDate >= this.state.pLastSunday) && 
                                (deliverable.termDesc === this.state.currentterm);
                    });
                    let tempWeekPrephrs = 0;
                    for (let i=0; i < tempweekdeliverables.length; i++) {
                        tempWeekPrephrs += tempweekdeliverables[i].prephrs;
                    }
                    this.setState({
                        thisweekdeliverables: tempweekdeliverables,
                        prephrsthisweek:tempWeekPrephrs
                    }, () => {
                        //console.log('getthistermdeliverables: check the state for week deliverables', this.state.thisweekdeliverables);
                        //console.log('getthistermdeliverables: week prephrs', this.state.prephrsthisweek);
                    });
             //get deliverables for the course, if selected
                    if(this.state.currentcoursename !== "") {
                        const tempcoursedeliverables = responseJSON.filter(deliverable => {
                            return deliverable.termDesc === this.state.currentterm &&
                                    deliverable.courseName === this.state.currentcoursename;
                        });
                        this.setState({
                            thiscoursedeliverables: tempcoursedeliverables
                        }, () => {
                            //console.log('getthistermdeliverables: tempcoursedeliverables', tempcoursedeliverables);
                        });
                    }
                    


            //get deliverables for the day
                    const temptodaydeliverables = responseJSON.filter(deliverable => {
                       //var del= new Date(deliverable.dueDate);
                        //var now = new Date();
                       // var delDueDate = new Date(del.getFullYear(), del.getMonth(), del.getDate());
                        //console.log('deliverable dueDate', deliverable.dueDate.split('T')[0]);
                        let deliverableDate = deliverable.dueDate.split('T')[0];
                        /*
                        let delDate = new Date(deliverable.dueDate);
                        let delDay = delDate.getDate();
                        let delMonth = delDate.getMonth() + 1;
                        let delYear = delDate.getFullYear();
                        let deliverableDate =`${delYear}-${delMonth<10? `0${delMonth}`:`${delMonth}`}-${delDay}`;
                        */




                        
                        //console.log('delDueDate', deliverableDate);
                        //console.log('this.state.currentdate', this.state.currentdate);
                        //console.log('are they equal?', deliverableDate === this.state.currentdate);
                            return deliverable.termDesc === this.state.currentterm && deliverableDate === this.state.currentdate;
                    });
                    //console.log('todaydeliverables', temptodaydeliverables);
                    let tempPrephrs=0;
                    for (let i =0; i < temptodaydeliverables.length; i++) {
                        tempPrephrs += temptodaydeliverables[i].prephrs;
                    }
                    this.setState({
                        todaydeliverables: temptodaydeliverables,
                        prephrstoday:tempPrephrs
                    }, () => {
                        //console.log('getthistermdeliverables: check the state for todays deliverables', this.state.todaydeliverables);
                        //console.log('getthistermdeliverables: todays prephrs', this.state.prephrstoday);
                    });

            
           
        })
        .catch((err) => {
            console.log(err);
        });

    }

   /************************************************
    *           ADD/GENERATE FUNCTIONS 
    *        (user added: term, course, deliverable)
    *        (auto generated weeks and grades)
   ************************************************* */


    submitaddterm = (newterm) => {
        //console.log('made it to  submitaddterm', newterm);
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
                    this.setState((responseJSON) => ({
                        terms: [...this.state.terms, responseJSON]
                    }));
                    return responseJSON;
                })   
                .catch((err) => {
                    console.log(err);
                });
    }
         
    submitaddcourse = (newcourse) => {
        //console.log('submitaddcourse: newcourse', newcourse);
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
        .then(course =>  {
            this.setState({
                courseAdded:true,
                thistermcourses: [...this.state.thistermcourses, course],
                thistermcoursecount: this.state.thistermcoursecount + 1
            });
            //  once the thistermcoursecount is set in the state to include the new course,
            //  generate the weeks for the term
            return this.generateweeksforterm(this.state.currentterm, newcourse);
        })
        .then(responseJSON =>  {
            return this.getcurrenttermdetails();          
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }

    submitadddeliverable(newDeliverable) {
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
        .then(deliverable => {
                console.log('deliverable that has just been added.', deliverable);
                this.setdeliverableadded(true);
                return this.getthistermdeliverables();
        })
        .then(res => {
            console.log('subadddeliverable', res);
        })
        .catch((err) => {
                console.log(err);
        });
        

    }

    
    generateweeksforterm = (term, course) => {
        if(this.state.thistermcoursecount === 1) {
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
               // console.log('genweeks: termWeeks', termWeeks);
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
                                    thistermweeks: [...this.state.thistermweeks, week],
                                    thistermweekcount: this.state.thistermweekcount + 1
                                });

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            
            } else {
                
                //console.log('there is more than one class so no new weeks should have been generated.', this.state.thistermcoursecount);
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
                    gradeNum: 0
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
                        thistermgradecount: this.state.thistermgradecount + 1
                        }
                    );
                    return this.getcurrentgrades(); 
                })
                .catch((err) => {
                    console.log(err);
                }); 
            }
    }

    /******************************************
     *      DELETE FUNCTIONS
     *      
     *******************************************/

    deletecoursedetails = () => {
        this.setcoursedeletemodal(false);
        if (this.state.thistermdeliverables.length !== 0) {
                this.submitdeletedeliverables();
        }

        if (this.state.thistermgrades.length !== 0) {
            this.submitdeletecoursegrades();
        }
       
        this.submitdeletecourse();
    }

    submitdeletedeliverables = () => {
        const coursedeliverablesForDeletion = {
            termDesc: this.state.currentterm,
            courseName: this.state.currentcoursename
        }
       
        fetch(`${API_BASE_URL}/deliverables`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${this.state.authToken}`,
                    'Content-Type': 'application/json'},
                body: JSON.stringify(coursedeliverablesForDeletion)
            })
            .then(response => {
                console.log('deletedeliverables response', response);
                if(response.ok) {
                        return response.json()
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {
               console.log('responseJSON after deleting deliverables', responseJSON);
                this.setState({
                   thiscoursedeliverables: [],
                }, () => {
                    console.log('finished deleting course deliverables');
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    submitdeletecoursegrades = () => {
        const coursegradesForDeletion = {
            termDesc: this.state.currentterm,
            courseName: this.state.currentcoursename
        }
       
        fetch(`${API_BASE_URL}/grades`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${this.state.authToken}`,
                    'Content-Type': 'application/json'},
                body: JSON.stringify(coursegradesForDeletion)
            })
            .then(response => {
                if(response.ok) {
                        return response.json()
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {
                this.setState({
                    currentgrades: [],
                }, () => {
                    console.log('deleted grades');
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    submitdeletecourse = ()  => {
         const courseForDeletion = {
             termDesc: this.state.currentterm,
             courseName: this.state.currentcoursename
         }
        
        fetch(`${API_BASE_URL}/courses`, {
                 method: 'DELETE',
                 headers: {
                     Authorization: `Bearer ${this.state.authToken}`,
                     'Content-Type': 'application/json'},
                 body: JSON.stringify(courseForDeletion)
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
                     thistermcourses: tempcourses,
                     courseDeleted: true
                 }, () => {
                     console.log('finished deleting course');
                 });
             })
             .catch((err) => {
                 console.log(err);
             });
             
     }

     submitdeletedeliverable = (deliverable)  => {
        fetch(`${API_BASE_URL}/deliverables`, {
                 method: 'DELETE',
                 headers: {
                     Authorization: `Bearer ${this.state.authToken}`,
                     'Content-Type': 'application/json'},
                 body: JSON.stringify(deliverable)
             })
             .then(response => {
                 if(response.ok) {
                         return response.json()
                 }
                 throw new Error(response.text)
             })
             .then(responseJSON => {
                 this.setState({
                     delDeleted:true
                 });

                 const tempdeliverables = responseJSON.filter(deliverable => {
                         return deliverable.termDesc === this.state.currentterm;
                 });
                 this.setState({
                     currentdeliverables: tempdeliverables
                 }, () => {
                     this.getthistermdeliverables();
                 });
             })
             .catch((err) => {
                 console.log(err);
             });  
     }

    

    

    submitdeleteweek = (selectedweek) => {
        //console.log('made it to delete Week selectedweek ', selectedweek)
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
        

    /*********************************************
     *   UPDATE FUNCTIONS
     *      (user updated course, week, grade)
     *  
     * *******************************************/ 
        
    submitupdatecourse = (updatedcourse) => {
        this.setState({
            courseUpdated:false
        })
        fetch(`${API_BASE_URL}/courses`, {
            method: 'PUT',
            headers: {
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
                this.getcurrenttermdetails();          
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
        
    submitupdateweek = (updatedweek) => {
        fetch(`${API_BASE_URL}/weeks`, {
            method: 'PUT',
            headers: {
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
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.text)
        })
        .then(response =>  {
            this.getcurrenttermdetails();          
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.text)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    submitupdategrade = (updatedgrade) => {
            fetch(`${API_BASE_URL}/grades`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${this.state.authToken}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(updatedgrade)
            })
            .then(response => {
                if(response.ok) {
                        return response.json()
                }
                throw new Error(response.text)
            })
            .then(responseJSON => {
                return this.setcurrentweek(updatedgrade.weekNum);
            })
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error(response.text)
            })
            .then(responseJSON =>  {
                this.getcurrenttermdetails();          
            })
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error(response.text)
            })
            .catch((err) => {
                console.log(err);
            }); 
    }

    submitupdatedeliverable = (updateddeliverable) => {
        console.log('made it to submitupdatedeliverable', updateddeliverable);
        fetch(`${API_BASE_URL}/deliverables`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${this.state.authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(updateddeliverable)
        })
        .then(response => {
            console.log('response is ', response);
            if(response.ok) {
                    return response.json()
            }
            throw new Error(response.text)
        })
        .then(responseJSON =>  {
            console.log('responseJSON', responseJSON);
            this.setdeliverableischanged(true);
            return this.getthistermdeliverables();          
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.text)
        })
        .catch((err) => {
            console.log(err);
        }); 
}


    
        


    
    render() {
        return (
                <section className="app-wrapper">
                    <Switch>
                        <Route exact path="/" render={() => <HomePage {...this.state}
                                                        renderRedirect={(newPath) => this.renderRedirect(newPath)}
                                                        setlogin={(e) => this.setlogin(e)}
                                                        setloadingflag={(bool) => this.setloadingflag(bool)}
                                                        submitregistration={(firstName, lastName, username, password) => this.submitregistration(firstName, lastName, username, password)}
                                                        submitlogin={(username, password) => this.submitlogin(username, password)}
                                                        />} /> 

                        <Route exact path="/navbar" render={() => <NavBar {...this.state} 
                                                        setloadingflag={(bool) => this.setloadingflag(bool)}
                                                        setdeliverableischanged = {(bool) => this.setdeliverableischanged(bool)}
                                                        resetcourseanddeliverableflags={() => this.resetcourseanddeliverableflags}
                                                        setcurrentterm = {(term) => this.setcurrentterm(term)}
                                                        getcurrenttermdetails={() => this.getcurrenttermdetails()}
                                                        submitlogout= {() => this.submitlogout()}
                                                        />} /> 
                        <Route exact path="/dashboard" render={() => <Dashboard {...this.state}
                                                        setloadingflag={(bool) => this.setloadingflag(bool)}
                                                        setPageFlags={(page) => this.setPageFlags(page)}
                                                        setcurrentterm = {(term) => this.setcurrentterm(term)}
                                                        setcurrentweek = {(week) => this.setcurrentweek(week)}
                                                        setdeliverableischanged = {(bool) => this.setdeliverableischanged(bool)}
                                                        setdeliverabletobedeleted = {(deliverable) => {this.setdeliverabletobedeleted(deliverable)}}
                                                        submitupdatedeliverable = {(deliverable) => this.submitupdatedeliverable(deliverable)}
                                                        getcurrenttermdetails={(term) => this.getcurrenttermdetails(term)}
                                                        //getcurrentweek={(week) => this.getcurrentweek(week)}
                                                        getcurrentsuggestion={() => this.getcurrentsuggestion()}
                                                        getcurrentterms={() => this.getcurrentterms()}
                                                        getthistermcourses={() => this.getthistermcourses()}
                                                        getthistermweeks={() => this.getthistermweeks()}
                                                        getthistermdeliverables={(week) => this.getthistermdeliverables(week)}
                                                        getcurrentgrades={() => this.getcurrentgrades()}
                                                        drawertoggleclickhandler={() => this.drawertoggleclickhandler()}
                                                        rightdrawertoggleclickhandler={() => this.rightdrawertoggleclickhandler()}
                                                        navbuttonstoggleclickhandler={() => this.navbuttonstoggleclickhandler()}
                                                        backdropclickhandler = {() => this.backdropclickhandler()}
                                                        rightbackdropclickhandler = {() => this.rightbackdropclickhandler()}
                                                        modalconfirmhandler = {() => this.modalconfirmhandler()}
                                                        modalcancelhandler = {() => this.modalcancelhandler()}
                                                        submitlogout= {() => this.submitlogout()}

                                                        />} /> 
                        
                        <Route exact path="/weeks" render={() => <Weeks {...this.state}
                                                        setloadingflag={(bool) => this.setloadingflag(bool)}
                                                        setPageFlags={(page) => this.setPageFlags(page)}
                                                        setcurrentterm = {(term) => this.setcurrentterm(term)}
                                                        getcurrenttermdetails={(selectedterm) => this.getcurrenttermdetails(selectedterm)}
                                                        getthistermweeks = {() => this.getthistermweeks()}
                                                        getcurrentgrades={() => this.getcurrentgrades()}
                                                        drawertoggleclickhandler={() => this.drawertoggleclickhandler()}
                                                        rightdrawertoggleclickhandler={() => this.rightdrawertoggleclickhandler()}
                                                        backdropclickhandler = {() => this.backdropclickhandler()}
                                                        rightbackdropclickhandler = {() => this.rightbackdropclickhandler()}
                                                        submitlogout= {() => this.submitlogout()}
                                                        />} /> 
                        <Route exact path="/courses" render={() => <Courses {...this.state}
                                                        setloadingflag={(bool) => this.setloadingflag(bool)}
                                                        setPageFlags={(page) => this.setPageFlags(page)}
                                                        setcurrentterm = {(term) => this.setcurrentterm(term)}
                                                        getcurrenttermdetails={(selectedterm) => this.getcurrenttermdetails(selectedterm)}
                                                        setcourseanddeliverableflags={() => this.setcourseanddeliverableflags()}
                                                        setcoursedeletemodal={(bool) => this.setcoursedeletemodal(bool)}
                                                        getthistermweeks={() => this.getthistermweeks()}
                                                        setcurrentcoursename={(course) => this.setcurrentcoursename(course)}
                                                        submitaddcourse={(newcourse) => this.submitaddcourse(newcourse)}
                                                        deletecoursedetails={() => this.deletecoursedetails()}
                                                        //generateweeksforterm={(term) => this.generateweeksforterm(term)}
                                                        //generategradesforcourse={(term, course) => this.generategradesforcourse(term, course)}
                                                        submitdeletecourse={() => this.submitdeletecourse()}
                                                        submitdeleteweek={(selectedweek) => this.submitdeleteweek(selectedweek)}
                                                        submitupdatecourse={(updatedcourse) => this.submitupdatecourse(updatedcourse)}
                                                        submitupdateweek={(updatedweek) => this.submitupdateweek(updatedweek)}
                                                        rightdrawertoggleclickhandler={() => this.rightdrawertoggleclickhandler()}
                                                        rightbackdropclickhandler = {() => this.rightbackdropclickhandler()}
                                                        submitlogout= {() => this.submitlogout()}
                                                        />} /> 
                        <Route exact path="/deliverables" render={() => <Deliverables {...this.state}
                                                        setloadingflag={(bool) => this.setloadingflag(bool)}
                                                        setPageFlags={(page) => this.setPageFlags(page)}
                                                        setcourseanddeliverableflags={() => this.setcourseanddeliverableflags()}
                                                        setcurrentterm = {(term) => this.setcurrentterm(term)}
                                                        setcurrentcoursename = {(course) => this.setcurrentcoursename(course)}
                                                        setdeliverableischanged = {(bool) => this.setdeliverableischanged(bool)}
                                                        setdeliverableadded = {(bool) => this.setdeliverableadded(bool)}
                                                        setdeliverabletobedeleted = {(deliverable) => {this.setdeliverabletobedeleted(deliverable)}}
                                                        submitadddeliverable = {(deliverable) => this.submitadddeliverable(deliverable)}
                                                        submitupdatedeliverable = {(deliverable) => this.submitupdatedeliverable(deliverable)}
                                                        submitdeletedeliverable = {(deliverable) => this.submitdeletedeliverable(deliverable)}
                                                        rightdrawertoggleclickhandler={() => this.rightdrawertoggleclickhandler()}
                                                        rightbackdropclickhandler = {() => this.rightbackdropclickhandler()}
                                                        modaldeliverablecancelhandler={() => this.modaldeliverablecancelhandler()}
                                                        submitlogout= {() => this.submitlogout()}
                                                        />} /> 
                        <Route exact path="/review-current-week" render={() => <ReviewCurrentWeek {...this.state}
                                                        setloadingflag={(bool) => this.setloadingflag(bool)}
                                                        setPageFlags={(page) => this.setPageFlags(page)}
                                                        setcurrentterm = {(term) => this.setcurrentterm(term)}
                                                        setcurrentweek={(week) => this.setcurrentweek(week)}
                                                        submitupdateweek={(updatedweek) => this.submitupdateweek(updatedweek)}
                                                        submitupdategrade={(updatedgrade) => this.submitupdategrade(updatedgrade)}
                                                        getthisweekdetails={() => this.getthisweekdetails()}
                                                        rightdrawertoggleclickhandler={() => this.rightdrawertoggleclickhandler()}
                                                        rightbackdropclickhandler = {() => this.rightbackdropclickhandler()}
                                                        navbuttonstoggleclickhandler={() => this.navbuttonstoggleclickhandler()}
                                                        submitlogout= {() => this.submitlogout()}
                                                        />} /> 
                        
                       
                    </Switch>
                </section>
        );

    }
        
    }

    export default (withRouter(App));

