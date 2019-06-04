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
        //this.props.getcurrentweeks(this.props.currentterm);
        //this.props.getcurrentterm(this.props.currentterm);
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

        let availabletermsclasses = 'available-terms-unit';
        if (!this.props.showNavButtons) {
            availabletermsclasses = 'available-terms-unit not-visible';
        }

        let termClasses = 'dropdown-large';
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
                                            <div className={availabletermsclasses}>
                                                <div>Available Terms</div>
                                                <select className="term-row dropdown-large" value={this.props.currentterm} onChange={this.setSelectedTerm}>
                                                        {allterms} 
                                                </select>
                                            </div>

                                        </li>
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




    
   