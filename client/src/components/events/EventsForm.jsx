import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./EventsForm.css";

function EventsForm() {
  // search keywords
  // location (dropdown menu option: Choose my current location with geolocation API from React)
  // location radius
  // From date....
  // to date
  // search button
  return (
    <Form className="events-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Search keywords</Form.Label>
        <Form.Control type="keywords" placeholder="" />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      {/* select menu - location - options: current location, North London, South London, West London, East London, Central London */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        {/* <Form.Control type="location" placeholder="" /> */}
        <Form.Label>Location</Form.Label>
        <Form.Select aria-label="location">
          <option>London </option>
          <option value="1">Use my current location</option>
          <option value="2">Central London</option>
          <option value="3">North London</option>
          <option value="4">South London</option>
          <option value="5">East London</option>
          <option value="6">West London</option>
        </Form.Select>
      </Form.Group>

      {/* select menu - location radius */}
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Location radius</Form.Label>
        <Form.Select aria-label="location-radius">
          <option>From ...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Form.Group>

      <Button variant="outline-dark" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default EventsForm;
