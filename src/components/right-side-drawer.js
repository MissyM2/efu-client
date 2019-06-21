import React from 'react';

import './css/right-side-drawer.css';

import { Link } from 'react-router-dom';

export default class RightSideDrawer extends React.Component {

   
    render() {
        let drawerClasses = 'right-side-drawer';
        //console.log('rsdrawer, this.props', this.props.show);
        if (this.props.show) {
            console.log('adding classes right-side-drawer open');
            drawerClasses = 'right-side-drawer open';
        }  else {
            drawerClasses='right-side-drawer not-visible';
        }

        //console.log('right-side-drawer: this.props', this.props);
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
                        <div onClick={this.props.click}>
                            <Link 
                                className="drawer-navitem"
                                to={{
                                    pathname: '/courses',
                                    state: {
                                        weekstatus: 'all'
                                }}}
                                click={this.props.rightdrawertoggleclickhandler}
                                >
                                Your Courses
                            </Link>
                        </div>
                       
                    </li>
                    <li className="link-div dels-link" href="/">
                        <div onClick={this.props.click}>
                            <Link 
                                className="drawer-navitem"
                                to={{
                                    pathname: '/deliverables',
                                    }}
                                    click={this.props.rightdrawertoggleclickhandler}
                                >
                                Your Deliverables
                            </Link>
                        </div>
                       
                    </li>
                    <li className="logout logout-link" href="/">
                        <div onClick={this.props.click}>
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