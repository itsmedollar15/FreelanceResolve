import "./Home.css";
import Slide from "../../components/slider/Slide";
import { cards, projects } from "../../data";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedby/TrustedBy";
import { useTranslation } from "react-i18next"; // Import translation hook

const Home = () => {
  const { t } = useTranslation(); // Translation hook

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
            <h1>{t("home.title")}</h1>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              {t("home.bestBudget")}
            </div>
            <p>{t("home.qualityWork")}</p>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              {t("home.protectedPayments")}
            </div>
            <p>{t("home.support")}</p>
          </div>
          <div className="item">
            <img src="./img/homepageimage.jpg" alt="Homepage visual" />
          </div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>FreelanceResolve</h1> {/* Brand name kept static */}
            <h2>
              {t("home.exploreServices")} {/* Add more translated keys here */}
            </h2>
            <p>
              {t("home.curatedExperience")}
            </p>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              {t("home.connectTalent")}
            </div>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              {t("home.perfectMatch")}
            </div>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              {t("home.boostProductivity")}
            </div>
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
