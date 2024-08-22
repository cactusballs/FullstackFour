import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./EventsForm.css";

function EventsForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    keyword: "",
    startDateTime: "",
    endDateTime: "",
    latlong: "",
    radius: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <Form className="events-form" onSubmit={handleSearch}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Search keywords</Form.Label>
        <Form.Control
          type="text"
          value={formData.keyword}
          onChange={(e) => {
            setFormData({ ...formData, keyword: e.target.value });
          }}
        />
      </Form.Group>

      {/* select menu - location - options: current location, North London, South London, West London, East London, Central London */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        {/* <Form.Control type="location" placeholder="" /> */}
        <Form.Label>Location</Form.Label>
        <Form.Select
          aria-label="location"
          onChange={(e) => {
            setFormData({ ...formData, latlong: e.target.value });
          }}
        >
          <option>London </option>
          <option value="51.5413,-0.1419">North London</option>
          <option value="51.4456,-0.1557">South London</option>
          <option value="51.5029,-0.0219">West London</option>
          <option value="51.5302,-0.0219">East London</option>
        </Form.Select>
      </Form.Group>

      {/* select menu - location radius */}
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Location radius</Form.Label>
        <Form.Select
          aria-label="location-radius"
          onChange={(e) => {
            setFormData({ ...formData, radius: e.target.value });
          }}
        >
          <option>Distance</option>
          <option value="1">Within 1 mile</option>
          <option value="3">Within 3 miles</option>
          <option value="5">Within 5 miles</option>
          <option value="10">Within 10 miles</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" id="event-dates">
        <Form.Group className="mb-3" id="label-date-block">
          <Form.Label>From</Form.Label>
          <Form.Control
            type="datetime-local"
            id="from-date"
            value={formData.startDateTime}
            onChange={(e) => {
              console.log("fromDate", e);
              setFormData({
                ...formData,
                startDateTime: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" id="label-date-block">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="datetime-local"
            id="to-date"
            value={formData.endDateTime}
            onChange={(e) => {
              console.log("toDate", e);
              setFormData({
                ...formData,
                endDateTime: e.target.value,
              });
            }}
          />
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
