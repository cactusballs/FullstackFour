import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import logo from "../../assets/images/village-logo.png";

const Registration = () => {
  const navigate = useNavigate();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [user_name, setUser_name] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [villager_address, setVillager_address] = useState("");
  const [villager_postcode, setVillager_postcode] = useState("");
  const [villager_location, setVillager_location] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeat_password] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userError, setUserError] = useState("");

  // Checking that password and repeat password match and password security with Regex
  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (password !== repeat_password) {
      setPasswordError("Passwords don't match, please write them again");
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character (@$!%*?&#)"
      );
      return false;
    }

    setPasswordError("");
    return true;
  };

  // Checking that first name and last name have minimum two letters
  const validateName = () => {
    if (first_name.length < 2 || last_name.length < 2) {
      setNameError(
        "Please enter a first name and surname with at least two letters"
      );
      return false;
    }
    setNameError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPasswordValid = validatePassword();
    const isNameValid = validateName();

    if (!isPasswordValid || !isNameValid) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          user_name,
          birthday,
          email,
          villager_address,
          villager_postcode,
          villager_location,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        if (data.error === "email") {
          setEmailError(data.message);
        } else if (data.error === "user_name") {
          setUserError(data.message);
        }
      }
    } catch (error) {
      console.error("Error", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="logo">
          <img src={logo} alt="Village Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="name_fields">
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={first_name}
                onChange={(e) => {
                  setFirst_name(e.target.value);
                  setNameError("");
                }}
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
                onChange={(e) => {
                  setLast_name(e.target.value);
                  setNameError("");
                }}
                required
              />
            </div>
          </div>
          {nameError && (
            <div style={{ color: "red", marginBottom: "6px" }}>{nameError}</div>
          )}
          <div>
            <label htmlFor="user_name">Username</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={user_name}
              onChange={(e) => {
                setUser_name(e.target.value);
                setUserError("");
              }}
              required
            />
          </div>
          {userError && (
            <div style={{ color: "red", marginBottom: "6px" }}>{userError}</div>
          )}
          <div>
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
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
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              required
            />
          </div>
          {emailError && (
            <div style={{ color: "red", marginBottom: "6px" }}>
              {emailError}
            </div>
          )}
          <div>
            <label htmlFor="villager_address">Address</label>
            <input
              type="text"
              id="villager_address"
              name="villager_address"
              placeholder="Street name and number"
              value={villager_address}
              onChange={(e) => setVillager_address(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="villager_postcode">Postcode</label>
            <input
              type="text"
              id="villager_postcode"
              name="villager_postcode"
              value={villager_postcode}
              onChange={(e) => setVillager_postcode(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="villager_location">Location</label>
            <select
              id="villager_location"
              name="villager_location"
              value={villager_location}
              onChange={(e) => setVillager_location(e.target.value)}
              required
            >
              <option value="">Select your location</option>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="repeat_password">Repeat Password</label>
            <input
              type="password"
              id="repeat_password"
              name="repeat_password"
              value={repeat_password}
              onChange={(e) => setRepeat_password(e.target.value)}
              required
            />
          </div>
          {passwordError && (
            <div style={{ color: "red", marginBottom: "6px" }}>
              {passwordError}
            </div>
          )}
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
