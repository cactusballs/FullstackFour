import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { LuInfo } from "react-icons/lu";
import InfoTooltip from "./Tooltip.jsx";
import "./Modal.css";

function MessageModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for post request
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    let message = e.target.value;
    console.log(message);
    setMessage(message);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/broadcastmessages", {
        method: "POST",
        // need to get user id from centralised storage - hard-coded user's id in
        body: JSON.stringify({ id: 6, message_content: message }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(response);
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);

      // close modal and alert user message has been submitted when clicking submit
      handleClose();
      alert("Success! Your message is now broadcasted");
    } catch (err) {
      console.log("Error:", err);
    }
  }

  return (
    <>
      {/* button to click on and open modal/pop-up */}
      <Button onClick={handleShow} className="broadcast-footer-button">
        Create
      </Button>
      {/* modal content */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Broadcast your message to all</Modal.Title>
        </Modal.Header>
        <Modal.Body margin="auto">
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <div id="subheading-icon">
                <Form.Label>Message:</Form.Label>
                <InfoTooltip tooltipText="Your message will be seen by all villagers for the next 24 hours once submitted">
                  <LuInfo
                    style={{
                      cursor: "pointer",
                      color: "green",
                      fontSize: "20px",
                    }}
                  />
                </InfoTooltip>
              </div>
              <Form.Control
                as="textarea"
                onInput={handleMessageChange}
                rows={3}
                placeholder="Type your message here..."
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            variant="outline-danger"
            onClick={handleClose}
            id="cancel-button"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MessageModal;
