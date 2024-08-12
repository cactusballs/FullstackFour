import React from "react";
import Card from "./Card.jsx";
import { TbLocation } from "react-icons/tb";
import { useState, useEffect } from "react";

function LocalEvents() {
  const [events, setLocalEvents] = useState([]);

  const fetchData = async () => {
    // api token - authenticating API requests with query parameter authentication (get request)
    const result = await fetch(
      `https://www.eventbriteapi.com/v3/users/me/?token=XX5RROEGVYY3BTEOLHI5`
    );
    const json = await result.json();
    setLocalEvents(json);
  };

  // list all events based on event venue and user's location

  return (
    <Card
      leftIcon={<TbLocation />}
      title="Events in your area"
      footerButton="View All"
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
