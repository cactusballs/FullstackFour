import EventsForm from "./EventsForm.jsx";
import EventCard from "./EventCard.jsx";
import "./Events.css";
import NavbarComp from "../navbar/Navbar.jsx";

function Events() {
  return (
    <div className="events-page">
      <NavbarComp />
      <div className="events-container">
        <div className="events-headline-form">
          <h4 id="events-headline">find an event</h4>
          <EventsForm />
        </div>
        <EventCard />
      </div>
    </div>
  );
}

export default Events;
