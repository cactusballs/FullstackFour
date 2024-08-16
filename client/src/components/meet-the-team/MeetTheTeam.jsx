import React from "react";
//import Button from 'react-bootstrap/Button';
import { Card, Row, Container, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import placeholderimg from "../../assets/images/portraits/PLACEHOLDER-PORTRAIT.svg";
import catImg from "../../assets/images/portraits/cat.png";
import cynthiaImg from "../../assets/images/portraits/cynthia.png";
import lottieImg from "../../assets/images/portraits/lottie.png";
import mariaImg from "../../assets/images/portraits/maria.png";
import chloeImg from "../../assets/images/portraits/chloe.png";
import anhImg from "../../assets/images/portraits/anh.png";
import communityImg from "../../assets/images/portraits/daniel-funes-fuentes-TyLw3IQALMs-unsplash.jpg";
import "./MeetTheTeam.css";

const villageTeam = [
  {
    fullName: "Cat",
    portraitLink: catImg,
    autobiography:
      "Cat has just returned from turning her life upside down to begin a new chapter: she used to live in Edinburgh, Scotland and worked as an actuary. These days she's swapped excel for VS code and is retraining as a software developer. Having moved around a lot the past two years, she believes a key antidote to loneliness is community.",
  },
  {
    fullName: "Cynthia",
    portraitLink: cynthiaImg,
    autobiography:
      "Cynthia is a former data engineer originally from Brazil and a mom to a one-year-old baby. Having experienced the isolation of living in a foreign country, she understands the challenges of parenting without a support network. This inspired her to help others in similar situations by building a community where we can share experiences, find comfort, and foster meaningful connections.",
  },
  {
    fullName: "Chloe",
    portraitLink: chloeImg,
    autobiography:
      "Chloe is Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    fullName: "Fatima",
    portraitLink: placeholderimg,
    autobiography:
      "Fatima is Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    fullName: "Lottie",
    portraitLink: lottieImg,
    autobiography:
      "Lottie is Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    fullName: "Maria",
    portraitLink: mariaImg,
    autobiography:
      "Maria is Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    fullName: "Anh",
    portraitLink: anhImg,
    autobiography:
      "Anh is Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const MeetTheTeam = () => {
  return (
    <div>
      <Container className="headers">
        <Col>
          <Row>
            <h1>It takes a village. We are Village.</h1>
          </Row>
          <Row>
            <h2>Meet the Team</h2>
          </Row>
        </Col>
      </Container>

      <div className="topContainer">
        <Container>
          <Row noGutters>
            <Col lg={9}>
              {villageTeam.map((person, index) => (
                <Card key={index} 
                
                className="card">
                  <Row noGutters>

                    <Col md={4}>
                      <Card.Img
                        variant="left"
                        src={person.portraitLink}
                        className="portraits"
                      />
                    </Col>


                    <Col md={8}>
                      <Card.Body>
                        <Card.Title className="card-title">{person.fullName}</Card.Title>
                        <Card.Text>{person.autobiography}</Card.Text>
                      </Card.Body>
                    </Col>


                  </Row>
                </Card>
              ))}
            </Col>

            <Col lg={3}>
              <img src={communityImg} className="communityImg" />
            </Col>
          </Row>
        </Container>

        
      </div>
    </div>
  );
};

export default MeetTheTeam;
