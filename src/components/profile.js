import React from 'react';
import './css/index.css';
import MainNav from './main-nav';
import ProfileNav from './profile-nav';
import WeekList from './week-list';
import CourseList from './course-list';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import './css/profile.css';
import { connect } from 'react-redux';

export default class Profile extends React.Component {

    render() {
          return (
            <Router>
              <div className="terms">
                <MainNav />
                <ProfileNav />
                <main>
                  {/*<Switch> 
                    <Redirect exact from ="/" to="/Spring, 2019" />*/}
                        <Route 
                          exact 
                          path="/:termId" 
                          component={CourseList} />
                        <Route 
                          exact 
                          path="/:termId" 
                          component={WeekList} />

                 {/* </Switch> */}
                     
                </main>
              </div>
            </Router>
          );
    }
}
