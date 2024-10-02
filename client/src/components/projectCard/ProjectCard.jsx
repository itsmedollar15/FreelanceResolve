import "./ProjectCard.css";

function ProjectCard({ item }) {
  return (
    <div className="projectCard">
      <img className="project-image" src={item.img} alt="Project preview" />
      <div className="info">
        <div className="texts">
          <h2 className="category">{item.cat}</h2>
          <span className="username">{item.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
