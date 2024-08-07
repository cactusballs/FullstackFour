import React from 'react';
import './RegistrationMain.css';

const RegistrationMain = () => {
    return (
        <div className="container">
            <div className="left">
            </div>
            <div className="right">
                <form>
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name" />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last_name" name="last_name" />
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="text" id="email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div>
                        <label htmlFor="repeat_password">Repeat Password</label>
                        <input type="password" id="repeat_password" name="repeat_password" />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" placeholder="Street name and number"/>
                    </div>
                    <div>
                        <label htmlFor="postcode">Postcode</label>
                        <input type="text" id="postcode" name="postcode" />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationMain;