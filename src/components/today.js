import React from 'react';
import {
        BrowserRouter as Router,
        Route,
        Redirect,
        Switch
} from 'react-router-dom';

export default function Today(props) {
    return (
        <Router>
                <section>
                        <h2>Today</h2>
                        <div class="details">
                        <div class="prep">
                                <h3>Hours of Prep Needed Today: 3</h3>
                                <p>Biology: 1.5 hours</p>
                                <p>English 1.5 hours</p>
                        </div>
                        <div class="deliverables">
                                <h3>Deliverables Due Today: 1</h3>
                                <p>World History:  Quiz</p>
                        </div>
                </div>             
                </section>
        </Router>
        
    );
}
        