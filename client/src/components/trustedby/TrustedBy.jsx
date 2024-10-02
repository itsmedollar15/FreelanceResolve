import "./TrustedBy.css";

const TrustedBy = () => {
  return (
    <div className="trustedBy">
      <div className="container">
        <span className="trustedBy-text">Trusted by:</span>
        <div className="trustedBy-logos">
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png"
            alt="Facebook logo"
            className="trustedBy-logo"
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png"
            alt="Google logo"
            className="trustedBy-logo"
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png"
            alt="Netflix logo"
            className="trustedBy-logo"
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png"
            alt="PayPal logo"
            className="trustedBy-logo"
          />
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
