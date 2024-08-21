import React from "react";
import Card from "./Card.jsx";
import { TbLocation } from "react-icons/tb";
// import { useState, useEffect } from "react";

function LocalEvents() {
  // const [events, setLocalEvents] = useState([]);
  //  For events in your area component- fetch data that aligns with user’s location + tags(?)
  //  + family-friendly events - unable to do this for the time being
  // spotlight events based on user's location e.g., north/south/east/west london (needs to remember user)

  return (
    <Card
      leftIcon={<TbLocation />}
      title="Events in your area"
      link=""
      linkText="View All"
      // just for show- testing + styling footerButton
      footerButton="view"
    >
      {/* <ul>
        <li>Hi</li>
        <li>There</li>
        <li>Children</li>
      </ul> */}
    </Card>
  );
}

export default LocalEvents;
