
import "./Home.css";
import Slide from "../../components/slider/Slide";
import { cards, projects } from "../../data";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedby/TrustedBy";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              Protected payments, every time
            </div>
            <p>
              Always know what you&apos;ll pay upfront. Your payment isn&apos;t released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              24/7 support
            </div>
            <p>
              Get support any time of day, with round-the-clock assistance.
            </p>
          </div>
          <div className="item">
            <img src="./img/homepageimage.jpg" alt="Homepage visual" />
          </div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>SkillShare Businesses</h1>
            <h2>Explore our businesses and join to get the best services.</h2>
            <p>
              Upgrade to a curated experience packed with tools and benefits, dedicated to businesses.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              Connect with freelancers with proven business experience
            </div>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              Get matched with the perfect talents
            </div>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            {/* <button className="business-explore-button">Explore Our Businesses</button> */}
          </div>
          <div className="item">
            <img className="clean-desk-image" src="./img/cleanDesk.jpg" alt="Clean desk" />
          </div>
        </div>
      </div>

      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((project) => (
          <ProjectCard key={project.id} item={project} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
