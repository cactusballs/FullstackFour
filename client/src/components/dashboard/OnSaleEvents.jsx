import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import { LuTag } from "react-icons/lu";
import "./Dashboard.css";
import dayjs from "dayjs";

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

  // checking family-friendly events that are recently added / opened sales

  useEffect(() => {
    fetchOnSaleEvents({
      sort: "date,desc",
      keyword: "family",
    });
  }, []);

  const eventsOnSaleNow = (
    <>
      <ul className="spotlight-list">
        {groupedEventsAsArray?.slice(0, 4)?.map((item) => {
          const event = item[0];
          const startDate = dayjs(event.sales?.public?.endDateTime).format(
            "D MMM YYYY"
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
      leftIcon={<LuTag />}
      title="Events On Sale Now"
      content={eventsOnSaleNow}
    ></Card>
  );
}

export default OnSaleEvents;
