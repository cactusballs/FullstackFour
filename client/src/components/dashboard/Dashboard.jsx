import React from "react";
import OnSaleEvents from "./OnSaleEvents.jsx";
import ImageCarousel from "./ImageCarousel";
import RecentForumPosts from "./RecentForumPosts";
import BroadcastMessages from "./Broadcast";
import NavbarComp from "../navbar/Navbar.jsx";
import EventsSpotlight from "./EventsSpotlight.jsx";
import Poll from "./Poll";
import Footer from "../footer/Footer.jsx";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="page-container">
      <div className="dashboard-page">
        <NavbarComp />
        <div className="dashboard-grid">
          {/* <div className="dashboard-row"> */}
          <div className="dashboard-item">
            <EventsSpotlight />
          </div>
          <div className="dashboard-item">
            <ImageCarousel />
          </div>
          <div className="dashboard-item">
            <RecentForumPosts />
          </div>
          <div className="dashboard-item">
            <OnSaleEvents />
          </div>
          <div className="dashboard-item">
            <Poll pollId={2} />
          </div>
          <div className="dashboard-item">
            <BroadcastMessages />
          </div>
        </div>
        {/* <div className="dashboard-row"> */}
        {/* </div> */}
        {/* </div> */}
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
