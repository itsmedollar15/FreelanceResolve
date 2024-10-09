import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import newRequest from "../../utils/newRequest";
import ChatBot from "../chatbot/Chatbot"; // Adjust the import path accordingly
import "./Navbar.css";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false); // State to control ChatBot visibility
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { t, i18n } = useTranslation(); // Initialize translation hook
  const [language, setLanguage] = useState("en"); // State to track the current language

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle language toggle
  const handleLanguageToggle = () => {
    const newLanguage = language === "en" ? "hi" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const toggleChatBot = () => {
    setShowChatBot((prev) => !prev); // Toggle ChatBot visibility
  };

  return (
    <nav className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">FreelanceResolve</span>
            <span className="dot">.</span>
          </Link>
        </div>
        <div className="links">
          <span onClick={toggleChatBot} className="chatbot-btn" style={{ cursor: "pointer" }}>
            {t("navbar.chatbot")} {/* Translatable Chatbot Link */}
          </span>
          <button onClick={handleLanguageToggle} className="language-toggle">
            {language === "en" ? "English" : "हिन्दी"}
          </button>
          {currentUser ? (
            <div className="user" ref={menuRef}>
              <img
                src={currentUser.img || "/img/noman.png"}
                alt={currentUser.username}
                onClick={() => setOpen(!open)}
              />
              <span onClick={() => setOpen(!open)}>{currentUser.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link to="/mygigs">{t("navbar.gigs")}</Link>
                      <Link to="/add">{t("navbar.addNewGig")}</Link>
                    </>
                  )}
                  <Link to="/orders">{t("navbar.orders")}</Link>
                  <Link to="/messages">{t("navbar.messages")}</Link>
                  <button onClick={handleLogout}>{t("navbar.logout")}</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                {t("navbar.signIn")}
              </Link>
              <Link to="/register" className="link">
                <button>{t("navbar.join")}</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <div className="menu">
          <Link to="/">{t("menu.graphicsDesign")}</Link>
          <Link to="/">{t("menu.videoAnimation")}</Link>
          <Link to="/">{t("menu.writingTranslation")}</Link>
          <Link to="/">{t("menu.aiServices")}</Link>
          <Link to="/">{t("menu.digitalMarketing")}</Link>
          <Link to="/">{t("menu.musicAudio")}</Link>
          <Link to="/">{t("menu.programmingTech")}</Link>
          <Link to="/">{t("menu.business")}</Link>
          <Link to="/">{t("menu.lifestyle")}</Link>
        </div>
      )}
      {/* Render ChatBot */}
      {showChatBot && <ChatBot />}
    </nav>
  );
}
