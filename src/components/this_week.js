import React from 'react';
import {
        BrowserRouter as Router,
        Route,
        Redirect,
        Switch
} from 'react-router-dom';

export default function ThisWeek(props) {
    return (
        <Router>
                <section>
                <h2>This Week</h2>
                        <div class="details">
                                <div class="prep">
                                        <h3>Hours of Prep Needed This Week: 12</h3>
                                        <p>Mon:  Biology: 1.5 hours</p>
                                        <p>Mon:  English 1.5 hours</p>
                                        <p>Tue:  Biology: 1.5 hours</p>
                                        <p>Tue:  English 1.5 hours</p>
                                        <p>Wed:  Biology: 1.5 hours</p>
                                        <p>Wed:  English 1.5 hours</p>
                                        <p>Wed:  Biology: 1.5 hours</p>
                                        <p>Thu:  Calc 1.5 hours</p>
                                        <p>Fri:  Calc: 1.5 hours</p>
                                </div>
                                <div class="deliverables">
                                        <h3>Deliverables Due Today: 1</h3>
                                        <p>Mon:  World History:  Quiz</p>
                                        <p>Tue:  Biology:  Lab</p>
                                        <p>Wed:  none</p>
                                        <p>Thu:  Biology:  Exam</p>
                                        <p>Thu:  English:  Essay</p>
                                        <p>Fri:  Calc:  Homework</p>
                                </div>
                        </div>
                </section>
        </Router>
    );
}
