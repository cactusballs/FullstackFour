import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import { LuTag } from "react-icons/lu";
import "./OnSaleEvents.css";

function OnSaleEvents() {
  const [onSaleEvents, setOnSaleEvents] = useState([]);

  const groupEventsByName = Map.groupBy(onSaleEvents, ({ name }) => name);
  const groupedEventsAsArray = [...groupEventsByName.values()];

  const fetchOnSaleEvents = async (params) => {
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

      setOnSaleEvents(result);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    fetchOnSaleEvents({
      sort: "onSaleStartDate,asc",
      classificationName: "family",
    });
  }, []);

  const eventsOnSaleNow = (
    <>
      <ul>
        {groupedEventsAsArray?.slice(0, 5)?.map((item) => {
          const event = item[0];
          return (
            <li key={event.id} id="on-sale-events-item">
              <p>
                <a href={event.url}>{event.name}</a>,
                {event._embedded?.venues[0]?.postalCode}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );

  return (
    <Card
      leftIcon={<LuTag />}
      title="Events On Sale Now"
      link=""
      linkText="View All"
      content={eventsOnSaleNow}
    ></Card>
  );
}

export default OnSaleEvents;
