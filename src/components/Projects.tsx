import React from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  tools: string[];
  icon: string;
  github?: string;
  demo?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "TeamSphere",
      description:
        "Built an internal chat and collaboration tool using React.js, Node.js, and MongoDB to streamline organizational communication. Implemented secure real-time messaging, group chats, file sharing, and user presence indicators. Developed authentication and role-based access control to ensure secure team interactions.",
      tools: ["React.js", "Node.js", "MongoDB", "WebSockets", "JWT"],
      icon: "👥",
      github: "https://github.com/Gautam-Sarraf/TeamSphere",
      demo: "#",
    },
    {
      id: 2,
      title: "AI Chat App",
      description:
        "Built an AI-powered real-time chat application for web using React and OpenAI's API, enabling dynamic user interactions. Implemented WebSocket support for seamless two-way communication and instant message delivery. Integrated MongoDB for efficient message storage and chat history retrieval.",
      tools: ["React", "OpenAI API", "WebSockets", "MongoDB", "Node.js"],
      icon: "🤖",
      github: "https://github.com/Gautam-Sarraf/Ai-chat",
      demo: "https://starlit-kringle-81141e.netlify.app/",
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="projects-container">
        <div className="pixel-container">
          <h2 className="projects-title">PROJECT ARCHIVE</h2>

          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <span style={{ fontSize: "60px" }}>{project.icon}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tools">
                  {project.tools.map((tool) => (
                    <span key={tool} className="tool-tag">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={project.github}
                    className="pixel-button secondary"
                    style={{ fontSize: "8px", padding: "8px 12px" }}
                  >
                    VIEW CODE
                  </a>
                  <a
                    href={project.demo}
                    className="pixel-button success"
                    style={{ fontSize: "8px", padding: "8px 12px" }}
                  >
                    LIVE DEMO
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
