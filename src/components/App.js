import React from 'react';
import {connect} from 'react-redux';
import {Route, Link, withRouter} from 'react-router-dom';

import './css/index.css';

import MainNav from './main-nav';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';

import {refreshAuthToken} from '../actions/auth';

export class App extends React.Component {

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
        // When we are logged in, refresh the auth token periodically
        this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
        // Stop refreshing when we log out
        this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
      this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
      this.refreshInterval = setInterval(
          () => this.props.dispatch(refreshAuthToken()),
          60 * 60 * 1000 // One hour
      );
  }

  stopPeriodicRefresh() {
      if (!this.refreshInterval) {
          return;
      }

      clearInterval(this.refreshInterval);
  }
  render(){
    return(
          <div className="app">
              <div>
                  <MainNav />
              </div>
              <header role="banner">
                  <h1><Link to="/">Executive Followup</Link></h1>
              </header>
              <main role="main">
                  <Route exact path="/" component={LandingPage} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/register" component={RegistrationPage} />
              </main>
        </div>
    );   
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));

