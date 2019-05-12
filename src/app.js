import React, { useEffect, useState } from 'react';
import './app.css';



import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './components/home-page';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Register from './components/register';
import Profile from './components/profile';


import Weeks from './components/weeks';
import Courses from './components/courses';
import Suggestions from './components/suggestions';
import ReviewCurrentWeek from './components/review-current-week';
import PlanNextWeek from './components/plan-next-week';


function App() {

    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

    useEffect(() => {
       setFirebaseInitialized = true;
    }

    return firebaseInitialized !== false ? (
        <section className="app-wrapper">
            <Router>
                <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/weeks" component={Weeks} />
                            {/*<Route exact path="/terms" component={Terms} />*/}
                            <Route exact path="/courses" component={Courses} />
                            <Route exact path="/suggestions" component={Suggestions} />
                            <Route exact path="/reviewcurrentweek" component={ReviewCurrentWeek} />
                            <Route exact path="/plannextweek" component={PlanNextWeek} />
                            {/*} <Route exact path="/:termId" component={CourseList} />
                            <Route exact path="/:termId" component={WeekList} /> */}
                </Switch>    
            </Router> 
        </section> 
    ) : (
        <header className="app-header" id="header" title="Header">
            <p>Another Paragraph</p>
            <h1>Executive Followup</h1>
            <p className="loading">Loading...</p>
        </header>
    ); 

}

export default App;                           