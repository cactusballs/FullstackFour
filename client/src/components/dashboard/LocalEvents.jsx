import React from "react";
import Card from "./Card.jsx";
import { TbLocation } from "react-icons/tb";
// import { useState, useEffect } from "react";

function LocalEvents() {
  // const [events, setLocalEvents] = useState([]);
  //  For events in your area component- fetch data that aligns with user’s location + tags(?)
  //  + family-friendly events - unable to do this for the time being
  // spotlight events based on closest event venues to user's location (needs to remember user)
  // token stored under auth header- Authorization: Bearer PERSONAL_OAUTH_TOKEN
  // GET - venue, event category, organization
  // docs - https://www.eventbrite.com/platform/docs/events
  // https://www.eventbrite.com/platform/docs/changelog


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
