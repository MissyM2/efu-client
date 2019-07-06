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
            
            currentsuggestion:[],

            // state: for specific ui 
            rightSideDrawerOpen: false,
            showNavButtons:true,
            dashboardFlag:false,
            deliverablesFlag:false,
            coursesFlag:false,
            weeksFlag:false,
            reviewWeekFlag:false,
           
           // state: login/reg info
            authToken:'',
            currentusername:'',
            error:'',
            isError: false,
            islogin: true,
            loginFailed:false,
            isModal: false,
            loading:false,
            loggedIn: false,
            password: "",
            
            // state: date info
            currentdate:"",
            fCurrentDate:"",
            pCurrentDate:0,
            nextweek: 0,
            nextSunday:"",
            pNextSunday:0,
            followingSunday:"",
            lastSunday:"",
            pLastSunday:0,
            SpringFall:16,
            SummerLong:8,
            SummerShort:4,
            Short:4,
            todaydate:"",

            //state: terms info
            currentterm: "",
            selectingterm:false,
            terms:[],

            //state: weeks info
            currentweek: 1,
            weekUpdated: false,
            selectingweek:false,
            thistermweekcount:0,
            thistermweeks: [],
            thisweekdetailsold:[{
                likedMost:"",
                likedLeast:"",
                mostDifficult:"",
                leastDifficult:""
            }],

            // state: course info
            currentcoursename: '',
            courseAdded:false,
            courseUpdated:false,
            courseDeleted: false,
            courseMessage: "",
            showcoursedeletemodal: false,
            thistermcoursecount:0,
            thistermcourses: [],

            // state: deliverables info
            
            deliverableAdded: false,
            deliverableUpdated:false,
            deliverableDeleted: false,
            deliverableMessage:"",
            currentdeliverable:{
                termDesc:"",
                courseName: "",
                dueDate: null,
                deliverableName: "",
                prephrs: 0,
                desc: "",
                impact:""
            },
            deliverablesUpdated:false,
            allprephrs:[1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            deliverableNames:['Quiz', 'Test', 'Midterm', 'Final', 'Lab/Essay', 'Term Paper/Group Project Final', 'Term Paper/Group-Project Checkpoint', 'Homework', 'Participation'],
            prephrstoday:0,
            prephrsthisweek:0,
            thistermdeliverables:[],
            thiscoursedeliverables:[],
            thisweekdeliverables:[],
            todaydeliverables:[],

            // state: grades info
            gradeAdded: false,
            gradeUpdated: false,
            gradeMessage:"",
            thistermgradecount:0,
            thistermgrades:[],
            thisweekgrades:[],
            thisweekcoursegrades:[]
            
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
        //this.changecurrentweek=this.changecurrentweek.bind(this);
        this.setloadingflag=this.setloadingflag.bind(this);
        this.setdeliverableupdated=this.setdeliverableupdated.bind(this);
        this.setcoursedeletemodal=this.setcoursedeletemodal.bind(this);
        this.setdeliverabletobedeleted=this.setdeliverabletobedeleted.bind(this);
        this.setdeliverableadded=this.setdeliverableadded.bind(this);
        this.setcourseanddeliverableflags=this.setcourseanddeliverableflags.bind(this);
        this.setweekupdated=this.setweekupdated.bind(this);
        this.setdeliverablemessage=this.setdeliverablemessage.bind(this);
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
        //this.getcurrenttermdetails=this.getcurrenttermdetails.bind(this);
        this.submitaddterm=this.submitaddterm.bind(this);

        // for courses AJAX functions
        this.getthistermcourses=this.getthistermcourses.bind(this);
        this.submitaddcourse=this.submitaddcourse.bind(this);
        this.submitupdatecourse=this.submitupdatecourse.bind(this);
        this.submitdeletecourse=this.submitdeletecourse.bind(this);
        this.deletecoursedetails=this.deletecoursedetails.bind(this);

        // for weeks AJAX functions
        this.getthistermweeks=this.getthistermweeks.bind(this);
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
        this.submitdeletecoursedeliverables=this.submitdeletecoursedeliverables.bind(this);
    }


     /******************************************
     *   LOGIN/REG/LOGOUT/STARTUP ROUTINES
     ******************************************/

    // handle login/reg errors
    loginregerrorhandler = (errorStatus) => {
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
    // get dates at startup: does not change through session
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
        let nextSundayFormatted =`${nextSundayDayName}, ${nextSundayMonthName} ${nextSundayDay}`;
        var pNextSunday = Date.parse(nextSunday);
        this.setState({
            fNextSunday: nextSundayFormatted,
            pNextSunday: pNextSunday
        }, () => {
            //console.log('this.state', this.state);
        });
       
    }

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
        .then(res => {
            console.log('insidesumreg, res', res);
            if(res.ok){
                this.setState({
                    error:null,
                    isError: false
                });
                return res.json();
            } else {
                this.loginregerrorhandler(res.status);
            }
            throw new Error('on throw new Error', res.status);
        })
        .then(resJSON => {
            //return registered user name and show login form
           return this.submitlogin(newuser.username, newuser.password);
        })
        .then(res => {
            if(res.ok) {
                this.setloadingflag(false);
            } 
            return res.json;
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
        .then(res => {
            console.log(res);
            if(res.ok){
                this.setState({
                    error: null,
                    isError:false,
                });
            } else {
                this.setState({
                    error:'Login Error:  Either username or password is wrong.  Try again.',
                    isError:true
                });
            }
            return res.json();
        })
        .then(resJSON => {
            return this.setState({
                currentusername: username,
                password: password,
                loggedIn: true,
                loading: true,
                nextweek: this.currentweek + 1,
                authToken: resJSON.authToken,
                selectingterm: true});
        })
        .then(res => {
            console.log('should be getting dates');
            return this.getcurrentdates();
        })
        .then(res => {
            console.log('should have gotten dates', this.state);
            this.getcurrentsuggestion();
            this.props.history.push('/dashboard');
        })
        .catch((err) => {
            console.log('login error', err);
        })
        
    }

    submitlogout() {
       // console.log('this initial state', this.state);
        this.setState(this.initialState, () => {
            //console.log('this.state now', this.state);
        });
    }

    /********************************
     *   SETTERS:  changes throughout session
     *********************************/

    setloadingflag = (bool) => {
        console.log('made it to setloadingflag');
        this.setState({
            loading: bool
        })
    }

    setlogin(e) {
        e.preventDefault();
        const currentState = this.state.islogin;
        this.setState({ 
            islogin: !currentState ,
            error:''
        }); 
    }

    // identifies what page the user is on
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
                    //console.log('this.state.deliverablesFlag', this.state.deliverablesFlag);
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

    // setters for term
    setcurrentterm = (term) => {
        this.setState({
            currentterm:term,
            selectingterm:false,
            }, () => {
                console.log('setcurrentterm');
                this.getcurrentweekdetails();
            });
    }

    // setters for week
    setcurrentweek = (week) => {
        this.setState(
            {
            currentweek:parseInt(week),
            nextweek: parseInt(week) + 1,
            selectingweek:false
            }, () => {
                this.getcurrentweekdetails();
            }
        );
    }
    
    //setters for courses
    setcoursedeletemodal(bool) {
        //console.log('made it to the setcoursedeletemodal');
        this.setState({
          showCourseDeleteModal:bool
        },() => {
            //console.log('this.state.showCourseDeleteModal should be set properly', this.state.showCourseDeleteModal);
        });
    }

    setcurrentcoursename = (course) => {
        this.setState(
            {currentcoursename: course}, 
            () => {
                this.getthistermdeliverables();
            }
        );
    }

    setcourseadded = (bool) => {
        this.setState({
            courseAdded:bool
        },() => {
            //console.log('this.state.showCourseDeleteModal should be set properly', this.state.showCourseDeleteModal);
        });
    }

    setcourseupdated = (bool) => {
        this.setState({
            courseUpdated: bool
        });
    }

    setcoursedeleted = (bool) => {
        this.setState({
            courseDeleted: bool
        });
    }

    setcoursemessage = () => {
        console.log('got to delcourse', this.state.courseMessage);
        /// put logic here
            this.setState({
                    courseMessage: "Select a course from the dropdown and add a deliverable."
            });
        console.log('this.state.courseMessage',this.state.courseMessage);
    }

    //setters for deliverables
    setdeliverableadded = (bool) => {
        this.setState({
            deliverableAdded:bool
        },() => {
            //console.log('this.state.showCourseDeleteModal should be set properly', this.state.showCourseDeleteModal);
        });
    }

    setdeliverableupdated = (bool) => {
        this.setState({
            deliverableUpdated: bool
        });
    }

    setdeliverabledeleted = (bool) => {
        this.setState({
            deliverableDeleted: bool
        });
    }

    setdeliverablemessage = () => {
        console.log('got to delmessage', this.state.deliverableMessage);

        if(this.state.thistermcourses.length === 0) {
            this.setState({
                    deliverableMessage: "There are no courses setup for this term.  Add a course first."
            });
        } else if (this.state.thistermcourses !== 0 && this.state.thistermdeliverables.length === 0) {
            this.setState({
                    deliverableMessage: "There are no deliverables set up for this term. Select a course from the dropdown first."
            });
    } else {
            this.setState({
                    deliverableMessage: "Select a course from the dropdown and add a deliverable."
            });
    }
    console.log('this.state.deliverableMessage',this.state.deliverableMessage);
    }

    setdeliverabletobedeleted(deliverable) {
        console.log('inside setdeliverabletobedeleted', deliverable);
        this.setState({
            currentdeliverable:{
                termDesc: deliverable.termDesc,
                courseName: deliverable.courseName,
                dueDate: deliverable.dueDateFormatted,
                deliverableName: deliverable.deliverableName,
                prephrs: deliverable.prephrs,
                desc: deliverable.desc,
                impact:deliverable.impact
            }
          },() => {
              console.log('this.state.currentdeliverable should be set properly', this.state.currentdeliverable);
          });
    }

    // setters for weeks
    setweekupdated = () => {
        console.log('made it to setweekupdated');
        console.log('this.state', this.state);
        console.log(this.state.weekdetailsold.likedLeast + 
            this.state.weekdetailsold.likedMost +
            this.state.weekdetailsold.mostDifficult +
            this.state.weekdetailsold.leastDifficult);
        
        if (this.state.weekdetailsold.likedLeast !== "" &&
            this.state.weekdetailsold.likedMost !== "" &&
            this.state.weekdetailsold.mostDifficult !== "" &&
            this.state.weekdetailsold.leastDifficult !== "") {
                this.setState({
                    weekUpdated:true
                }, () => {
                    console.log('this.state.weekUpdated', this.state.weekUpdated);
                });
        }
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

    /*****************************************************
     *  GET SUGGESTION ROUTINE
     ****************************************************/
    getcurrentsuggestion() {
        fetch(`${API_BASE_URL}/suggestions`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.state.authToken}`
            }
        })
        .then(res => {
            if(res.ok) {
                    return res.json()
            }
            throw new Error(res.text)
        })
        .then(resJSON => {
            const tempsuggestion = resJSON[Math.floor(Math.random() * resJSON.length)];
            this.setState({
                currentsuggestion: tempsuggestion
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

     /*****************************************************
     *   AGGREGATE ROUTINES FOR GETTING AND DELETING
     ****************************************************/
    deletecoursedetails = () => {
        this.setcoursedeletemodal(false);
        if (this.state.thistermdeliverables.length !== 0) {
                this.submitdeletecoursedeliverables();
        }

        if (this.state.thistermgrades.length !== 0) {
            this.submitdeletecoursegrades();
        }
       
        this.submitdeletecourse();
    }

/*
    getcurrenttermdetails = () => {
        console.log('made it to currentt, currweek', this.state.currentweek);
        this.getcurrentdates();
        this.getcurrentsuggestion();

        //create promise for getting the courses
        new Promise((resolve, reject) => {
            this.getthistermcourses(resolve, reject);
            })
            .then(res => {
                console.log('made it to currentt, currweek', this.state.currentweek);
                return this.getthistermweeks();
            })
            .then(res => {
                console.log('made it to currentt, currweek', this.state.currentweek);
                return this.getcurrentgrades();
            })
            .then(res => {
                console.log('made it to currentt, currweek', this.state.currentweek);
                return this.getthistermdeliverables(); 
            })
            //.then(res => {
            //    return this.setcurrentweek(1);
            //})
            .then(res => {
                return this.getthisweekdetails();
            })
            .then(res => {
                return this.setdeliverablemessage();
            })
            .then(res => {
                return console.log('getcurrentterms routine is complete');
            })
            .catch(err => {
                console.log('Error:' + err.reason + ' at ' + err.location);
            });

        
        
       
    }
    */


    // get weeks for the term and grades for the week
    getcurrentweekdetails = () => {

        console.log('made it to getcurrentweekdetails', this.state);
        new Promise((resolve, reject) => {
            this.getthistermcourses(resolve, reject);
            })
            .then(res => {
                console.log('got term courses,now get week/grade details', this.state);
                return this.getthistermweeks();
            })
            .then(res => {
                console.log('set weekupdated, now get deliverables', this.state);
                return this.getthistermdeliverables(); 
            })
            .then(res => {
                console.log('got deliverables, now set deliverable message', this.state);
                return this.setdeliverablemessage();
            })
            .catch(err => {
                console.log('Error:' + err.reason + ' at ' + err.location);
            });
    }

/*
     // get grades for the week with details for th
     getthisweekgrades = () => {
        fetch(`${API_BASE_URL}/grades`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.state.authToken}`
                }
        })
        .then(res => {
            if(res.ok) {
                    return res.json()
            }
            throw new Error(res.text)
        })
        .then(grades => {
            console.log('thistermweeks', this.state.thistermweeks);
                       const thisweekgrades = grades.filter(grade => {
  //                  return grade.term === this.state.currentterm && grade.week === this.state.currentweek;
    //            });
                console.log('within getthisweekdetails, thisweek looking for values of likes', thisweek);

                this.setState({
                    weekdetailsold: Object.assign({}, this.state.weekdetailsold, {
                        likedLeast: thisweek[0].likedLeast,
                        likedMost: thisweek[0].likedMost,
                        mostDifficult: thisweek[0].mostDifficult,
                        leastDifficult: thisweek[0].leastDifficult
                    })
                });
                       
                   // thisweekgrades: thisweekgrades
                    
                        
                         //   console.log('this.state.weekUpdated, after setState', this.state.weekUpdated);
                        //    this.setState({
                            //    weekUpdated: false
                           // });
                        //} else {
                        //    this.setState({
                         //       weekUpdated: true
                         //   });
                            
                        //}

    })
    }
    */

/*
    getthisweekdetails = () => {
        this.setState({
            weekUpdated: false
        });

        if (this.state.thistermweeks.length !== 0){
            
            let thisweek = this.state.thistermweeks.filter(week => {
                return (week.weekNum + 1) === this.state.currentweek;
            });
            console.log('thisweek[0]', thisweek[0]);
            console.log('within getthisweekdetails, thisweek looking for values of likes', thisweek);

            this.setState({
                weekdetailsold: Object.assign({}, this.state.weekdetailsold, {
                    likedLeast: thisweek[0].likedLeast,
                    likedMost: thisweek[0].likedMost,
                    mostDifficult: thisweek[0].mostDifficult,
                    leastDifficult: thisweek[0].leastDifficult
                })
            });

            } else {
                console.log('there are no weeks and therefore no grades so no weekdetails');
                return;
            }
            
        })
        .catch((err) => {
            console.log(err);
        });       
            
    }
    */

    

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
        .then(res => {
            if(res.ok) {
                    return res.json()
            }
            throw new Error(res.text)
        })
        .then(resJSON => {
            this.setState({
                terms: resJSON
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
        .then(res => {
            if(res.ok) {
                    return res.json()
            }
            throw new Error(res.text)
        })
        .then(resJSON => {
            //console.log('after .then with resJson', resJSON);
            const tempcourses = resJSON.filter(course => {
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

    getthistermweeks = ()  =>{
        // fetching week data and committing it to state:  all weeks for term, then details for given week
        fetch(`${API_BASE_URL}/weeks`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.state.authToken}`
                }
        })
        .then(res => {
            console.log('getthistermweeks: res', res);
            if(res.ok) {
                    return res.json()
            }
            throw new Error(res.text)
        })
        .then(resJSON => {
            console.log('getthistermweeks: resJSON', resJSON);
            const sortedweeks = resJSON
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
        .then(res => {
            //console.log('getthistermweeks: res after getting weeks for term', res);
            this.setState({
                weekUpdated: false
            });
            console.log('weekUpdated', this.state.weekUpdated);
            console.log('thistermweeks.length', this.state.thistermweeks.length);
            console.log('this.state.currentweek', this.state.currentweek);
    
            if (this.state.thistermweeks.length !== 0){
                let thisweek = this.state.thistermweeks.filter(week => {
                    return (week.weekNum) === this.state.currentweek;
                });
                console.log('thisweek', thisweek);
                console.log('thisweek[0]', thisweek[0]);
                console.log('within getthisweekdetails, thisweek looking for values of likes', thisweek);
    
                this.setState({
                    weekdetailsold: Object.assign({}, this.state.weekdetailsold, {
                        likedLeast: thisweek[0].likedLeast,
                        likedMost: thisweek[0].likedMost,
                        mostDifficult: thisweek[0].mostDifficult,
                        leastDifficult: thisweek[0].leastDifficult
                    })
                }, () => {
                    console.log('weekupdated ', this.state.weekdetailsold);
                });
            }
        })
        .then(res => {
            console.log('made it to after setting state on weekdetailsold');
            return this.setweekupdated();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    

    // get grades for the term, week, and course 
    getcurrentgrades() {
        fetch(`${API_BASE_URL}/grades`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.state.authToken}`
                }
        })
        .then(res => {
            if(res.ok) {
                    return res.json()
            }
            throw new Error(res.text)
        })
        .then(grades => {
            const temptermgrades = grades.filter(grade => {
                    return grade.term === this.state.currentterm;
            });
            const tempweekgrades = grades.filter(grade => {
                return grade.term === this.state.currentterm && grade.week === this.state.currentweek;
            });

            const tempcoursegrades = grades.filter(grade => {
                return grade.term === this.state.currentterm && 
                        grade.week === this.state.currentweek &&
                        grade.course === this.state.currentcoursename;
            })
            return this.setState ({
                    thistermgrades: temptermgrades,
                    thisweekgrades: tempweekgrades,
                    thisweekcoursegrades:tempcoursegrades,
                    thistermgradecount: temptermgrades.length
                }); 
        })
        .catch((err) => {
            console.log('there are no grades', err);
        });
    }

    

    // get all deliverables for the term
    getthistermdeliverables() {

        fetch(`${API_BASE_URL}/deliverables`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.state.authToken}`
            }
        })
        .then(res => {
            if(res.ok) {
                    return res.json()
            }
            throw new Error(res.text)
        })
        .then(resJSON => {
            // get deliverables for the term
                    console.log('getthistermdeliverables: resJSON', resJSON);
                    const temptermdeliverables = resJSON.filter(deliverable => {
                        return deliverable.termDesc === this.state.currentterm;
                    });
                    this.setState({
                        thistermdeliverables: temptermdeliverables
                    }, () => {
                        //console.log('getthistermdeliverables: temptermdeliverables', temptermdeliverables);
                    });

            //get deliverables for the week
                    
                    const tempweekdeliverables = resJSON.filter(deliverable => {
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
                        const tempcoursedeliverables = resJSON.filter(deliverable => {
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
                    const temptodaydeliverables = resJSON.filter(deliverable => {
                        let deliverableDate = deliverable.dueDate.split('T')[0];
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
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error(res.text)
                })
                .then(resJSON => {
                    this.setState((resJSON) => ({
                        terms: [...this.state.terms, resJSON]
                    }));
                    return resJSON;
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
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error(res.text)
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
        .then(resJSON =>  {
            return this.getcurrenttermdetails();          
        })
        .then(res => {
            if(res.ok){
                return res.json();
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
        .then(res => {
                if(res.ok) {
                        return res.json()
                }
                throw new Error(res.text)
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
                        likedLeast: "",
                        likedMost: "",
                        mostDifficult: "",
                        leastDifficult: ""
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
                    .then(res => {
                        if(res.ok){
                            return res.json();
                        }
                        throw new Error(res.text)
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
                        .then(res => {
                            if(res.ok) {
                                    return res.json()
                            }
                            throw new Error(res.text)
                        })
                        /*.then(grade => {
                            this.setState({
                                currentgrades: [...this.state.currentgrades, grade],
                                thistermgradecount: this.state.thistermgradecount + 1
                                }, () => {
                                    console.log('this.is after the addition of one grade to the state, currentggrades', this.state.currentgrades);
                                });
                        })
                        */
                        .catch((err) => {
                            console.log(err);
                        }); 
            
                    }
                    console.log('this.state.currentgrades, next getcurrentgrades', this.state.currentgrades);
                    this.getcurrentgrades(); 
    }

    /******************************************
     *      DELETE FUNCTIONS FOR ENDPOINTS
     *      
     *******************************************/

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
            .then(res => {
                if(res.ok) {
                        return res.json()
                }
                throw new Error(res.text)
            })
            .then(resJSON => {
                const tempcourses = resJSON.filter(course => {
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
         .then(res => {
             if(res.ok) {
                     return res.json()
             }
             throw new Error(res.text)
         })
         .then(resJSON => {
             this.setState({
                 delDeleted:true
             });

             const tempdeliverables = resJSON.filter(deliverable => {
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
            .then(res => {
                if(res.ok) {
                        return res.json()
                }
                throw new Error(res.text)
            })
            .then(resJSON => {
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

    submitdeletecoursedeliverables = () => {
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
            .then(res => {
                console.log('deletedeliverables res', res);
                if(res.ok) {
                        return res.json()
                }
                throw new Error(res.text)
            })
            .then(resJSON => {
               console.log('resJSON after deleting deliverables', resJSON);
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
 

    

    

    

    submitdeleteweek = (selectedweek) => {
        //console.log('made it to delete Week selectedweek ', selectedweek)
        fetch(`${API_BASE_URL}/weeks`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${this.state.authToken}`,
                    'Content-Type': 'application/json'},
                body: JSON.stringify(selectedweek)
            })
            .then(res => {
                console.log('res', res);
                if(res.ok) {
                        return res.json()
                }
                throw new Error(res.text)
            })
            .then(resJSON => {
                const tempweeks = resJSON.filter(week => {
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
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error(res.text)
        })
        .then(resJSON =>  {
                this.getcurrenttermdetails();          
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
        
    submitupdateweek = (updatedweek) => {
        console.log('made it to updated week', updatedweek);
        fetch(`${API_BASE_URL}/weeks`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${this.state.authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(updatedweek)
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error(res.text)
        })
        .then(resJSON =>  {
            console.log('upweek, resJSON', resJSON);
            const tempweeks = resJSON.filter(week => {
                return week.termDesc === this.state.currentterm && week.weekNum === this.state.currentweek;
            });
            this.setState({
                weeks: tempweeks
            }, () => {
                console.log('state should be set for weeks:  ', this.state.weeks + ' ' +  this.state.currentweek);
            });
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
            .then(res => {
                if(res.ok) {
                        return res.json()
                }
                throw new Error(res.text)
            })
            .then(resJSON => {
                return this.setcurrentweek(updatedgrade.weekNum);
            })
            .then(res => {
                if(res.ok){
                    return res.json();
                }
                throw new Error(res.text)
            })
            .then(resJSON =>  {
                this.getcurrenttermdetails();          
            })
            .then(res => {
                if(res.ok){
                    return res.json();
                }
                throw new Error(res.text)
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
        .then(res => {
            console.log('res is ', res);
            if(res.ok) {
                    return res.json()
            }
            throw new Error(res.text)
        })
        .then(resJSON =>  {
            console.log('resJSON', resJSON);
            this.setdeliverableupdated(true);
            return this.getthistermdeliverables();          
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error(res.text)
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
                                                        setdeliverableupdated = {(bool) => this.setdeliverableupdated(bool)}
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
                                                        setdeliverableupdated = {(bool) => this.setdeliverableupdated(bool)}
                                                        setdeliverabletobedeleted = {(deliverable) => {this.setdeliverabletobedeleted(deliverable)}}
                                                        submitupdatedeliverable = {(deliverable) => this.submitupdatedeliverable(deliverable)}
                                                        getcurrentweekdetails={() => this.getcurrentweekdetails()}
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
                                                        setdeliverableupdated = {(bool) => this.setdeliverableupdated(bool)}
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
                                                        getcurrenttermdetails={() => this.getcurrenttermdetails()}
                                                        getcurrentweekdetails={() => this.getcurrentweekdetails()}
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

