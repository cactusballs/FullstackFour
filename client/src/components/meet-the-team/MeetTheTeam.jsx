import React from "react";
//import Button from 'react-bootstrap/Button';
import { Card, Row, Container, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import placeholderimg from "../../assets/images/portraits/PLACEHOLDER-PORTRAIT.svg";
import catImg from "../../assets/images/portraits/cat-img.jpeg";
import communityImg from "../../assets/images/portraits/daniel-funes-fuentes-TyLw3IQALMs-unsplash.jpg";
import "./MeetTheTeam.css";

const villageTeam = [
  {
    fullName: "Cat Conquest",
    portraitLink: catImg,
    autobiography: "Cat is blah blah blah",
  },
  {
    fullName: "Cynthia",
    portraitLink: placeholderimg,
    autobiography: "Cynthia is xyz",
  },
  {
    fullName: "Chloe",
    portraitLink: placeholderimg,
    autobiography: "Chloe is xyz",
  },
  {
    fullName: "Fatima",
    portraitLink: placeholderimg,
    autobiography: "Fatima is xyz",
  },
  {
    fullName: "Lottie",
    portraitLink: placeholderimg,
    autobiography: "Lottie is xyz",
  },
  {
    fullName: "Maria",
    portraitLink: placeholderimg,
    autobiography: "Maria is xyz",
  },
  {
    fullName: "Anh",
    portraitLink: placeholderimg,
    autobiography: "Anh is xyz",
  },
];

const MeetTheTeam = () => {
  return (
    <div>
      <h1>It takes a village. We are Village.</h1>
      <h2>Meet the Team</h2>

      <div className="topContainer">

      <Container className="container">
        <Row>
          <Col
            lg={6}
            className="d-flex align-items-start justify-content-center"
          ></Col>
          <Col lg={12}>
            {villageTeam.map((person, index) => (
              <Card className="mb-3" key={index}>
                <Row noGutters>
                  <Col md={4}>
                    <Card.Img
                      variant="top"
                      src={person.portraitLink}
                      className="portraits"
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>{person.fullName}</Card.Title>
                      <Card.Text>{person.autobiography}</Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>

      <div>
        <img src={communityImg} className="communityImg" />
      </div>

</div>



    </div>
  );
};

export default MeetTheTeam;
