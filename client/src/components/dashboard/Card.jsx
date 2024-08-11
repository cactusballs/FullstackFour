import "./Card.css";
import React from "react";

// style may need correcting
const Card = ({
  title,
  leftIcon,
  rightIcon,
  link,
  linkText,
  children,
  footer,
  footerButton,
}) => {
  return (
    <div className="card">
      {/* card header- some cards don't have links (optional to use) */}
      <div
        className="card-header"
        style={{ backgroundColor: "#485f39", color: "white" }}
      >
        <span className="card-icon">{leftIcon}</span>
        <h4 className="card-title">{title}</h4>
        <span className="card-icon">{rightIcon}</span>
        <a href={link} className="card-link">
          {linkText}
        </a>
      </div>
      {/* card content- may need tweaking to render list */}
      <div className="card-children">
        {children || "No content at the moment"}
      </div>
      {/* footer is optional (when there's no button at the bottom of card) e.g., event cards */}
      {/* footer is only rendered when you supply a button prop */}
      {(footer || footerButton) && (
        <div className="card-footer">
          {footer && <div>{footer}</div>}
          {footerButton && (
            <button className="footer-button">{footerButton}</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
