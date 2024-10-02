import "./ProjectCard.css";

function ProjectCard({ item }) {
  return (
    <div className="projectCard">
      <img src={item.img} alt="Project preview" />
      <div className="info">
        <img src={item.pp} alt="Profile picture" />
        <div className="texts">
          <h2>{item.cat}</h2>
          <span>{item.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
