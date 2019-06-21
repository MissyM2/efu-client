import React from 'react';

import DrawerToggleButton from './drawer-toggle-button';
import RightSideDrawer from './right-side-drawer';

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
            console.log('navbar: this.setSelectedTerm, this.state.termSelected', this.state.termSelected);
                this.props.setcurrentterm(this.state.termSelected);
        });

    }

    render(){

        let availabletermsclasses = 'available-terms-unit navbar-positioning';
       /*  if (!this.props.showNavButtons) {
            availabletermsclasses = 'available-terms-unit not-visible';
        }*/
/*
        let termClasses = 'dropdown unit-container-green';
                // whatever term is in currentterm, the class should be selected
                if (this.props.currentterm === this.props.termDesc) {
                termClasses='dropdown-item selected';
        }
*/
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
        //console.log('navbar: this.props', this.props);
        return (
            <header className="navbar">
            <nav className="navbar_navigation" role="navigation" aria-label="navbar_navigation">
                <div className="navbar-positioning">
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
                </div>
                <div className="navbar-positioning spacer" />
                <div className="navbar-positioning">
                    {this.props.loggedIn === true ? (
                        <div className="navbar_navigation-items terms">
                            <ul className="nav-ul">
                                <li className="navbar-item term-unit">
                                    <div className={availabletermsclasses}>
                                        <div className="navbar-cell dropdown-green-btn btn-full-width fivepx-margin" >
                                                <select className="" value={this.props.currentterm} onChange={this.setSelectedTerm}>
                                                    <option value="-1" selected="true">Select Term</option> 
                                                    {allterms} 
                                                </select>
                                                <i className ="fas fa-caret-down"></i>
                                                
                                        </div>
                                    </div>
                                </li>
                                <li className="navbar-item review-unit">
                                    <div className="navbar-cell review-link">
                                        <Link 
                                            className="green-btn btn-onefifty fivepx-margin" 
                                            to={{
                                                pathname: '/review-current-week',
                                                state: {
                                                    weekstatus: 'one'
                                            }}}
                                            >
                                            Review This Week
                                        </Link>
                                    </div>
                                    <div className="navbar-cell weeks-link">
                                        <Link 
                                            className="green-btn btn-onefifty fivepx-margin" 
                                            to={{
                                                pathname: '/weeks'
                                                }
                                            }
                                            >
                                            Weeks
                                        </Link>
                                    </div>
                                    <div className="spacer" />
                                    <div className="tbl-container">
                                        <div className="navbar-cell navbar_right-toggle-button">
                                            <DrawerToggleButton click={this.props.rightdrawertoggleclickhandler} />
                                        </div>
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




    
   