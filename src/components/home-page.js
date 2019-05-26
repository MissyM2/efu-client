import React from "react";

import LoginPage from './login-page';

class HomePage extends React.Component {

    render() {
        return (
            <main>
              <div className="container">
                  <h2>Executive Followup HomePage</h2>
                  <p className="homepage">
                  Welcome to Executive Followup, a site for students to keep control of their 
                  course deliverables and grades
                  </p>
                  <LoginPage submitLogin={(username, password) => this.props.submitLogin(username, password)}/>
              </div>
          </main>

        );
    }
}
      
export default HomePage;
