import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//import TopicsDropdown from "./components/forum/DropdownMenu/Dropdown/TopicsDropdown";

import ForumTopicThreads from "./components/forum/ForumTopicThreads";
import ForumMain from "./components/forum/ForumMain";
import Login from "./components/login/Login";  // Import the Login component
import RegistrationMain from "./components/registration/RegistrationMain";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forum" element={<ForumMain />} />
          <Route path="/signup" element={<RegistrationMain />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
