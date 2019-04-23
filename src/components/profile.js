import React from 'react';
import './css/index.css';
import MainNav from './main-nav';
import SchoolTermForm from './schoolterm-form';
import TermCourse from './term-course';
import WeekForm from './week-form';

export default function App(props) {
  return (
      <div>
        <MainNav />
        <main role="main">
            <header role="banner">
                <h1>Executive Followup</h1>
                <h3>Take charge of your academic life.</h3>
            </header>
            <div class="wrapper">
                <SchoolTermForm />
                <TermCourse />
                <WeekForm />
          </div>
        </main>
      </div>
    );
  }

