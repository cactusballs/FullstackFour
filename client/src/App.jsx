import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BroadcastMessages from "./components/dashboard/Broadcast.jsx";
import ImageCarousel from './components/dashboard/ImageCarousel/ImageCarousel.jsx';
import './components/dashboard/ImageCarousel/ImageCarousel.css';

function App() {
  return (
    <>
      <BroadcastMessages />
      <ImageCarousel /> {/* Use ImageCarousel component with correct capitalization */}
    </>
  );
}

export default App;

