import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import "./EventCard.css";

function EventCard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // fetch data from the /events endpoint made on backend
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events", {
          method: "get",
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
    fetchEvents();
  }, []);

  // need to incorporate dynamic array items onto bootstrap card
  return (
    <Row xs={1} md={3} className="g-4">
      {events.forEach((event) => (
        <Col key={event.id}>
          <Card className="event-card">
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{event.name}</Card.Title>
              <Card.Text>
                {event.venue.name}
                {event.venue.postalCode}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{event.startDateTime}</ListGroup.Item>
              <ListGroup.Item>{event.endDateTime}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href={event.url}>Book Tickets</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default EventCard;
