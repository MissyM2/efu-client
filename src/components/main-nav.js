import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

import './css/index.css';

export class MainNav extends React.Component {

    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
        }

        return (
            <div className="main-nav">
                <h3 id="nav-logo"><Link to="/">ExecutiveFollowup</Link></h3>
                <h3 id="view-past-weeks"><Link to="/weeks">Weeks</Link></h3>
                <h3 id="update-profile"><Link to="/profile">Profile</Link></h3>
                {logOutButton}
            </div> 
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(MainNav);



    
   