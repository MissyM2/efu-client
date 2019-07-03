import React from 'react';

import './css/right-side-drawer.css';

import { Link } from 'react-router-dom';

export default class RightSideDrawer extends React.Component {
    
    render() {
        let drawerClasses = 'right-side-drawer';
        if (this.props.rightSideDrawerOpen) {
            drawerClasses = 'right-side-drawer open';
        }  else {
            drawerClasses='right-side-drawer not-visible';
        }

            return (
                    <div className={drawerClasses} >
                        <ul>
                            <li className="username-link username-background" href="/"> 
                                <div className="dropdown-username">
                                    <div>You are signed in as</div>
                                    <div>{this.props.currentusername}</div>
                                </div>
                            </li>
                            <li className="drawer-navitem" href="/">
                                <div onClick={this.props.rightdrawertoggleclickhandler}>
                                    <Link 
                                        className="drawer-navlink"
                                        to={{
                                            pathname: '/courses'
                                        }}
                                        >
                                        Your Courses
                                    </Link>
                                </div>
                            
                            </li>
                            <li className="drawer-navitem" href="/">
                                <div onClick={this.props.rightdrawertoggleclickhandler}>
                                    <Link 
                                        className="drawer-navlink"
                                        to={{
                                            pathname: '/deliverables',
                                            }}
                                        >
                                        Your Deliverables
                                    </Link>
                                </div>
                            
                            </li>
                            <li className="drawer-logoutitem" href="/">
                                <div onClick={this.props.rightdrawertoggleclickhandler}>
                                    <Link className="drawer-logoutlink" onClick={this.props.submitlogout} to="/">
                                        Log out
                                    </Link>
                                </div>
                            
                            </li>
                        </ul>
                    </div>
                );

    }
    
}