import "./Card.css";
import React from "react";

// style may need correcting
const Card = ({
  title,
  leftIcon,
  rightIcon,
  link,
  linkText,
  content,
  cardFooter,
  cardFooterButton,
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
      {/* card content- will display default message when there's no 'content', else it'll will render anything under content */}
      <div className="card-content">
        {content || "No content at the moment"}
      </div>
      {/* footer is optional (when there's no button at the bottom of card) e.g., event cards */}
      {/* footer is only rendered when you supply a button prop */}
      {(cardFooter || cardFooterButton) && (
        <div
          className="card-footer"
          style={{ backgroundColor: "#485f39", color: "white" }}
        >
          {cardFooter && <div>{cardFooter}</div>}
          {cardFooterButton && (
            <button className="card-footer-button">{cardFooterButton}</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
