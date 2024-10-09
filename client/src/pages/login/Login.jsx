import React, { useState } from "react";
import "./Login.css";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translation hook

function Login() {
  const { t } = useTranslation(); // Hook for translation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || t("login.errorMessage")); // Use translation for error messages
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>{t("login.welcomeBack")}</h1> {/* Use translation for the title */}
        
        <label htmlFor="username">{t("login.username")}</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder={t("login.usernamePlaceholder")} // Use translation for placeholder
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required // Added required attribute for better validation
        />
        
        <label htmlFor="password">{t("login.password")}</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder={t("login.passwordPlaceholder")} // Use translation for placeholder
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Added required attribute for better validation
        />
        
        <button type="submit">{t("login.loginButton")}</button> {/* Use translation for button text */}
        
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
