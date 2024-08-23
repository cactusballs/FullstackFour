import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OnSaleEvents from "./OnSaleEvents.jsx";
import ImageCarousel from "./ImageCarousel";
import RecentForumPosts from "./RecentForumPosts";
import BroadcastMessages from "./Broadcast";
import NavbarComp from "../navbar/Navbar.jsx";
import EventsSpotlight from "./EventsSpotlight.jsx";
import Poll from "./Poll";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <NavbarComp />
      <Container>
        <Row>
          <Col>
            <EventsSpotlight />
          </Col>
          <Col xs={6}>
            <ImageCarousel />
          </Col>
          <Col>
            <RecentForumPosts />
          </Col>
        </Row>

        <Row>
          <Col>
            <OnSaleEvents />
          </Col>
          <Col xs={5}>
            <BroadcastMessages />
          </Col>
          <Col>
            <Poll pollId={2} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
