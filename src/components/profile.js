import React from 'react';
import './css/index.css';
import MainNav from './main-nav';
import Terms from './terms';
import Courses from './courses';
import Weeks from './weeks';

import './css/profile.css';
import { connect } from 'react-redux';

export class Profile extends React.Component {
    render() {
          return (
            <div>
              <MainNav />
              <main role="main">
                  <header role="banner">
                      <h1>Executive Followup</h1>
                      <h3>Take charge of your academic life.</h3>
                  </header>
                  <div className="wrapper">
                      <Terms />
                      <Courses />
                      <Weeks />
                </div>
              </main>
            </div>
          );
    }
}

Profile.defaultProps = {
  title: 'App'
};

export default connect()(Profile);

