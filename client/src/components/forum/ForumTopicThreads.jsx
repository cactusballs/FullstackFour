import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ForumTopicThreads.css";
import DropdownButton from "./DropdownButton";
import NavbarComp from "../navbar/Navbar";
import Footer from "../footer/Footer";

const ForumTopicThreads = () => {
  // trying to connect to the DB
  const { topic } = useParams();
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);
  console.log(topic);
  useEffect(() => {
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

  return (
    <>
    <div className="AllForums">
      <NavbarComp/>
      <div className="header">
        <h2>{topic}</h2>
        <p>...explore threads by topic or start your own!</p>
      </div>
      <div className="TownHall">
        <h3>
          All posts for {topic}
          <DropdownButton />
        </h3>

        {error ? (
          <p>{error}</p>
        ) : (
          <ul className="TownHallPosts">
            {threads.map((thread) => (
              <li key={thread.thread_id}>
                <Link to={"/conversation/" + thread.thread_id}>
                  {thread.thread_title}
                </Link>

                {/* element={<SingleThread id={thread.thread_id} />} */}
              </li>
            ))}
          </ul>
        )}
      </div>
     
    </div>
     <Footer/>
     </>
  );
};

export default ForumTopicThreads;
