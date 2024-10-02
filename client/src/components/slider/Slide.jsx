import PropTypes from "prop-types";
import Marquee from "react-fast-marquee";
import "./Slide.css";

const Slide = ({ children, speed = 50 }) => {
  return (
    <div className="slide">
      <div className="container">
        <Marquee speed={speed} pauseOnHover>
          <div className="marquee">
            {children}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

// Define PropTypes to enforce type checking
Slide.propTypes = {
  children: PropTypes.node.isRequired,
  speed: PropTypes.number,
};

// Default props for fallback values
Slide.defaultProps = {
  speed: 50,
};

export default Slide;
