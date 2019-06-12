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
                    <li className="link-div" href="/"> 
                        <div>
                            <Link 
                                className="drawer-navitem"
                                to={{
                                    pathname: '/weeks'
                                    }
                                }
                                >
                                Your Weeks
                            </Link>
                        </div>
                    </li>
                    
                    <li className="link-div" href="/">
                        <div>
                            <Link 
                                className="drawer-navitem"
                                to={{
                                    pathname: '/courses',
                                    state: {
                                        weekstatus: 'all'
                                }}}
                                >
                                Your Courses
                            </Link>
                        </div>
                       
                    </li>
                    <li className="link-div" href="/">
                        <div>
                            <Link 
                                className="drawer-navitem"
                                to={{
                                    pathname: '/deliverables',
                                    }}
                                >
                                Deliverables
                            </Link>
                        </div>
                       
                    </li>
                    <li className="logout" href="/">
                        <div>
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