import React from 'react';

import DrawerToggleButton from './drawer-toggle-button';
import Suggestion from './suggestion';

import './css/navbar.css';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                termSelected:''
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


        let weeksLinkClasses;
        if(this.props.weeksFlag) {
            weeksLinkClasses = "green-navbar-btn weeks-showing" ;
        } else {
            weeksLinkClasses = "green-navbar-btn" ;
        }

        let reviewweekLinkClasses;
        if(this.props.reviewWeekFlag) {
            reviewweekLinkClasses = "green-navbar-btn reviewweek-showing" ;
        } else {
            reviewweekLinkClasses = "green-navbar-btn fivepx-margin"; 
        }


        let availabletermsclasses = 'available-terms-unit navbar-positioning';
        const allterms = this.props.terms.map((term, index) => {
            return (
                    <option 
                            key={index}
                            value={term.termDesc}
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
                <div className="logo-navbar-positioning">
                        <div className="navbar-item navbar_logo ">
                                <Link className="logo-group link logo" to="/dashboard">
                                    <div className="logo-nav">
                                        <img className="logo-nav-image" src={require("./assets/lightbulb.png")}  alt="Executive Followup Logo" />
                                    </div>
                                    <div className="logo-verbage">
                                        Executive FollowUp
                                    </div>
                                        
                                </Link>
                        </div>
                        <div className="navbar-positioning spacer" />
                        <div className="suggestion-div">
                            <Suggestion {...this.props} />
                        </div>
                        
                </div>
                
                <div className="navbar-positioning">
                    {this.props.loggedIn === true ? (
                        <div className="navbar_navigation-items terms">
                            <ul className="nav-ul">
                                <li className="navbar-item term-unit">
                                    <div className={availabletermsclasses}>
                                        <div className="hundredpercent-width fivepx-margin">
                                                <select
                                                    className="hundredpercent-width"
                                                    defaultValue="DEFAULT" 
                                                    onChange={this.setSelectedTerm}
                                                >
                                                        <option value="DEFAULT" disabled>Select Term</option> 
                                                        {allterms} 
                                                </select>
                                                
                                        </div>
                                    </div>
                                </li>
                                <li className="navbar-item review-unit">
                                    <div className="navbar-cell review-link">
                                        <Link 
                                            className={reviewweekLinkClasses}
                                            to={{
                                                pathname: '/review-current-week'
                                                }
                                            }
                                            >
                                            Update Week
                                        </Link>
                                    </div>
                                    <div className="navbar-cell weeks-link">
                                        <Link 
                                            className={weeksLinkClasses}
                                            to={{
                                                pathname: '/weeks'
                                                }
                                            }
                                            >
                                            View Weeks
                                        </Link>
                                    </div>
                                    <div className="navbar-cell spacer-hamburger"></div>
                                    <div className="navbar-cell navbar_right-toggle-button fivepx-margin">
                                        <DrawerToggleButton 
                                            {...this.props}
                                            rightdrawertoggleclickhandler={this.props.rightdrawertoggleclickhandler} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
             </nav>
             </header>
        );


    }

    
}




    
   