import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on SSM</span>
            <span>Buying on SSM</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Community Hub</span>
            <span>Forum</span>
            <span>Events</span>
          </div>
          <div className="item">
            <h2>More From FreelanceResolve</h2>
            <span>FR Business</span>
            <span>FR Pro</span>
            <span>FR Logo Maker</span>
            <span>FR Guides</span>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <h2>FreelanceResolve</h2>
            <span>© {new Date().getFullYear()} FreelanceResolve International Ltd.</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/icons/twitter.png" alt="Twitter" />
              <img src="/icons/facebook.png" alt="Facebook" />
              <img src="/icons/linkedin.png" alt="LinkedIn" />
              <img src="/icons/pinterest.png" alt="Pinterest" />
              <img src="/icons/instagram.png" alt="Instagram" />
            </div>
            <div className="link">
              <img src="/icons/language.png" alt="Language" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/icons/rupee1.png" alt="Currency" />
              <span>INR</span>
            </div>
            <img src="/icons/accessibility.png" alt="Accessibility" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
