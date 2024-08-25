import "./Broadcast.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { PiSpeakerHighLight } from "react-icons/pi";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import MessageModal from "./Modal.jsx";

function BroadcastMessages() {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // chaining
  const currentMessage = messages?.[currentIndex];
  const displayMessage = currentMessage && (
    <>
      <div className="broadcast-item">
        <p className="broadcast-author">{currentMessage.user_name}</p>
        <p className="broadcast-message">{currentMessage.message_content}</p>
      </div>
    </>
  );

  const previousMessage = () => {
    const maxLength = messages.length - 1;
    // when currentIndex is below 0, loop back to the end
    if (currentIndex - 1 < 0) {
      setCurrentIndex(maxLength);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextMessage = () => {
    const maxLength = messages.length - 1;
    // until it reaches the end of messages, loop back to the start
    if (currentIndex + 1 > maxLength) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const emptyCarousel = (
    <p id="empty-broadcast-message">Currently no new broadcast messages</p>
  );

  // calling endpoint from frontend
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get(
          "http://localhost:3000/broadcastmessages"
        );

        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMessages();
  }, []);

  return (
    <>
      <div className="dashboard-card" data-testid="broadcast-test">
        <div className="dashboard-card-header">
          <PiSpeakerHighLight className="broadcast-icon" />
          <h4 id="broadcast-title">Broadcast</h4>
        </div>
        <div className="dashboard-card-content">
          <img
            src="../src/assets/images/default-user-icon.png"
            className="profile-image"
          ></img>
          {/* if there are no messages, display displayCarousel message else display current index */}
          {!messages.length ? emptyCarousel : displayMessage}
        </div>
        <div className="dashboard-card-footer">
          <div className="broadcast-arrows">
            <button onClick={previousMessage} className="broadcast-arrow">
              <FaChevronLeft />
            </button>
            <button onClick={nextMessage} className="broadcast-arrow">
              <FaChevronRight />
            </button>
          </div>
          <MessageModal />
        </div>
      </div>
    </>
  );
}

export default BroadcastMessages;
