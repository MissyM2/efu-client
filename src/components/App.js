import React from 'react';
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    withRouter
} from 'react-router-dom';

import './css/app.css'

import MainNav from './main-nav';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
/*import Profile from './profile';
import Weeks from './weeks';*/

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
                <Router>
                    <div className="app">
                            <h2>app</h2>
                            <div>
                                <MainNav />
                            </div>
                            <main role="main">
                                <Route exact path="/" component={LandingPage} />
                                <Route exact path="/dashboard" component={Dashboard} />
                                <Route exact path="/register" component={RegistrationPage} />
                                {/*.<Route exact path="/profile" component={Profile} />
                                <Route exact path="/weeks" component={Weeks} />
                                <Route exact path="/grades" component={Grades} />
                                <Route exact path="/deliverables" component={Deliverables} />*/}
                            </main>
                        </div>
                </Router>  
            );   
        }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));

