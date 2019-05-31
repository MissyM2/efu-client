import React from 'react';

import './css/side-drawer.css';

import { Link } from 'react-router-dom';

export default class SideDrawer extends React.Component {

   
    render() {
        let drawerClasses = 'side-drawer';
        if (this.props.show) {
            drawerClasses = 'side-drawer open';
        }
    return (
            <nav className={drawerClasses}>
                <ul>
                    <li href="/"> 
                        <div className="link-div">
                            <Link 
                                className="drawer-navitem"
                                to={{
                                    pathname: '/weeks'
                                    }
                                }
                                >
                                Review Your Weeks
                            </Link>
                        </div>
                    </li>
                    <li>
                        <hr />
                    </li>
                    <li href="/">
                        <div className="link-div">
                            <Link 
                                className="drawer-navitem"
                                to={{
                                    pathname: '/profile',
                                    state: {
                                        weekstatus: 'all'
                                }}}
                                >
                                Your Profile
                            </Link>
                        </div>
                       
                    </li>
                    <li className="logout" href="/">
                        <div className="link-div">
                            <Link className="link-logout" onClick={this.props.submitlogout} to="/">
                                Log out
                            </Link>
                        </div>
                       
                    </li>
                </ul>
            </nav>
        );

    }
    
}