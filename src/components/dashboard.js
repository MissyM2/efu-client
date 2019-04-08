import React from 'react';
import {
        BrowserRouter as Router,
        Route,
        Redirect,
        Switch
    } from 'react-router-dom';

export default function Dashboard(props) {
    return (
        <Router>
            <h3>This is the Dashboard</h3>
                <Today />
                <ThisWeek />
                <ReviewAndPlan />
        </Router>

    );
}
       