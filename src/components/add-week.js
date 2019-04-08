import React from 'react';
import {
        BrowserRouter as Router,
        Route,
        Redirect,
        Switch
} from 'react-router-dom';

export default function SchoolTerm(props) {
    return (
        <Router>
            <section>
            <div class="add-week">
                <h3>Have you added all your weeks?</h3>
                <h3> If not, add them here.</h3>
                <form id="add-week-form">
                        <div class="week-num">
                            <div class="class-title-head">Week Number</div>
                            <div>
                                <input type="text" name="week-num" placeholder="1" required></input>
                            </div>
                        </div>
                        <div class="week-date">
                            <div class="class-number-head">Week Ending</div>
                            <div>
                                <input type="date" name="week-date" placeholder="04/20/2019" required></input>
                            </div>
                        </div>
                        <div class="add-week-btn">
                                <button class="basic-btn" type="submit">Submit</button>
                        </div>       
                </form>
                </div>
            </section>
        </Router>
    );
}

                