import React from "react";

import {API_BASE_URL} from '../config';

import LoginPage from './login-page';



class HomePage extends React.Component {
    constructor(props) {
        super(props);
        //this.state={
         //   username:'',
         //   password: '',
         //   loggedIn: false,
         //   error: null,
          //  loading: false,
          //  currentterm: "",
          //  currentweek: 0,
          //  nextweek: this.currentweek + 1,
        }


    

    render() {
        console.log('homepage: this.props', this.props);
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
