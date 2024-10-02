import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

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
            Chatbot
          </span>
          <span>English</span>
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
                      <Link to="/mygigs">Gigs</Link>
                      <Link to="/add">Add New Gig</Link>
                    </>
                  )}
                  <Link to="/orders">Orders</Link>
                  <Link to="/messages">Messages</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link to="/register" className="link">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <div className="menu">
          <Link to="/">Graphics & Design</Link>
          <Link to="/">Video & Animation</Link>
          <Link to="/">Writing & Translation</Link>
          <Link to="/">AI Services</Link>
          <Link to="/">Digital Marketing</Link>
          <Link to="/">Music & Audio</Link>
          <Link to="/">Programming & Tech</Link>
          <Link to="/">Business</Link>
          <Link to="/">Lifestyle</Link>
        </div>
      )}
      {/* Render ChatBot */}
      {showChatBot && <ChatBot />}
    </nav>
  );
}
