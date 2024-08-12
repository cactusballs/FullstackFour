import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// not working... console mentioning ref, look into react-bootstrap docs and it mentions onToggle?

const InfoTooltip = ({
  children,
  tooltipText,
  placement = "right",
  delay = { show: 250, hide: 400 },
}) => {
  const renderTooltip = (props) => {
    <Tooltip id="infoTooltip" {...props}>
      {tooltipText}
    </Tooltip>;
  };

  return (
    <OverlayTrigger placement={placement} delay={delay} overlay={renderTooltip}>
      {children}
    </OverlayTrigger>
  );
};

export default InfoTooltip;
