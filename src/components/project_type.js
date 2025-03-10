import "./project_type.css"
const Project = ({ projectnum, projecttitle, project_desc, project_gif, caption }) => {
    return (
      <div className="project_span">
        <h3 className="project_head">{projectnum} {projecttitle}</h3>
        <div className="project_content">
          <figure className="project_figure">
            <img src={project_gif} alt="Project GIF" className="project_gif" />
            {caption && <figcaption className="project_caption">{caption}</figcaption>}
          </figure>
          <span className="project_desc">{project_desc}</span>
        </div>
      </div>
    );
  };
  
  export default Project;
  