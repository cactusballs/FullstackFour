import EventsForm from "./EventsForm.jsx";
import EventCard from "./EventCard.jsx";
import "./Events.css";
import NavbarComp from "../navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

const cleanFormData = (formData) => {
  const { keyword, startDateTime, endDateTime, latlong, radius } = formData;

  return {
    ...(keyword != "" ? { keyword } : { keyword: "children" }),
    ...(startDateTime != "" ? { startDateTime } : {}),
    ...(endDateTime != "" ? { endDateTime } : {}),
    ...(latlong != "" ? { latlong } : {}),
    ...(radius != "" ? { radius } : {}),
  };
};

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
      const result = await axios.get(url.toString());
      setEvents(result.data);
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
    fetchEvents(cleanFormData(formData));
  };

  return (
    <div className="events-page">
      <NavbarComp />
      <h4 id="events-headline">find an event</h4>
      <div className="events-container">
        <div className="events-headline-form">
          <div id="events-form-image">
            <EventsForm onFormSubmit={handleFormSubmit} />
            <img
              src="../../src/assets/images/event-father-child.png"
              alt="kid hitting pinata in a party"
              id="events-image"
              className="d-none d-lg-block"
            ></img>
          </div>
        </div>
        <EventCard events={groupedEventsAsArray} />
      </div>
      <Footer />
    </div>
  );
}

export default Events;
