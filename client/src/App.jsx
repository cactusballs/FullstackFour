import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BroadcastMessages from "./components/dashboard/Broadcast.jsx";
import ImageCarousel from "./components/dashboard/ImageCarousel.jsx";
// import "./components/dashboard/ImageCarousel.css";
import ForumTopicThreads from "./components/forum/ForumTopicThreads";
import RecentForumPosts from "./components/dashboard/RecentForumPosts";
import ForumMain from "./components/forum/ForumMain";
import Login from "./components/login/Login"; // Import the Login component
import SingleThread from "./components/forum/SingleThread.jsx";
import Footer from "./components/footer/Footer.jsx";
import Body from "./components/body/Body.jsx";
import Registration from "./components/registration/Registration.jsx";
import LocalEvents from "./components/dashboard/LocalEvents.jsx";
//import TopicsDropdown from "./components/forum/DropdownMenu/Dropdown/TopicsDropdown";
import EventsForm from "./components/events/EventForm.jsx";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/footer" element={<FooterPage />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/events" element={<Events />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

function Forum() {
  return (
    <div>
      <ForumMain />
      <ForumTopicThreads />
      <SingleThread id={5} />
      <Footer />
      {/* update thread id to navigate between conversations*/}
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <BroadcastMessages />
      <RecentForumPosts />
      <ImageCarousel />
      <LocalEvents />
      {/* Use ImageCarousel component with correct capitalization */}
    </>
  );
}

function Events() {
  return (
    <>
      <EventsForm />
    </>
  );
}

function FooterPage() {
  return (
    <>
      <Body />
      <Footer />
    </>
  );
}

export default App;
