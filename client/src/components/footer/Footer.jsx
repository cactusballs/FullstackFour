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
      <div className="footerSectionPadding">
        <div className="footerLinks">
          <div className="footerLinksDiv">
            <h4>For businesses</h4>
            <a href="/employer">
              <p>Employer</p>
            </a>
            <a href="/healthplan">
              <p>Healthplan</p>
            </a>
            <a href="/individual">
              <p>Individual</p>
            </a>
          </div>
          <div className="footerLinksDiv">
            <h4>Resources</h4>
            <a href="/resource">
              <p>Resource Center</p>
            </a>
            <a href="/resource">
              <p>TV</p>
            </a>
            <a href="/resource">
              <p>Testimonials</p>
            </a>
          </div>
          <div className="footerLinksDiv">
            <h4>Partners</h4>
            <a href="/partners">
              <p>blah-blah-blah</p>
            </a>
          </div>
          <div className="footerLinksDiv">
            <a href="/contact">
              <p>Contact</p>
            </a>

            <a href="/career">
              <p>Career</p>
            </a>

            <a href="/about">
              <p>About</p>
            </a>
          </div>

          <div className="socialMedia">
            <p>
              <img src={facebook} alt="" />
            </p>
            <p>
              <img src={twitter} alt="" />
            </p>
            <p>
              <img src={linkedIn} alt="" />
            </p>
            <p>
              <img src={instagram} alt="" />
            </p>
          </div>
        </div>

        <hr></hr>
        <div className="footerBelow">
            <div className="footerCopyright">
                <p>
                    @{new Date().getFullYear()} FullStackFour.
                </p>
            </div>
            <div className="footerBelowLinks">
                <a href='/terms'><div><p>Terms and conditions</p></div></a>
                <a href='/cookies'><div><p>Cookie declaration</p></div></a>
            </div>
        </div>
      </div>

      {/* <div className="logo">
            <img src={logo} alt="Village Logo" />
          </div> */}
    </div>
  );
};

export default Footer;
