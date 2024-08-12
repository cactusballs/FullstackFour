import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import Information from "../icons/Info.jsx";
import { LuInfo } from "react-icons/lu";
import "./Modal.css";
// import InfoTooltip from "./Tooltip.jsx";

function MessageModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for post request
  // const [message, setMessage] = useState("");

  //   post doesn't work yet - look into state management
  //   const handleMessageChange = (e) => {
  //     let message = e.target.message;
  //     setMessage(message);
  //   };

  //   async function handleSubmit(e) {
  //     e.preventDefault();

  //     try {
  //       const response = await fetch("http://localhost:3000/broadcastmessages", {
  //         method: "POST",
  //         body: JSON.stringify({ message_content: message }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Response status: ${response.status}`);
  //       }
  //       const result = await response.json();
  //       console.log(result);
  //     } catch (err) {
  //       console.err("Error:", err);
  //     }
  //   }

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Create
      </Button>

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
                <LuInfo
                  style={{
                    cursor: "pointer",
                    color: "green",
                    fontSize: "20px",
                  }}
                />
                {/* <Information
                  style={{
                    cursor: "pointer",
                    color: "green",
                    fontSize: "20px",
                  }}
                /> */}
              </div>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Type your message here..."
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
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
