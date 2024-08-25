import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./EventsForm.css";

function EventsForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    keyword: "",
    startDateTime: "",
    endDateTime: "",
    latlong: "",
    radius: ""
  });

  // error message states
 const [errorMessage, setErrorMessage] = useState(""); 

 const validateFormData = ({startDateTime, endDateTime}) => {
  if (startDateTime && endDateTime) {
    const fromDate = new Date(startDateTime)
    const toDate = new Date(endDateTime)
    if(fromDate > toDate) {
      setErrorMessage("Invalid range: 'From' date must be before 'to' date")
      return false
    }
  }
  return true
}

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (validateFormData(formData)) {
      onFormSubmit(formData);
    };
  };

  return (
    <Form className="events-form" onSubmit={handleSearch}>
      <Row>
        <Col sm={12}>
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
        </Col>
        {/* select menu - location - options: current location, North London, South London, West London, East London, Central London */}
        <Col sm={12}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Control type="location" placeholder="" /> */}
            <Form.Label name="location">Location</Form.Label>
            <Form.Select
              aria-label="location"
              onChange={(e) => {
                setFormData({ ...formData, latlong: e.target.value });
              }}
            >
              <option value="51.509865,-0.118092">London</option>
              <option value="51.5413,-0.1419">North London</option>
              <option value="51.4456,-0.1557">South London</option>
              <option value="51.5029,-0.0219">West London</option>
              <option value="51.5302,-0.0219">East London</option>
            </Form.Select>
          </Form.Group>
        </Col>
        {/* select menu - location radius */}
        <Col sm={12}>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label name="location-radius">Location radius</Form.Label>
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
        </Col>
        <Col sm={12} md={6}>
          <Form.Group className="mb-3" id="label-date-block">
            <Form.Label>From</Form.Label>
            <Form.Control
              type="datetime-local"
              id="from-date"
              name="fromDate"
              value={formData.startDateTime}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  startDateTime: e.target.value,
                });
              }}
            />
          </Form.Group>
        </Col>
        <Col sm={12} md={6}>
          <Form.Group className="mb-3" id="label-date-block">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="datetime-local"
              id="to-date"
              name="toDate"
              value={formData.endDateTime}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  endDateTime: e.target.value,
                });
              }}
            />
          </Form.Group>
        </Col>
        <Col sm={12}>
        <p className="events-error-message">{errorMessage}</p>
          <Button
            id="submit-event-form"
            type="submit"
            name="search"
            className="w-100"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default EventsForm;
