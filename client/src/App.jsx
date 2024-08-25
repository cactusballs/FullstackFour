import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ForumTopicThreads from "./components/forum/ForumTopicThreads";
import RecentForumPosts from "./components/dashboard/RecentForumPosts";
import Poll from "./components/dashboard/Poll";
import ForumMain from "./components/forum/ForumMain";
import Login from "./components/login/Login"; // Import the Login component
import SingleThread from "./components/forum/SingleThread.jsx";
import Footer from "./components/footer/Footer.jsx";
import Registration from "./components/registration/Registration.jsx";
import MeetTheTeam from "./components/meet-the-team/MeetTheTeam.jsx";
// import NavbarComp from "./components/navbar/Navbar.jsx";
//import TopicsDropdown from "./components/forum/DropdownMenu/Dropdown/TopicsDropdown";
import Events from "./components/events/Events.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/threads/:topic" element={<ForumTopicThreads />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/meet-the-team" element={<MeetTheTeam />} />
          {/* Add more routes here if needed */}
          <Route path="/conversation/:id" element={<SingleThread />} />
        </Routes>
      </div>
    </Router>
  );
}

function Forum() {
  return (
    <div>
      <ForumMain />
      {/* <ForumTopicThreads />
      <SingleThread id={5} /> */}
      <Footer />
      {/* update thread id to navigate between conversations*/}
    </div>
  );
}

export default App;
