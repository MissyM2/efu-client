import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './css/index.css';
import MainNav from './main-nav';
import LandingLogin from './landing-login';

export default function App(props) {
  return (
    <Router>
        <div>
        <MainNav />
            <main role="main">
                <header role="banner">
                    <h1>Executive Followup</h1>
                    <h3>Take charge of your academic life.</h3>
                </header>
                <div class="wrapper">
                    <section class="header-section">
                            <div>
                                <h3>Plan and track your academic progress with small, achievable goals and collaborating with a mentor.</h3>
                            </div>
                            <div class="skills-suggestion">Today's Reminder:  <em>Using pen and paper to write things down, 
                                    instead of taking notes on a laptop, helps boost memory retention.</em></div>
                    </section>
                    <section>
                      <LandingLogin />
                    </section>
                </div>
            </main>
        </div>
    </Router>
      
    );
  }

