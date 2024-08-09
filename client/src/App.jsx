import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BroadcastMessages from "./components/dashboard/Broadcast.jsx";
import ImageCarousel from "./components/dashboard/ImageCarousel.jsx";
import "./components/dashboard/ImageCarousel.css";
import ForumTopicThreads from "./components/forum/ForumTopicThreads";
import ForumMain from "./components/forum/ForumMain";
import Login from "./components/login/Login"; // Import the Login component
import Registration from "./components/registration/Registration"; 
//import TopicsDropdown from "./components/forum/DropdownMenu/Dropdown/TopicsDropdown";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Registration />} />
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
      {/* I've put both here for now so can look at one below the other */}
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <BroadcastMessages />
      <ImageCarousel />
      {/* Use ImageCarousel component with correct capitalization */}
    </>
  );
}

export default App;
