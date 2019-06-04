import React from 'react';

import DrawerToggleButton from './drawer-toggle-button';
import SideDrawer from './side-drawer';

import './css/navbar.css';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {

    render(){
        return (
            <header className="navbar">
            <nav className="navbar_navigation" role="navigation" aria-label="navbar_navigation">
                <div className="navbar_toggle-button">
                    <DrawerToggleButton click={this.props.drawertoggleclickhandler} />
                </div>
                <div className="navbar_logo">
                        <Link className="logo-group link logo" to="/dashboard">
                            <div className="logo-nav">
                                <img className="logo-nav-image" src={require("./assets/lightbulb.png")}  alt="Executive Followup Logo" />
                            </div>
                            <div className="logo-verbage">
                                Back to Dashboard
                            </div>
                                
                        </Link>
                </div>
                <div className="spacer" />
                        <div>
                            {this.props.loggedIn === true ? (
                                <div className="navbar_navigation-items">
                                    <ul>
                                        <li>
                                            <Link 
                                                className="link navitem item btn" 
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
                                                className="link navitem item btn" 
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
                                            <Link className="link navitem item btn is-light" onClick={this.props.submitlogout} to="/">
                                                Log out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                ) : (
                                    <div>this is a joke</div>
                                )
                            }
                        </div>
             </nav>
             </header>
        );


    }

    
}




    
   