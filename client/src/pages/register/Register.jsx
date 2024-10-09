import React, { useState } from "react";
import upload from "../../utils/upload.js";
import "./Register.css";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translation hook

function Register() {
  const { t } = useTranslation(); // Hook for translation
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    phone: "",
    isSeller: false,
    desc: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({
      ...prev,
      isSeller: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password || !user.country) {
      setError(t("register.fillAllFields")); // Use translation for error message
      return;
    }

    if (file && !["image/jpeg", "image/png"].includes(file.type)) {
      setError(t("register.invalidImage")); // Use translation for error message
      return;
    }

    setLoading(true);
    try {
      const url = file ? await upload(file) : "";
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      setError(t("register.registrationFailed")); // Use translation for error message
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>{t("register.createAccount")}</h1> {/* Use translation for the title */}
          
          <label htmlFor="username">{t("register.username")}</label>
          <input
            name="username"
            type="text"
            placeholder={t("register.usernamePlaceholder")} // Use translation for placeholder
            onChange={handleChange}
            required // Added required attribute for better validation
          />

          <label htmlFor="email">{t("register.email")}</label>
          <input
            name="email"
            type="email"
            placeholder={t("register.emailPlaceholder")} // Use translation for placeholder
            onChange={handleChange}
            required // Added required attribute for better validation
          />

          <label htmlFor="password">{t("register.password")}</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            required // Added required attribute for better validation
          />

          <label htmlFor="file">{t("register.profilePicture")}</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <label htmlFor="country">{t("register.country")}</label>
          <input
            name="country"
            type="text"
            placeholder={t("register.countryPlaceholder")} // Use translation for placeholder
            onChange={handleChange}
            required // Added required attribute for better validation
          />

          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? t("register.registering") : t("register.register")} {/* Use translation for button text */}
          </button>
        </div>

        <div className="right">
          <h1>{t("register.becomeSeller")}</h1> {/* Use translation for the title */}
          <div className="toggle">
            <label htmlFor="isSeller">{t("register.activateSeller")}</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>

          <label htmlFor="phone">{t("register.phone")}</label>
          <input
            name="phone"
            type="text"
            placeholder={t("register.phonePlaceholder")} // Use translation for placeholder
            onChange={handleChange}
          />

          <label htmlFor="desc">{t("register.description")}</label>
          <textarea
            name="desc"
            placeholder={t("register.descriptionPlaceholder")} // Use translation for placeholder
            cols="30"
            rows="5"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
