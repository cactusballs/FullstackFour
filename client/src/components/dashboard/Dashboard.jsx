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
          <Col sm={12} md={3}>
            <EventsSpotlight />
          </Col>
          <Col sm={12} md={6}>
            <ImageCarousel />
          </Col>
          <Col sm={12} md={3}>
            <RecentForumPosts />
          </Col>

          <Col sm={12} md={3}>
            <OnSaleEvents />
          </Col>
          <Col sm={12} md={6}>
            <BroadcastMessages />
          </Col>
          <Col sm={12} md={3}>
            <Poll pollId={2} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
