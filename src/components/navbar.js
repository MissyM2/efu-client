import React from 'react';

import DrawerToggleButton from './drawer-toggle-button';
import SideDrawer from './side-drawer';

import './css/navbar.css';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                termSelected:'',
        }
        this.setSelectedTerm = this.setSelectedTerm.bind(this);
}

    componentDidMount() {
        this.setState({
            termSelected:this.props.currentterm
        })
    }

    setSelectedTerm(e) {
        e.preventDefault();
        this.setState({
            termSelected: e.target.value
        }, () => {
                this.props.setcurrentterm(this.state.termSelected);
        });
    }

    render(){

        let availabletermsclasses = 'available-terms-unit navbar-positioning';
       /*  if (!this.props.showNavButtons) {
            availabletermsclasses = 'available-terms-unit not-visible';
        }*/

        let termClasses = 'dropdown unit-container-green';
                // whatever term is in currentterm, the class should be selected
                if (this.props.currentterm === this.props.termDesc) {
                termClasses='dropdown-item selected';
        }

        const allterms = this.props.terms.map((term, index) => {
            return (
                    <option 
                            key={index}
                            value={term.termDesc}
                            className={termClasses}
                            data-identifier={term.termDesc}
                            onChange={this.setSelectedTerm}
                    >
                            {term.termDesc}
                    </option>
            );
        });
        return (
            <header className="navbar">
            <nav className="navbar_navigation" role="navigation" aria-label="navbar_navigation">
                <div className="navbar-unit-one">
                        <div className="navbar_toggle-button">
                            <DrawerToggleButton click={this.props.drawertoggleclickhandler} />
                        </div>
                        <div className="navbar_logo navbar-positioning">
                                <Link className="logo-group link logo" to="/dashboard">
                                    <div className="logo-nav">
                                        <img className="logo-nav-image" src={require("./assets/lightbulb.png")}  alt="Executive Followup Logo" />
                                    </div>
                                    <div className="logo-verbage">
                                        Executive FollowUp
                                    </div>
                                        
                                </Link>
                        </div>
                </div>
                <div className="spacer navbar-positioning" />
                <div>
                    {this.props.loggedIn === true ? (
                        <div className="navbar_navigation-items">
                            <ul>
                                <li className="navbar-term-label">
                                    <div className="navbar-positioning item">Term in View
                                    </div>
                                </li>
                                <li>
                                    <div className={availabletermsclasses}>
                                        <div >
                                                <select className="dropdown unit-container-green" value={this.props.currentterm} onChange={this.setSelectedTerm}>
                                                    <option value="-1" selected="true">Select Term</option> 
                                                    {allterms} 
                                                </select>
                                        </div>
                                    </div>

                                </li>
                                <li className="navbar-weeks other-link">
                                    <div className="navbar-positioning navbar-item">
                                        <Link 
                                            className="green-btn" 
                                            to={{
                                                pathname: '/weeks'
                                                }
                                            }
                                            >
                                            Weeks
                                        </Link>
                                    </div>
                                    
                                </li>
                                <li className="navbar-courses other link">
                                    <div className="navbar-positioning navbar-item">
                                        <Link 
                                            className="green-btn" 
                                            to={{
                                                pathname: '/courses',
                                                state: {
                                                    weekstatus: 'all'
                                            }}}
                                            >
                                            Courses
                                        </Link>
                                    </div>
                                </li>
                                <li className="navbar-courses other link">
                                    <div className="navbar-positioning navbar-item">
                                        <Link 
                                            className="green-btn" 
                                            to={{
                                                pathname: '/deliverables',
                                                }}
                                            >
                                            Deliverables
                                        </Link>
                                    </div>
                                </li>
                                <li className="navbar-logout">
                                    <div className="navbar-positioning navbar-item">
                                        <Link className="link navitem blue-btn" onClick={this.props.submitlogout} to="/">
                                            Logout
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        ) : (
                            <div>what to do if not logged in</div>
                        )
                    }
                </div>
             </nav>
             </header>
        );


    }

    
}




    
   