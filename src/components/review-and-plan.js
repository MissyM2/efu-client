import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

export default function ReviewAndPlan(props) {
    return (
        <Router>
            <section>
                <h2>Review and Plan</h2>
                <div id="review-and-plan">
                        <button id="review-and-plan-btn" type="submit">Review and Plan</button>
                </div>
            </section>
        </Router>
    );
}
    
        
   