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

import './css/index.css';
import './css/profile.css';
import { connect } from 'react-redux';

export class Profile extends React.Component {

    render() {
          return (
            <Router>
              <div className="terms">
              <div className="profile-header">
                <h2>{this.props.firstname}'s Profile</h2>
                <p>add, update and delete information on the following:</p>
                <div class="center">
                    <ul className="list-vertical profile-list">
                          <li>term</li>
                          <li>courses you are taking</li>
                          <li>the weeks of the term</li>
                  </ul>
                </div>
                 
            </div>
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

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
      title: "Your Profile",
      firstname: currentUser.firstName
  };
};

export default connect(mapStateToProps)(Profile);