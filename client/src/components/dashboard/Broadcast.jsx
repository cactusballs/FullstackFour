import "./Broadcast.css";
import React from "react";
import { useState, useEffect } from "react";
import { CaretLeftBold } from "../icons/CaretLeft.jsx";
import { CaretRightBold } from "../icons/CaretRight.jsx";
import { SpeakerLowDuotone } from "../icons/Loudspeaker.jsx";

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

  const postMessage = () => {};

  const emptyCarousel = <p>Currently no new broadcast messages</p>;

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

  async function postData() {
    try {
      const response = await fetch("http://localhost:3000/broadcastmessages", {
        method: "POST",
        body: JSON.stringify({ key: "value" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.err("Error:", err);
    }
  }

  return (
    <>
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <SpeakerLowDuotone />
          <p className="dashboard-card-header">Broadcast</p>
          <SpeakerLowDuotone id="loudspeaker-right" />
        </div>
        <div className="dashboard-card-content">
          {/* if there are no messages, display displayCarousel message else display current index */}
          {!messages.length ? emptyCarousel : displayMessage}
        </div>
        <div className="dashboard-card-footer">
          <div className="broadcast-arrows">
            <button onClick={previousMessage}>
              <CaretLeftBold />
            </button>
            <button onClick={nextMessage}>
              <CaretRightBold />
            </button>
          </div>
          <button className="create-message" onClick={postMessage}>
            Create
          </button>
        </div>
      </div>
    </>
  );
}

export default BroadcastMessages;
