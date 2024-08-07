import "./Broadcast.css";
import React from "react";
import { useState, useEffect } from "react";
import { CaretLeftBold } from "../icons/CaretLeft.jsx";
import { CaretRightBold } from "../icons/CaretRight.jsx";

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

  const emptyCarousel = <p>Currently no new broadcast messages</p>;

  // calling endpoint from frontend
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

  return (
    <>
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 64 64"
          >
            <path
              fill="currentColor"
              d="M54.014 32.004c-.035 5.582-.273 11.222.164 16.798c2.234-5.416 2.826-11.154 2.895-16.783c-.102-5.642-.662-11.371-2.895-16.802c-.401 5.577-.199 11.206-.164 16.787M62 32.02c-.131-8.449-.871-16.953-3.578-25.197c.045 8.553.551 17.099.514 25.654c-.035 8.242-.494 16.482-.514 24.72C61.139 48.963 61.869 40.463 62 32.02m-11.792-4.875l-.138-.03C49.552 13.98 46.978 4 43.883 4c-.596 0-1.171.377-1.718 1.067c-1.188 1.322-16.44 18.026-29.503 19.641c-1.529.189-2.99.346-4.346.459c-1.578.133-3.014.207-4.252.207c0 0-2.064 3.212-2.064 6.648c0 3.441 2.068 6.648 2.068 6.648c1.238 0 2.676.074 4.254.205c.575.049 1.177.109 1.787.172v13.402h8.082l7.938-7.416c8.864 5.846 16.087 13.992 16.087 13.992v-.027c.531.648 1.09 1.002 1.667 1.002c3.095 0 5.669-9.98 6.188-23.115l.138-.029c.843 0 1.528-2.176 1.528-4.855c-.001-2.682-.686-4.856-1.529-4.856M43.883 6.098c1.429 1.257 3.646 8.565 4.171 20.574l-8.242-1.809c.656-10.926 2.715-17.574 4.071-18.765M14.15 34.566c-.912 0-1.654-.883-1.654-1.968c0-1.088.742-1.97 1.654-1.97c.914 0 1.652.882 1.652 1.97c.001 1.086-.738 1.968-1.652 1.968m4.041 10.33v-4.092c.989.387 1.979.832 2.961 1.326zm0-6.222V28.241h-4.664c.17-.617.362-1.201.561-1.729c9.87-1.811 20.355-10.882 25.833-16.244c-1.417 5.133-2.323 12.959-2.323 21.732c0 8.798.911 16.644 2.337 21.777c-4.709-4.609-13.163-11.994-21.744-15.103m25.692 19.228c-1.355-1.191-3.415-7.84-4.071-18.766l8.242-1.809c-.525 12.009-2.742 19.318-4.171 20.575"
            ></path>
          </svg>
          <p className="dashboard-card-header">Broadcast</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 64 64"
          >
            <path
              fill="currentColor"
              d="M54.014 32.004c-.035 5.582-.273 11.222.164 16.798c2.234-5.416 2.826-11.154 2.895-16.783c-.102-5.642-.662-11.371-2.895-16.802c-.401 5.577-.199 11.206-.164 16.787M62 32.02c-.131-8.449-.871-16.953-3.578-25.197c.045 8.553.551 17.099.514 25.654c-.035 8.242-.494 16.482-.514 24.72C61.139 48.963 61.869 40.463 62 32.02m-11.792-4.875l-.138-.03C49.552 13.98 46.978 4 43.883 4c-.596 0-1.171.377-1.718 1.067c-1.188 1.322-16.44 18.026-29.503 19.641c-1.529.189-2.99.346-4.346.459c-1.578.133-3.014.207-4.252.207c0 0-2.064 3.212-2.064 6.648c0 3.441 2.068 6.648 2.068 6.648c1.238 0 2.676.074 4.254.205c.575.049 1.177.109 1.787.172v13.402h8.082l7.938-7.416c8.864 5.846 16.087 13.992 16.087 13.992v-.027c.531.648 1.09 1.002 1.667 1.002c3.095 0 5.669-9.98 6.188-23.115l.138-.029c.843 0 1.528-2.176 1.528-4.855c-.001-2.682-.686-4.856-1.529-4.856M43.883 6.098c1.429 1.257 3.646 8.565 4.171 20.574l-8.242-1.809c.656-10.926 2.715-17.574 4.071-18.765M14.15 34.566c-.912 0-1.654-.883-1.654-1.968c0-1.088.742-1.97 1.654-1.97c.914 0 1.652.882 1.652 1.97c.001 1.086-.738 1.968-1.652 1.968m4.041 10.33v-4.092c.989.387 1.979.832 2.961 1.326zm0-6.222V28.241h-4.664c.17-.617.362-1.201.561-1.729c9.87-1.811 20.355-10.882 25.833-16.244c-1.417 5.133-2.323 12.959-2.323 21.732c0 8.798.911 16.644 2.337 21.777c-4.709-4.609-13.163-11.994-21.744-15.103m25.692 19.228c-1.355-1.191-3.415-7.84-4.071-18.766l8.242-1.809c-.525 12.009-2.742 19.318-4.171 20.575"
            ></path>
          </svg>
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
          <button className="create-message">Create</button>
        </div>
      </div>
    </>
  );
}

export default BroadcastMessages;
