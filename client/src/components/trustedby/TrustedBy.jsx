import React from "react";
import "./TrustedBy.css";
import { useTranslation } from "react-i18next";

const TrustedBy = () => {
  const { t } = useTranslation(); // Hook for translation

  return (
    <div className="trustedBy">
      <div className="container">
        <span className="trustedBy-text">{t("trustedBy.trustedBy")}</span>
        <div className="trustedBy-logos">
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png"
            alt={t("trustedBy.facebookLogoAlt")}
            className="trustedBy-logo"
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png"
            alt={t("trustedBy.googleLogoAlt")}
            className="trustedBy-logo"
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png"
            alt={t("trustedBy.netflixLogoAlt")}
            className="trustedBy-logo"
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png"
            alt={t("trustedBy.paypalLogoAlt")}
            className="trustedBy-logo"
          />
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
