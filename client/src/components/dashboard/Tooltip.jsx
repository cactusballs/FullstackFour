import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { LuInfo } from "react-icons/lu";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// designed for broadcast's modal (info)

const InfoTooltip = () => {
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip id="tooltip-info" data-testid="tooltip-test">
          Your message will be broadcasted to all villagers for the next 24
          hours and can't be deleted/edited once submitted
        </Tooltip>
      }
    >
      {({ ref, ...triggerHandler }) => (
        <Button variant="light" {...triggerHandler} className="modal-button">
          <Image ref={ref} roundedCircle src="" />
          <span>
            <LuInfo />
          </span>
        </Button>
      )}
    </OverlayTrigger>
  );
};

export default InfoTooltip;
