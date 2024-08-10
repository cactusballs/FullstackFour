import "./Card.css";
import React from "react";

// style may need correcting
const Card = ({
  cardTitle,
  cardIcon,
  cardLink,
  cardContent,
  cardList,
  handleClick,
  buttonText,
  style = {},
}) => {
  return (
    <div className="card" style={style}>
      {/* card header- some cards don't have links (optional to use) */}
      <div className="card-header">
        <span className="card-icon">{cardIcon}</span>
        <h4 className="card-title">{cardTitle}</h4>
        <a href={cardLink} className="card-link">
          {cardLink.text}
        </a>
      </div>
      {/* card content- may need tweaking to render list */}
      <div className="card-content">
        <p>{cardContent}</p>
        <ul className="card-list">{cardList}</ul>
      </div>
      {/* footer is optional (when there's no button at the bottom of card) e.g., event cards */}
      {/* footer is only rendered when you supply a button prop */}
      <div className="card-footer">
        <button className="card-button" onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
