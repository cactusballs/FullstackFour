import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Dropdown } from "react-bootstrap";
import NavbarComp from "../navbar/Navbar";
import Footer from "../footer/Footer";
import BackButton from "./BackButton";

const ForumTopicThreads = () => {
  const { topic } = useParams();
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);
  const [parentTag, setParentTag] = useState("");

  // Trim any extra spaces or special characters from the topic parameter
  const sanitizedTopic = topic.replace(/[{}]/g, '').trim();

  useEffect(() => {
    setError(null);
    fetch(`http://localhost:3000/threads/${encodeURIComponent(sanitizedTopic)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setThreads(data);
      })
      .catch((error) => {
        console.error("Error fetching threads:", error);
        setError("Failed to fetch threads");
      });
  }, [sanitizedTopic]);

  useEffect(() => {
    let isMounted = true; // to prevent state updates if the component is unmounted
  
    if (parentTag) {
      setError(null);
      fetch(
        `http://localhost:3000/threads/${encodeURIComponent(
          sanitizedTopic
        )}/${encodeURIComponent(parentTag)}`
      )
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(response.status === 404 ? data.message : "Network response was not ok");
            });
          }
          return response.json();
        })
        .then((data) => {
          if (isMounted) {
            setThreads(data);
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error("Error fetching threads with this tag:", error);
            setError(error.message || "Failed to fetch threads by tag");
            setThreads([]); // Clear threads if an error occurred
          }
        });
    }
  
    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted component
    };
  }, [parentTag, sanitizedTopic]);

  const handleSelect = (tag) => {
    setError(null);
    setParentTag(tag);
  };

  return (
    <Container fluid>
      <NavbarComp />
      <Row className="my-4">
        <Col md={8}>
          <Card>
            <Card.Header as="h2">{sanitizedTopic}</Card.Header>
            <Card.Body>
              <p>Explore threads by topic or start your own!</p>
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Select Tag
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="carers_tag">Carers Tag</Dropdown.Item>
                  <Dropdown.Item eventKey="expecting_parents_tag">
                    Expecting Parents Tag
                  </Dropdown.Item>
                  {/* Add more tags here */}
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              {error ? (
                <p>{error}</p>
              ) : (
                <ListGroup variant="flush">
                  {Array.isArray(threads) && threads.length > 0 ? (
                    threads.map((thread) => (
                      <ListGroup.Item key={thread.thread_id}>
                        <Link to={`/conversation/${thread.thread_id}`}>
                          {thread.thread_title}
                        </Link>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <p>Sorry! No posts (yet) for this tag under {sanitizedTopic}.</p>
                  )}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <BackButton />
      <Footer />
    </Container>
  );
};

export default ForumTopicThreads;
