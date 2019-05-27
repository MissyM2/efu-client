import React from 'react';

import './css/navbar.css';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {

    logout(e) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
    }

    myFunction() {
        var x = document.getElementById("mainNavbar");
        console.log('navbar: myFunction, x', x);
        /*
        if (x.className === "navbar-menu") {
          x.className += " responsive";
          console.log('navbar: myFunction, x.className', x.className);

        } else {
          x.className = "navbar-menu";
          console.log('navbar: myFunction, x.className', x.className);
        }
        */
      }


    render(){
/*
        <div class="topnav" id="myTopnav">
            <a href="#home" class="active">Home</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
            <a href="javascript:void(0);" class="icon" onclick="myFunction()">
                <i class="fa fa-bars"></i>
            </a>
        </div>
*/
        return (
            <header className="navbar">
            <nav className="navbar_navigation" role="navigation" aria-label="navbar_navigation">
                <div></div>
                <div className="navbar_logo"> <Link className="logo item btn is-primary dashboard" to="/dashboard">
                                                <strong>DASHBOARD HOME</strong>
                                        </Link>
                </div>
                        <div>
                            {this.props.loggedIn !== true ? (
                                <div className="navbar_navigation-items">
                                    <ul>
                                        <li>
                                            <Link className="navitem item btn is-primary" to="/registration">
                                                <strong>Sign up</strong>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="navitem item btn is-light" to="/login">
                                                Log in
                                            </Link>
                                        </li>
                                    </ul>
                                    
                                   
                                </div>
                            ) : (
                                <div className="navbar_navigation-items">
                                    <ul>
                                        <li>
                                            <Link 
                                                className="navitem item btn is-primary" 
                                                to={{
                                                    pathname: '/weeks'
                                                    }
                                                }
                                                >
                                                weeks
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                className="navitem item btn is-primary" 
                                                to={{
                                                    pathname: '/profile',
                                                    state: {
                                                        weekstatus: 'all'
                                                }}}
                                                >
                                                profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="navitem item btn is-light" onClick={this.logout} to="/">
                                                Log out
                                            </Link>
                                        </li>

                                    </ul>
                                       
                                        <Link 
                                            className="navitem tem btn is-primary" 
                                            to={{
                                                pathname: '/review-current-week',
                                                state: {
                                                    weekstatus: 'one'
                                            }}}
                                            >
                                            review
                                        </Link>
                                        <Link 
                                            className="navitem item btn is-primary" 
                                            to={{
                                                pathname: '/plan-next-week'
                                            }}
                                            >
                                            plan
                                        </Link>
                                        
                                        
                                       
                                        <a href="javascript:void(0);" className="icon" onClick={this.myFunction()}>
                                            <i className="fa fa-bars"></i>
                                        </a>
                                            
                                </div>
                                )
                            }
                        </div>
             </nav>
             </header>
        );


    }

    
}




    
   