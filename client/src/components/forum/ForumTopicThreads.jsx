import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ForumTopicThreads.css";
import DropdownButton from "./DropdownButton";
import NavbarComp from "../navbar/Navbar";
import Footer from "../footer/Footer";
import BackButton from "./BackButton";

const ForumTopicThreads = () => {
  const { topic } = useParams();
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);
  const [parentTag, setParentTag] = useState("");

  //effect to fetch all threads under a certain topic
  useEffect(() => {
    setError(null);
    fetch(`http://localhost:3000/threads/${encodeURIComponent(topic)}`)
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
  }, [topic]); //only re-render if topic changes, had issues if parentTag changed too.

  //effect to fetch all threads with a tag, within a topic e.g. carer tag under SEND
  useEffect(() => {
    setThreads([]);
    setError(null);
    if (parentTag) {
      fetch(
        `http://localhost:3000/threads/${encodeURIComponent(
          topic
        )}/${encodeURIComponent(parentTag)}`
      )
        .then((response) => {
          if (response.status === 404) {
            // 404 handling for if no threads exist with that tag/topic combination
            return response.json().then((data) => {
              setError(data.message);
              console.log(data.message);
              setThreads(data.message);
              setThreads([]);
            });
          }

          if (!response.ok) {
            setError("there has been an error");
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setThreads(data);
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching threads with this tag:", error);
          setError("Failed to fetch threads by tag");
          setThreads(data.message);
        });
    }
  }, [parentTag, topic]);

  //handleSelect function to navigate between tags: changes dropdown text
  const handleSelect = (tag) => {
    setError(null);
    setParentTag(tag);
  };

  return (
    <>
      <div className="AllForums">
        <NavbarComp />
        <div className="header">
          <h2>{topic}</h2>
          <p>...explore threads by topic or start your own!</p>
        </div>
        <div className="TownHall">
          <h3>
            All posts for {topic}
            <div className="buttons-div">
              <DropdownButton onSelect={handleSelect} />
            </div>
          </h3>
          {/* error handling in rendering */}
          {error ? (
            <p>{error}</p>
          ) : (
            <ul className="TownHallPosts">
              {Array.isArray(threads) && threads.length > 0 ? (
                threads.map((thread) => (
                  <li key={thread.thread_id}>
                    <Link to={`/conversation/${thread.thread_id}`}>
                      {thread.thread_title}
                    </Link>
                  </li>
                ))
              ) : (
                <p>Sorry! No posts (yet) for this tag under {topic}.</p>
              )}
            </ul>
          )}
        </div>
      </div>
      <BackButton />
      <Footer />
    </>
  );
};

export default ForumTopicThreads;