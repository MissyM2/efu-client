import React from 'react';
import './css/index.css';
import MainNav from './main-nav';
import SchoolTerm from './school-term';
import TermCourse from './term-course';
import Week from './week';

import './css/profile.css';
import { connect } from 'tls';

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
                  <div class="wrapper">
                      <SchoolTerm />
                      <TermCourse />
                      <Week />
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

