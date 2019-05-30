import React from "react";
import './css/home-page.css';

import LoginPage from './login-page';
import RegistrationPage from './registration-page';

class HomePage extends React.Component {
    render() {
        return (
              <div className="container">
                    <div className="fifty-percent-container">
                        <h2>Executive Followup HomePage</h2>
                        <h3 className="homepage">
                        Welcome to Executive Followup, a site for students to keep control of their 
                        course deliverables and grades
                        </h3>
                        
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
              </div>
        );
    }
}
      
export default HomePage;
