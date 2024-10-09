import React, { useState } from "react";
import "./Featured.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translation hook

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation(); // Translation hook

  const handleSubmit = () => {
    if (input.trim()) {
      navigate(`/gigs?search=${input.trim()}`);
    }
  };

  // Define the popular services with translation keys
  const popularServices = [
    t("featured.webDesign"),
    t("featured.wordPress"),
    t("featured.logoDesign"),
    t("featured.aiServices"),
  ];

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1 className="main-title">
            {t("featured.findPerfect")} <span className="highlight">freelance</span> {t("featured.services")}
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./icons/search1.png" alt={t("featured.searchIconAlt")} />
              <input
                type="text"
                placeholder={t("featured.placeholder")}
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </div>
            <button onClick={handleSubmit}>{t("featured.searchButton")}</button>
          </div>
          <div className="popular">
            <span>{t("featured.popular")}:</span>
            {popularServices.map((service) => (
              <button key={service} onClick={() => navigate(`/gigs?search=${service}`)}>
                {service}
              </button>
            ))}
          </div>
        </div>
        <div className="right">
          <img src="./img/background-laptop.jpg" alt={t("featured.backgroundImageAlt")} />
        </div>
      </div>
    </div>
  );
}

export default Featured;
