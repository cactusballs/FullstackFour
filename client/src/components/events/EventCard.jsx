import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import "./EventCard.css";
import dayjs from "dayjs";
import { LuCalendarDays } from "react-icons/lu";
import { LuBanknote } from "react-icons/lu";

function EventCard({ events }) {
  return (
    <Container>
      <Row md={4} className="g-4">
        {events.map((item) => {
          const event = item[0];
          const endDate = dayjs(event.sales?.public?.endDateTime).format(
            "D MMM YYYY, h:mm A"
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
                <Card.Body id="event-title-venue">
                  <Card.Title id="event-name">{event.name}</Card.Title>
                  <Card.Text className="event-venue">
                    {event._embedded?.venues?.[0]?.name},{" "}
                    {event._embedded?.venues[0]?.postalCode}
                  </Card.Text>
                  <Card.Text className="event-note">
                    {/* {event?.pleaseNote} */}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    {/* {startDate} - {endDate} */}
                    <LuCalendarDays className="event-icon" />
                    {endDate}
                  </ListGroup.Item>
                  <ListGroup.Item id="event-price-flex">
                    <LuBanknote className="event-icon" />
                    {event.priceRanges?.[1]?.min === undefined
                      ? "No prices available"
                      : "Starting from £" + event.priceRanges?.[1]?.min}
                  </ListGroup.Item>
                </ListGroup>
                <Card.Body id="card-footer">
                  <Card.Link id="event-link" href={event.url}>
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
