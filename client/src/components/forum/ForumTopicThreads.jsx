import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ForumTopicThreads.css";
import DropdownButton from "./DropdownButton";
import NavbarComp from "../navbar/Navbar";
import Footer from "../footer/Footer";
import BackButton from "./BackButton";

const ForumTopicThreads = () => {
  // trying to connect to the DB
  const { topic } = useParams();
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);
  const [parentTag, setParentTag] = useState("");

  //effect to fetch all threads under a certain topic
  //console.log(topic);
  useEffect(() => {
    //setThreads([]);
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
        //console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching threads:", error);
        setError("Failed to fetch threads");
      });
  }, [topic]);

  //effect to fetch all threads with a tag, within a topic
  //console.log(topic, parentTag);
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
          //console.log(Object.keys(threads).length, threads);
          //console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching threads with this tag:", error);
          setError("Failed to fetch threads by tag");
          setThreads(data.message);
        });
    }
  }, [parentTag, topic]);

  //handle select function to navigate between tags
  const handleSelect = (tag) => {
  //setThreads([]);
  setError(null);
    const parentTag = tag;
    setParentTag(tag);
    //console.log(threads);
    
    //console.log("tag: ",tag);
    console.log("parent tag: ", parentTag);
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
            <DropdownButton onSelect={handleSelect} />
          </h3>

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

/*
to do:
- handle when no threads returned, show message on screen
- requests that aren't updating on frontend?
- commenting and code tidy
*/
