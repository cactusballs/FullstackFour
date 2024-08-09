import React, { useState, useEffect } from 'react';
import './Registration.css';

const Registration = () => {
    return (
        <div className="signup-container">
            <div className="signup-form">
                <form>
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name" required />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last_name" name="last_name" required />
                    </div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div>
                        <label htmlFor="birthday">Birthday</label>
                        <input type="date" id="birthday" name="birthday" required />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" placeholder="Street name and number" required />
                    </div>
                    <div>
                        <label htmlFor="postcode">Postcode</label>
                        <input type="text" id="postcode" name="postcode" required />
                    </div>
                    <div>
                        <label htmlFor="location">Location</label>
                        <input type="text" id="location" name="location" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div>
                        <label htmlFor="repeat_password">Repeat Password</label>
                        <input type="password" id="repeat_password" name="repeat_password" required />
                    </div>
                    <button type="submit">Sign Up</button>
                    <p>Already have an account? <a href="./login">Log in!</a></p>
                </form>
            </div>
        </div>
    );
}

export default Registration;

