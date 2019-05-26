import React from 'react';

import './css/navbar.css';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {

    logout(e) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
    }


    render(){
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">

                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            {this.props.loggedIn !== true ? (
                                <div className="list-horizontal buttons">
                                    <Link className="item btn is-primary" to="/registration">
                                        <strong>Sign up</strong>
                                    </Link>
                                    <Link className="item btn is-light" to="/login">
                                        Log in
                                    </Link>
                                </div>
                            ) : (
                                <div className="list-horizontal buttons">
                                        <Link className="item btn is-primary dashboard" to="/dashboard">
                                                <strong>Dashboard</strong>
                                        </Link>
                                        <Link 
                                            className="item btn is-primary" 
                                            to={{
                                                pathname: '/review-current-week',
                                                state: {
                                                    weekstatus: 'one'
                                            }}}
                                            >
                                            review
                                        </Link>
                                        <Link 
                                            className="item btn is-primary" 
                                            to={{
                                                pathname: '/plan-next-week'
                                            }}
                                            >
                                            plan
                                        </Link>
                                        <Link 
                                            className="item btn is-primary" 
                                            to={{
                                                pathname: '/weeks'
                                                }
                                            }
                                            >
                                            weeks
                                        </Link>
                                        <Link 
                                            className="item btn is-primary" 
                                            to={{
                                                pathname: '/profile',
                                                state: {
                                                    weekstatus: 'all'
                                            }}}
                                            >
                                            profile
                                        </Link>
                                        <Link className="item btn is-light" onClick={this.logout} to="/">
                                            Log out
                                        </Link>
                                            
                                </div>
                                )
                            }
                        </div>
                    </div>
                </div>
             </nav>
        );


    }

    
}




    
   