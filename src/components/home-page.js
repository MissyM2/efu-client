import React from "react";
import './css/home-page.css';

import BackdropBlue from './backdrop-blue';
import LoginPage from './login-page';
import RegistrationPage from './registration-page';

class HomePage extends React.Component {
    render() {
        return (
              <div className="homepage-container">
                  <BackdropBlue />
                                <div className="logo-container">
                                    <div className="logo-image-div">
                                        <img className="logo-image" src={require("./assets/lightbulb.png")}  alt="Executive Followup Logo" />
                                    </div>
                                    <div className="title-div">
                                        <div className="homepage-welcome">Welcome to</div>
                                        <div className="homepage-title">Executive Followup</div>

                                    </div>
                                    <h3 className="homepage-tagline">
                                        The app for students to get control of their 
                                        course deliverables and grades
                                    </h3>
                                    
                                </div>
                                    
                                    {(this.props.islogin) ? (
                                            <LoginPage 
                                                    {...this.props} 
                                                    submitlogin={(username, password) => this.props.submitlogin(username, password)}
                                                />
                                    ) : (
                                            <RegistrationPage 
                                                {...this.props} 
                                                submitregistration={(firstName, lastName, username, password) => this.props.submitregistration(firstName, lastName, username, password)}
                                                />
                                    )
                                    }
              </div>
        );
    }
}
      
export default HomePage;
