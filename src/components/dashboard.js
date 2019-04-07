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
                <Today />
                <ThisWeek />
                <ReviewAndPlan />
        </Router>

    );
}
       