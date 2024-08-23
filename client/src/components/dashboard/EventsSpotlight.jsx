import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import { LuSparkle } from "react-icons/lu";

function EventsSpotlight() {
  const [relevantEvents, setRelevantEvents] = useState([]);

  const fetchRelevantEvents = async (params) => {
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

      setRelevantEvents(result);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  //  translate user's postcode to latlong coordinates?
  useEffect(() => {
    fetchRelevantEvents({
      keyword: "children",
      city: "London",
      sort: "relevance,asc",
      size: "5",
    });
  }, []);

  return (
    <Card
      leftIcon={<LuSparkle />}
      title="Events in your area"
      link=""
      linkText="View All"
    >
      <ul>
        {relevantEvents.map((relevantEvent) => {
          <li key={relevantEvent.id}>
            <p>
              {relevantEvent._embedded?.venues?.[0]?.name},
              {relevantEvent._embedded?.venues[0]?.postalCode}
            </p>
            <a href={relevantEvent.url}>See More</a>
          </li>;
        })}
      </ul>
    </Card>
  );
}

export default EventsSpotlight;
