import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

export default function registrationPage(props) {
  return (
            <section class="login-section">
                <div>
                    <h3>Register here</h3>
                </div>
                <div>
                    <form id="login-form">
                            <div class="form-section">
                                    <div class="inline-label">
                                        <label for="user-name">Name</label>
                                    </div>
                                    <div class="inline-input">
                                        <input type="text" name="user-name" placeholder="first name last name" required></input>
                                    </div>
                            </div>
                            <div class="form-section">
                                <div class="inline-label">
                                    <label for="user-id">Email Address</label>
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
                            <div class="form-section">
                                    <div class="inline-label">
                                        <label for="confirm-pass">Confirm Password</label>
                                    </div>
                                    <div class="inline-input">
                                        <input type="password" name="confirm-pass" placeholder="password" required></input>
                                    </div>
                                </div>
                            <div id="login-btns">
                                <button id="reg-btn" type="submit">Register</button>
                            </div>    
                    </form>
                </div>
            </section>
  );
}