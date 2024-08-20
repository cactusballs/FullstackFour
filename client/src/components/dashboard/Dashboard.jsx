import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LocalEvents from "./LocalEvents";
import ImageCarousel from "./ImageCarousel";
import RecentForumPosts from "./RecentForumPosts";
import BroadcastMessages from "./Broadcast";
import NavbarComp from "../navbar/Navbar.jsx";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <NavbarComp />
      <Container>
        <Row>
          <Col>
            <LocalEvents />
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
            <LocalEvents />
          </Col>
          <Col xs={5}>
            {/* should be poll here */}
            <BroadcastMessages />
          </Col>
          <Col>
            <BroadcastMessages />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;

// function Dashboard() {
//   return (
//     <>
//       <LocalEvents />
//       <ImageCarousel />
//       <RecentForumPosts />
//       <Broadcast />
//     </>
//   );
// }

// export default Dashboard;
