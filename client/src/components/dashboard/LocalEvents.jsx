import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import { TbLocation } from "react-icons/tb";

function LocalEvents() {
  const [localEvents, setLocalEvents] = useState([]);
  //  For events in your area component- fetch data that aligns with user’s location + tags(?)
  // spotlight events based on user's location e.g., north/south/east/west london
  // for user location, can either use their postcode but translate to latlong coordinates OR use villager_location but its less precise
  // villager_postcode TEXT NOT NULL,
  // villager_location ENUM('North London', 'South London', 'West London', 'East London'),

  // translate user's postcode to latlong once redux is implemented

  const fetchLocalEvents = async (params) => {
    try {
      const url = new URL("http://localhost:3000/events");

      if (params) {
        url.search = new URLSearchParams(params).toString();
      }

      const response = await fetch(url.toString(), {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      setLocalEvents(result);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  //  translate user's postcode to latlong coordinates?
  useEffect(() => {
    fetchLocalEvents({
      keyword: "children",
      latlong: "",
      radius: "1",
      sort: "distance,asc",
      size: "5",
    });
  }, []);

  return (
    <Card
      leftIcon={<TbLocation />}
      title="Local Events"
      link=""
      linkText="View All"
    >
      {/* 
      // wrap event link in a button, map each event item
      <ul>
        <li>{event.startDateTime}, {event.name}, {event.link}</li>
      </ul> */}
    </Card>
  );
}

export default LocalEvents;
