import React from 'react';
import {
        BrowserRouter as Router,
        Route,
        Redirect,
        Switch
} from 'react-router-dom';

export default function AddTermClass(props) {
    return (
        <Router>
            <div class="add-class">
                <h3>Need to track another class?  Add it here</h3>
                <form id="add-class-form">
                        <div class="class-body">
                                <div class="class-title-body">
                                    <div class="basic-header">Class Title</div>
                                    <input id="class-title-input" type="text" name="class-title" placeholder="Biology 101" required></input>
                                </div>
                                <div class="class-title-body" >
                                    <div class="basic-header">Class Number</div>
                                    <input id="class-num-input" type="text" name="class-num" placeholder="11011A" required></input>
                                </div>
                        </div>

                        <div class="class-desc-body">
                                <div class="basic-header">Class Description</div>
                                <input id="class-desc-input" type="text" name="class-desc" placeholder="Lorem ipsum dolor sit amet..."></input>
                        </div>
                        
                        <div class="add-class-btn">
                                <button class="center-btn basic-btn" type="submit">Submit</button>
                        </div>       
                </form>
                </div>
        </Router>
    );
}
       
       
            
                        