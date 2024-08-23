import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import { LuSparkle } from "react-icons/lu";

function EventsSpotlight() {
  const [relevantEvents, setRelevantEvents] = useState([]);

  const groupEventsByName = Map.groupBy(relevantEvents, ({ name }) => name);
  const groupedEventsAsArray = [...groupEventsByName.values()];

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

  useEffect(() => {
    fetchRelevantEvents({
      keyword: "children",
      sort: "relevance,desc",
    });
  }, []);
  const listOfEvents = (
    <>
      <ul>
        {groupedEventsAsArray?.slice(0, 5)?.map((item) => {
          const event = item[0];
          return (
            <li key={event.id}>
              <p>
                {event.name},{event._embedded?.venues[0]?.postalCode}
              </p>
              <a href={event.url}>See More</a>
            </li>
          );
        })}
      </ul>
    </>
  );
  return (
    <Card
      leftIcon={<LuSparkle />}
      title="Events Spotlight"
      link=""
      linkText="View All"
      content={listOfEvents}
    ></Card>
  );
}

export default EventsSpotlight;
