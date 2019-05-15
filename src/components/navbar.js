import React from 'react';

import './css/navbar.css';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            displayName: null
        }
    }
    
    componentDidMount() {
            this.setState({
                currentUser: localStorage.getItem('username'),
                displayName: localStorage.getItem('firstname')
            });
    }

    logout(e) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
    }


    render(){
        console.log('props from dashboard ', this.props);
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                {/*<div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <h1>
                            <img src="/logo.png" alt="ExecutiveFollowUp Logo" className="logo" />
                        </h1>
                    </Link>
                 <a
                    role="button"
                    className="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </> 
                </div>*/}
    
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            {!this.state.currentUser ? (
                                <div className="list-horizontal buttons">
                                    <Link className="item button is-primary" to="/register">
                                        <strong>Sign up</strong>
                                    </Link>
                                    <Link className="item button is-light" to="/login">
                                        Log in
                                    </Link>
                                </div>
                            ) : (
                                <div className="list-horizontal buttons">
                                    <Link className="item button is-primary dashboard" to="/dashboard">
                                            <strong>Dashboard</strong>
                                    </Link>
                                    <div className="list-horizontal">
                                <Link className="item button is-primary" to={{
                                pathname: "/weeks",
                                state: {
                                    currentweeks: this.state.currentweeks
                                }}}>
                                            weeks
                                </Link>
                                <Link 
                                    className="item button is-primary" 
                                    to={{
                                        pathname: '/profile', 
                                        state: { 
                                            terms: this.state.terms,
                                            currentcourses: this.state.currentcourses, 
                                            currentweeks: this.state.currentweeks
                                        }
                                    }}
                                    submitAddTerm={this.submitAddTerm}
                                    submitAddCourse={this.submitAddCourse}
                                    submitAddWeek={this.submitAddWeek}
                                    >
                                        profile
                                </Link>
                        </div>
                                    <Link className="item button is-light" onClick={this.logout} to="/login">
                                        Log out
                                    </Link>
                                    {/*<a className="item button is-light logout" href="/logout" onClick={this.logout}>
                                        Log out
                            </a> */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        );


    }

    
}




    
   