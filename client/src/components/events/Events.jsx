import EventsForm from "./EventsForm.jsx";
import EventCard from "./EventCard.jsx";
import "./Events.css";
import NavbarComp from "../navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";
import { useState, useEffect } from "react";

function Events() {
  const [events, setEvents] = useState([]);

  const groupEventsByName = Map.groupBy(events, ({ name }) => name);
  const groupedEventsAsArray = [...groupEventsByName.values()];

  const fetchEvents = async (params) => {
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

      setEvents(result);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  // loads child-friendly events in the beginning
  useEffect(() => {
    fetchEvents({ keyword: "children" });
  }, []);

  // upon submitting form, fetch events again - replacing keyword 'children' with whatever user typed in form
  const handleFormSubmit = (formData) => {
    fetchEvents(formData);
  };

  return (
    <div className="events-page">
      <NavbarComp />
      <div className="events-container">
        <div className="events-headline-form">
          <h4 id="events-headline">find an event</h4>
          <EventsForm onFormSubmit={handleFormSubmit} />
        </div>
        <EventCard events={groupedEventsAsArray} />
      </div>
      <Footer />
    </div>
  );
}

export default Events;
