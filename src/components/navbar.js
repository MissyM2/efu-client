import React from 'react';

import { API_BASE_URL } from '../config';

import './css/navbar.css';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props); 
    }
/*
    componentDidMount() {
        console.log('navbar: componentDidMount,this.props, ', this.props);
    }

  */  

   

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
                                        <div className="list-horizontal" to="/weeks">
                                            <Link className="item btn is-primary" >
                                                        weeks
                                            </Link>
                                            <Link 
                                                    className="item btn is-primary" 
                                                    to={{
                                                        pathname: '/profile', 
                                                        state: {
                                                            terms: this.props.terms,
                                                    }}}
                                                    >
                                            profile
                                    </Link>
                                        </div>
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




    
   