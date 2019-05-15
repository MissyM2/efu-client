import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            displayName: null
        }
    }
    
    componentDidMount() {
            this.setState({
                currentUser: localStorage.getItem('username'),
                displayName: localStorage.getItem('firstname')
            });
    }

    logout(e) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('firstName');
    }


    render(){
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                {/*<div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <h1>
                            <img src="/logo.png" alt="ExecutiveFollowUp Logo" className="logo" />
                        </h1>
                    </Link>
                 <a
                    role="button"
                    className="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </> 
                </div>*/}
    
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            {!this.state.currentUser ? (
                                <div className="buttons">
                                    <Link className="button is-primary" to="/register">
                                        <strong>Sign up</strong>
                                    </Link>
                                    <Link className="button is-light" to="/login">
                                        Log in
                                    </Link>
                                </div>
                            ) : (
                                <div className="buttons">
                                    <a className="button is-light" href="/logout" onClick={this.logout}>
                                        Log out
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        );


    }

    
}




    
   