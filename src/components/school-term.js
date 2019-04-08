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
                <h2>My School Details</h2>
                <div class="school-info">
                    <div class="school-detail">
                        <div class="basic-header">School Name</div>
                        <div>
                                <input class="school-input" type="text" name="school-name" placeholder="My College"></input>
                        </div>
                    </div>
                    <div class="school-detail" >
                            <div class="basic-header">Term</div>
                            <div>
                                <input class="school-input" type="text" name="term" placeholder="Spring Semester"></input>
                            </div>                                   
                    </div>  
                </div>         
            </section>
        </Router>
    );
}

                