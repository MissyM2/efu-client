import React from 'react';
//import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

import './css/main-nav.css';

export function profileNav(props) {

    const terms = props.termList.map((singleterm, index) => 
    <li className="term-menu-list-item" key={term.id}>
        <Link to={`/${singleterm.termId}`}><SingleTerm onClick={e => this.onClick(term)} index={index} {...singleterm} /></Link> 
    </li>

    );

        return (

            <div className="profile-nav">
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



    
   