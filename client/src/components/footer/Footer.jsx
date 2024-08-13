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
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          <div className="images">
            <div className="logo">
              <img src={logo} alt="Village Logo" />
              <p className="slogan">"It takes a village. We are Village.</p>
            </div>

            <div className="socialMedia">
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

          <div className="sb_footer-links-div">
            <h4>About Us</h4>
            <a href="/meet-the-team">
              <p>Meet the Team</p>
            </a>
            <a href="/healthplan">
              <p>Health Plan</p>
            </a>
            <a href="/employee">
              <p>Employee</p>
            </a>
          </div>
       
          <div className="sb_footer-links-div">
            <h4>Partners</h4>
            <a href="/employee">
              <p>Employee</p>
            </a>
            <a href="/employee">
              <p>Employee</p>
            </a>
            <a href="/employee">
              <p>Employee</p>
            </a>
          </div>
          <div className="sb_footer-links-div">
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

        <hr></hr>

        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <a href="https://github.com/cactusballs/FullstackFour">
              <p>@{new Date().getFullYear()} FullstackFour.</p>
            </a>

            <div className="sb_footer-below-links">
              <a href="/terms">
                <div>
                  <p>Terms and Conditions</p>
                </div>
              </a>
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
    </div>
  );
};

export default Footer;
