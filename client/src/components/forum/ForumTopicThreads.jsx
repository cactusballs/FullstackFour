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
  const [ parentTag, setParentTag] = useState('');

  

  //effect to fetch all threads under a certain topic
  //console.log(topic);
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


  //effect to fetch all threads with a tag, within a topic
  //console.log(topic, parentTag);
  useEffect(() => {
    if(parentTag){
    fetch(`http://localhost:3000/threads/${encodeURIComponent(topic)}/${encodeURIComponent(parentTag)}`)
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
        console.error("Error fetching threads with this tag:", error);
        setError("Failed to fetch threads by tag");
      });
    }
  }, [parentTag, topic]);








  //handle select function to navigate between tags
  const handleSelect = (tag) => {
      console.log(tag);
    //const parentTag = event.target.value;
    console.log(tag, parentTag);
    setParentTag(tag);
  }

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
          
          <DropdownButton onSelect={handleSelect}/>
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
    <BackButton/>
     <Footer/>
     </>
  );
};

export default ForumTopicThreads;
