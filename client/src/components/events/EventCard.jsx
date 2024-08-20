import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import "./EventCard.css";
import dayjs from "dayjs";

// look into react-router-dom

function EventCard() {
  const [events, setEvents] = useState([]);
  const [uniqueEvents, setUniqueEvents] = useState([]);

  useEffect(() => {
    // fetch data from the /events endpoint made on backend
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        // console.log(result);
        setEvents(result);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchEvents();
  }, []);

  const groupEventsByName = Map.groupBy(events, ({ name }) => name);

  //   const before = [
  //     { name: "Sky", id: 0 },
  //     { name: "Dungeon", id: 1 },
  //     { name: "Dungeon", id: 2 },
  //     { name: "Dungeon", id: 3 },
  //   ];

  //   const after = {
  //     Dungeon: [
  //       { name: "Dungeon", id: 1 },
  //       { name: "Dungeon", id: 2 },
  //       { name: "Dungeon", id: 3 },
  //     ],
  //     Sky: [{ name: "Sky", id: 0 }],
  //   };
  //   const final = [
  //     [
  //       { name: "Dungeon", id: 1 },
  //       { name: "Dungeon", id: 2 },
  //       { name: "Dungeon", id: 3 },
  //     ],
  //     [{ name: "Sky", id: 0 }],
  //   ];

  return (
    <Container>
      <Row md={4} className="g-4">
        {Array.from(groupEventsByName.values()).map((item) => {
          const event = item[0];
          const startDate = dayjs(event.sales?.public?.startDateTime).format(
            "D MMM YYYY h:mm A"
          );
          const endDate = dayjs(event.sales?.public?.endDateTime).format(
            "D MMM YYYY h:mm A"
          );
          return (
            <Col key={event.id} md={3}>
              <Card className="event-card">
                {/* optional chain ?. (gets url property if images[0] exist) makes sure it doesn't break when there's no image */}
                <Card.Img
                  id="event-image"
                  variant="top"
                  src={event.images?.[0]?.url}
                />
                <Card.Body>
                  <Card.Title id="event-name">{event.name}</Card.Title>
                  <Card.Text className="event-venue">
                    {event._embedded?.venues?.[0]?.name},{" "}
                    {event._embedded?.venues[0]?.postalCode}
                  </Card.Text>
                  <Card.Text className="event-note">
                    {event?.pleaseNote}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    {startDate} - {endDate}
                  </ListGroup.Item>
                  <ListGroup.Item>{endDate}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Card.Link className="event-link" href={event.url}>
                    Book Tickets
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default EventCard;
