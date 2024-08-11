import React from "react";
import Card from "./Card.jsx";
import { TbLocation } from "react-icons/tb";

function LocalEvents() {
  return (
    <Card
      leftIcon={<TbLocation />}
      title="Events in your area"
      footerButton="View All"
    >
      <ul>
        <li>Hi</li>
        <li>There</li>
        <li>Children</li>
      </ul>
    </Card>
  );
}

export default LocalEvents;
