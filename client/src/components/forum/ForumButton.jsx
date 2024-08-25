import React from "react";
import "./ForumButton.css";

const ForumButton = ({
  onClick,
  buttonContent,
  className = "",
  icon,
  ...rest
}) => {
  /* onclick will take in the function for each button, buttonContent will replace the default below and className will add any specific styling, rest makes space for any extra info added after */
  return (
    <button onClick={onClick} aria-placeholder="Submit">
      {/* submit */}
      {icon}
      {buttonContent="Submit"}
    </button>
  );
};

export default ForumButton;
