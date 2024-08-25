import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import { LuSparkle } from "react-icons/lu";
import "./Dashboard.css";
import dayjs from "dayjs";

function EventsSpotlight() {
  const [relevantEvents, setRelevantEvents] = useState([]);

  // mapping events array and extracting unique events by name
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

  // doesn't allow relevance,desc and date,asc together - only sorted by relevance
  useEffect(() => {
    fetchRelevantEvents({
      keyword: "children",
      sort: "relevance,desc",
    });
  }, []);
  const listOfEvents = (
    <>
      <ul className="spotlight-list">
        {groupedEventsAsArray?.slice(0, 4)?.map((item) => {
          const event = item[0];
          const startDate = dayjs(event.sales?.public?.endDateTime).format(
            "D MMM"
          );
          return (
            <li key={event.id} className="spotlight-list-item">
              <a href={event.url} className="spotlight-name">
                {event.name}
              </a>

              <div className="spotlight-details">
                <span>{event._embedded?.venues[0]?.postalCode}</span>
                <span>{startDate}</span>
              </div>
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
      content={listOfEvents}
    ></Card>
  );
}

export default EventsSpotlight;
