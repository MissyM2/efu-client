import React from 'react';

import './css/navbar.css';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            displayName: null,
            currentterm: '',
            currentweeks: [],
            currentcourses: [],
            currentgrades: []
        }
        this.setData = this.setData.bind(this);
    }
   
    componentDidMount() {
            this.setState({
                currentUser: localStorage.getItem('username'),
                displayName: localStorage.getItem('firstname')
            });
            this.setData();
    }

    setData(){
        this.setState ({
            currentterm: this.props.currentterm,
            currentweeks: this.props.currentweeks,
            currentcourses: this.props.currentcourses,
            currentgrades: this.props.currentgrades
        });

    }

    logout(e) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
    }


    render(){
        console.log('in navbar props from dashboard ', this.props);
        console.log('in navbar state ', this.state);
        
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">


                <button onClick={this.setData}>setData</button>     
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
                                    <Link className="item btn is-primary" to="/register">
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
                                    <div className="list-horizontal">
                                    <Link className="item btn is-primary" 
                                        to={{
                                            pathname: '/weeks', 
                                            state: {
                                                currentterm: this.props.currentterm,
                                                currentweeks: this.props.currentweeks,
                                                currentcourses: this.props.currentcourses,
                                                currentgrades: this.props.currentgrades,
                                            },
                                        }} >
                                                weeks
                                    </Link>
                                <Link 
                                    className="item btn is-primary" 
                                    to={{
                                        pathname: '/profile', 
                                        state: { 
                                            currentterm: this.props.currentterm,
                                            terms: this.props.terms,
                                            currentcourses: this.props.currentcourses, 
                                            currentweeks: this.props.currentweeks
                                        }
                                    }}
                                    submitaddterm={this.submitAddTerm}
                                    submitaddcourse={this.submitAddCourse}
                                    submitaddweek={this.submitAddWeek}
                                    >
                                        profile
                                </Link>
                        </div>
                                    <Link className="item btn is-light" onClick={this.logout} to="/login">
                                        Log out
                                    </Link>
                                    {/*<a className="item btn is-light logout" href="/logout" onClick={this.logout}>
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




    
   