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
                        <Link 
                            className="link drawer-navitem" 
                            to={{
                                pathname: '/weeks'
                                }
                            }
                            >
                            Review Your Weeks
                        </Link>
                    </li>
                    <li href="/">
                        <Link 
                            className="link drawer-navitem" 
                            to={{
                                pathname: '/profile',
                                state: {
                                    weekstatus: 'all'
                            }}}
                            >
                            Your Profile
                        </Link>
                    </li>
                    <li className="logout" href="/">
                        <Link className="link-logout is-light" onClick={this.props.submitlogout} to="/">
                            Log out
                        </Link>
                    </li>
                </ul>
            </nav>
        );

    }
    
}