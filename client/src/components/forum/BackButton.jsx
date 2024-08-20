import React from "react";
import Button from "react-bootstrap/button";
import { useNavigate } from "react-router-dom";
import './BackButton.css';

const BackButton = () => {
    const navigation = useNavigate();
  return (
    <div>
        
      <Button onClick={ () => navigation(-1)} className="button">Go Back</Button>
     
    </div>
  );
};

export default BackButton;

//https://stackoverflow.com/questions/65948671/how-to-go-back-to-previous-route-in-react-router-dom-v6
