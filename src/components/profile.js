import React from 'react';
import './css/index.css';
import MainNav from './main-nav';
import SchoolTerm from './school-term';
import TermClass from './term-class';
import Week from './week';

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
                <SchoolTerm />
                <TermClass />
                <Week />
          </div>
        </main>
      </div>
    );
  }

