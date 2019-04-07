import React from 'react';

export default function LandingLogin(props) {
    return(
            <section class="login-section">
                <div>
                    <h3>Login here</h3>
                    <h3><a href="/dashboard.js" /></h3>
                </div>
                <div>
                    <form id="login-form">
                            <div class="form-section">
                                <div class="inline-label">
                                    <label for="user-id">Login Email</label>
                                </div>
                                <div class="inline-input">
                                    <input type="text" name="user-id" placeholder="student@followup.com" required></input>
                                </div>
                            </div>
                            <div class="form-section">
                                <div class="inline-label">
                                    <label for="user-pass">Password</label>
                                </div>
                                <div class="inline-input">
                                    <input type="password" name="user-pass" placeholder="password" required></input>
                                </div>
                            </div>
                            <div id="login-btns">
                                <button id="login-btn" type="submit">Login</button>
                                <h3 id="ask-to-reg">Not registered, yet?</h3>
                                <button id="reg-btn" type="submit">Register Here</button>
                            </div>
                                
                    </form>
                </div>
            </section>
        

    );
}