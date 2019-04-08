import React from 'react';
import {
        BrowserRouter as Router,
        Route,
        Redirect,
        Switch
} from 'react-router-dom';
import AddTermClass from './add-term-class';

export default function TermClass(props) {
    return (
        <Router>
             <section class="class-section">
                    <h2>My Classes</h2>
                    <div class="class-wrapper">
                        <div class="class-list">
                            <div class="class-body">
                                    <div class="class-title-body">Biology</div>
                                    <div class="class-title-body">101</div>
                            </div>
                            <div class="class-desc-body">
                                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate blandit elementum.</div>
                            </div>
                            <div class="edit-class-btn">
                                    <button class="center-btn basic-btn" type="submit">Edit</button>
                            </div>   
                        </div>
                        <AddTermClass />
                    </div>
                </section>
        </Router>
    );
}
       
       
               