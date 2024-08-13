import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import logo from "../../assets/images/village-logo.png";

const Registration = () => {
  const navigate = useNavigate();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [user_name, setUser_name] = useState("");
  const [birthday, setBrithday] = useState("");
  const [email, setEmail] = useState("");
  const [villager_address, setVillager_address] = useState("");
  const [villager_location, setVillager_location] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeat_password] = useState("");

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="logo">
          <img src={logo} alt="Village Logo" />
        </div>
        <form>
          <div>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={first_name}
              required
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={last_name}
              required
            />
          </div>
          <div>
            <label htmlFor="user_name">Username</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={user_name}
              required
            />
          </div>
          <div>
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={birhtday}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Street name and number"
              value={address}
              required
            />
          </div>
          <div>
            <label htmlFor="postcode">Postcode</label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={postcode}
              required
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <select id="location" name="location">
              <option value="North London">North London</option>
              <option value="South London">South London</option>
              <option value="West London">West London</option>
              <option value="East London">East London</option>
            </select>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={postcode}
              required
            />
          </div>
          <div>
            <label htmlFor="repeat_password">Repeat Password</label>
            <input
              type="password"
              id="repeat_password"
              name="repeat_password"
              value={postcode}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
          <p>
            Already have an account? <a href="./login">Log in!</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
