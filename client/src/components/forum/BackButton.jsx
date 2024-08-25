import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate(-1)} className="button">
        Back
      </Button>
    </div>
  );
};

export default BackButton;

