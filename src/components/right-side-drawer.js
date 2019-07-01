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
                            <li className="link-div username-link" href="/"> 
                                <div className="dropdown-username drawer-navitem">
                                    <div>You are signed in as</div>
                                    <div>{this.props.user}</div>
                                </div>
                            </li>
                            <li className="link-div courses-link" href="/">
                                <div onClick={this.props.rightdrawertoggleclickhandler}>
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
                            <li className="link-div dels-link" href="/">
                                <div onClick={this.props.rightdrawertoggleclickhandler}>
                                    <Link 
                                        className="drawer-navitem"
                                        to={{
                                            pathname: '/deliverables',
                                            }}
                                        >
                                        Your Deliverables
                                    </Link>
                                </div>
                            
                            </li>
                            <li className="logout logout-link" href="/">
                                <div onClick={this.props.rightdrawertoggleclickhandler}>
                                    <Link className="link-logout" onClick={this.props.submitlogout} to="/">
                                        Log out
                                    </Link>
                                </div>
                            
                            </li>
                        </ul>
                    </div>
                );

    }
    
}