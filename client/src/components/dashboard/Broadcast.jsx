import "./Broadcast.css";
import React from "react";
import { useState, useEffect } from "react";
import { PiSpeakerHighLight } from "react-icons/pi";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import MessageModal from "./Modal.jsx";
// import ForumButton from "../forum/ForumButton.jsx";
// import Card from "Card.jsx";

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

  // calling endpoints from frontend
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch(
          "http://localhost:3000/broadcastmessages",
          {
            method: "get",
          }
        );

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setMessages(json);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMessages();
  }, []);

  // <Card leftIcon={<SpeakerLowDuotone/>}
  //   title="Broadcast"
  //   rightIcon={<SpeakerLowDuotone id="loudspeaker-right"/>}
  //   content={}
  //   buttonText="Create"
  //   >

  //   </Card>

  return (
    <>
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <PiSpeakerHighLight />
          <p>Broadcast</p>
          <PiSpeakerHighLight id="loudspeaker-right" />
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
            {/* 
            not working due to icon not being defined */}
            {/* <ForumButton
              onClick={previousMessage}
              className="broadcast-button"
              icon={<CaretLeftBold />}
            >
              {icon}
            </ForumButton> */}
            <button onClick={previousMessage} className="broadcast-arrow">
              {/* <CaretLeftBold /> */}
              <FaChevronLeft />
            </button>
            <button onClick={nextMessage} className="broadcast-arrow">
              {/* <CaretRightBold /> */}
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
