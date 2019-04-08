import React from 'react';
import {
        BrowserRouter as Router,
        Route,
        Redirect,
        Switch
} from 'react-router-dom';
import AddWeek from './add-week';


export default function Week(props) {
    return (
        <Router>
            <section class="weeks-section">
                <h2>My Weeks</h2>
                <div class="weeks-wrapper">
                    <div class="weeks-details">
                            <div class="class-headers">
                                <div class=" class-title-head">Week Number</div>
                                <div class=" class-number-head">Week Ending</div>
                            </div>
                            <div class="week-list">
                                <div class="class-title-body">1</div>
                                <div class="class-number-body">01/07/2019</div>
                            </div>
                            <div class="week-list">
                                <div class="class-title-body">2</div>
                                <div class="class-number-body">01/14/2019</div>
                            </div>
                            <div class="week-list">
                                <div class="class-title-body">3</div>
                                <div class=" class-number-body">01/21/2019</div>
                            </div>
                            <div class="week-list">
                                <div class=" class-title-body">4</div>
                                <div class=" class-number-body">01/28/2019</div>
                            </div>
                    </div>
                    <AddWeek />
                </div>
            </section>
        </Router>
    );
}