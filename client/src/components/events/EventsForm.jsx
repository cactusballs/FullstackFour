import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./EventsForm.css";

function EventsForm() {
  const [keywordsQuery, setKeywordsQuery] = useState("");
  //const [events, setEvents] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/events`);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <Form className="events-form" onSubmit={handleSearch}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Search keywords</Form.Label>
        <Form.Control
          type="text"
          value={keywordsQuery}
          onChange={(e) => {
            setKeywordsQuery(e.target.value);
            console.log(e.target.value);
          }}
        />
      </Form.Group>

      {/* select menu - location - options: current location, North London, South London, West London, East London, Central London */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        {/* <Form.Control type="location" placeholder="" /> */}
        <Form.Label>Location</Form.Label>
        <Form.Select aria-label="location">
          <option>London </option>
          <option value="1">Use my current location</option>
          <option value="2">North London</option>
          <option value="3">South London</option>
          <option value="4">West London</option>
          <option value="5">East London</option>
        </Form.Select>
      </Form.Group>

      {/* select menu - location radius */}
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Location radius</Form.Label>
        <Form.Select aria-label="location-radius">
          <option>From ...</option>
          <option value="1">Within 1 mile</option>
          <option value="2">Within 3 miles</option>
          <option value="3">Within 5 miles</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" id="event-dates">
        <Form.Group className="mb-3" id="label-date-block">
          <Form.Label>From</Form.Label>
          <Form.Control type="date" id="from-date" />
        </Form.Group>
        <Form.Group className="mb-3" id="label-date-block">
          <Form.Label>To</Form.Label>
          <Form.Control type="date" id="to-date" />
        </Form.Group>
      </Form.Group>

      <Button
        variant="ghost"
        id="submit-event-form"
        type="submit"
        onClick={handleSearch}
      >
        Search
      </Button>
    </Form>
  );
}

export default EventsForm;
