import React from "react";
import logo from "../../assets/images/village-logo.png";
import "./Footer.css";
import facebook from "../../assets/images/socials/facebook.png";
import twitter from "../../assets/images/socials/twitter.png";
import instagram from "../../assets/images/socials/instagram.png";
import linkedIn from "../../assets/images/socials/linkedin.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer section-padding">
        <div className="footer-links">
          {/* images container */}
          <div className="images">
            <div className="logo">
              <img src={logo} alt="Village Logo" />
            </div>

            {/* socials icons in images container */}
            <div className="socials-container">
              <div className="socialmedia">
                <p>
                  <img src={facebook} alt="facebook logo" />
                </p>
                <p>
                  <img src={twitter} alt="twitter logo" />
                </p>
                <p>
                  <img src={linkedIn} alt="linkedin logo" />
                </p>
                <p>
                  <img src={instagram} alt="instagram logo" />
                </p>
              </div>
            </div>
          </div>

          {/* slogan and address container: info div */}
          <div className="footer-info-div">
            <h4>
              <p className="slogan">"It takes a village. We are Village."</p>
            </h4>

            <p className="address">
              Address line 1, Address line 2, Address line 3.
            </p>
          </div>

          {/* all contact us type links and info */}
          <div className="footer-links-div">
            <h4>Important Links</h4>
            <a href="/">
              <p>Login page</p>
            </a>
            <a href="/meet-the-team">
              <p>Meet the Team</p>
            </a>

            <a href="mailto:john@example.com">
              <p>Contact Us</p>
            </a>
          </div>

          {/* links to mental health resources container */}
          <div className="footer-links-div mental-health-container">
            <h4>Mental Health Resources</h4>
            <a href="https://www.mind.org.uk/">
              <p>Mind</p>
            </a>
            <a href="https://www.youngminds.org.uk/parent/">
              <p>Young Minds</p>
            </a>
            <a href="https://www.samaritans.org/how-we-can-help/contact-samaritan/">
              <p>Samaritans</p>
            </a>
          </div>
        </div>

        {/* line break with horizonal line: below this copyright, etc. */}
        <hr></hr>

        <div className="footer-below">
          <div className="footer-copyright">
            <a href="https://github.com/cactusballs/FullstackFour">
              <p>@{new Date().getFullYear()} FullstackFour.</p>
            </a>
          </div>
          <div className="footer-below-links">
            <a href="/terms">
              <div>
                <p>Terms and Conditions</p>
              </div>
            </a>
            <a href="/cookies">
              <div>
                <p>Cookies</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
