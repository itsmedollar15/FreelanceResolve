import React, { useState } from "react";
import "./Featured.css";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (input.trim()) {
      navigate(`/gigs?search=${input.trim()}`);
    }
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1 className="main-title">
            Find the perfect <span className="highlight">freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./icons/search1.png" alt="Search icon" />
              <input
                type="text"
                placeholder='Try "building mobile app"'
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            {['Web Design', 'WordPress', 'Logo Design', 'AI Services'].map((service) => (
              <button key={service} onClick={() => navigate(`/gigs?search=${service}`)}>
                {service}
              </button>
            ))}
          </div>
        </div>
        <div className="right">
          <img src="./img/background-laptop.jpg" alt="Background with laptop" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
