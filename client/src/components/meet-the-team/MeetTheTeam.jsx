import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import catImg from "../../assets/images/portraits/cat.png";
import cynthiaImg from "../../assets/images/portraits/cynthia.png";
import lottieImg from "../../assets/images/portraits/lottie.png";
import mariaImg from "../../assets/images/portraits/maria.png";
import chloeImg from "../../assets/images/portraits/chloe.png";
import anhImg from "../../assets/images/portraits/anh.png";
import communityImg from "../../assets/images/portraits/daniel-funes-fuentes-TyLw3IQALMs-unsplash.jpg";
import "./MeetTheTeam.css";
import fatimaImg from "../../assets/images/portraits/fatima.png";
import Footer from "../footer/Footer";
import NavbarComp from "../navbar/Navbar";

//object containing team information to insert into cards
const villageTeam = [
  {
    firstName: "Anh",
    portraitLink: anhImg,
    autobiography:
      "Anh is a former learning support assistant who has helped young pupils with special educational needs to progress in school by collaborating with their parents and teachers to develop new learning plans, helping to unlock the pupil’s potential and facilitate a smoother transition to secondary. Having observed the challenges parents face in supporting their children at her previous work, she is determined to build a strong community through Village - where parents no longer face their challenges alone.",
  },
  {
    firstName: "Cat",
    portraitLink: catImg,
    autobiography:
      "Cat has just returned from turning her life upside down to begin a new chapter: she used to live in Edinburgh and worked as an actuary. These days she's swapped excel for VS code and is retraining as a developer. Having moved around a lot the past two years, she believes a key antidote to loneliness is community. She is passionate about Village's mission of connecting like-minded parents and carers.",
  },

  {
    firstName: "Chloe",
    portraitLink: chloeImg,
    autobiography:
      "Chloe is a former primary school teacher and a mum to a one-year-old. She has recently swapped her focus from planning lessons to planning apps! Having spent many months trying to find her flow in motherhood, she’s excited to begin her journey of reminding people that it takes a village to raise a child and that they’re not alone.",
  },

  {
    firstName: "Cynthia",
    portraitLink: cynthiaImg,
    autobiography:
      "Cynthia is a former data engineer originally from Brazil and a mom to a one-year-old baby. Having experienced the isolation of living in a foreign country, she understands the challenges of parenting without a support network. This inspired her to help others in similar situations by building a community where we can share experiences, find comfort, and foster meaningful connections.",
  },

  {
    firstName: "Fatima",
    portraitLink: fatimaImg,
    autobiography:
      "Fatima is a recent STEM graduate and as someone who is passionate about coding and has a lot of siblings, sees the importance of parents being able to connect and seek support and community because it really does take a village!",
  },
  {
    firstName: "Lottie",
    portraitLink: lottieImg,
    autobiography:
      "Lottie is a born and bred Londoner who, before coming to web development and Village, built belonging by facilitating third sector events. Having grown up in a huge family filled with aunts, uncles, and cousins—some related by blood but most by choice—she understands the importance of community and that family looks different to everyone.",
  },
  {
    firstName: "Maria",
    portraitLink: mariaImg,
    autobiography:
      "With a background in multimedia, Maria Amparo has developed her skills across various creative fields before expanding her focus to technology. Currently enhancing her skills as a full-stack developer, she is passionate about crafting innovative solutions that make a meaningful impact on people’s lives. Understanding the importance of connection with others to thrive, she is excited about building a community for parents to connect, share experiences, exchange knowledge, and support one another.",
  },
];

const MeetTheTeam = () => {
  return (
    <div>
      <NavbarComp/>
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
        <Container className="container">
          <Col lg={8} className="cards-col">
            {villageTeam.map((person, index) => (
              <Card key={index} className="card">
                <Row>
                  <Col md={4}>
                    <Card.Img
                      variant="left"
                      src={person.portraitLink}
                      className="portraits"
                    />
                  </Col>

                  <Col md={8}>
                    <Card.Body>
                      <Card.Title className="card-title">
                        {person.firstName}
                      </Card.Title>
                      <Card.Text>{person.autobiography}</Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>

          <Col lg={4} className="img-col">
            <img src={communityImg} className="communityImg" alt="Two people planting flowers"/>
          </Col>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default MeetTheTeam;
