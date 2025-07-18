import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section">
      <div className="about-container">
        <div className="pixel-container">
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#fff', fontSize: '18px' }}>
            PLAYER PROFILE
          </h2>
          
          <div className="about-content">
            <div className="about-stats">
              <div style={{ color: '#ccc', fontSize: '11px', lineHeight: '1.8', marginBottom: '25px' }}>
                Motivated and detail-oriented individual with a strong foundation in software 
                development and Full stack development. Passionate about building efficient 
                solutions and continuously enhancing technical skills.
              </div>

              <div className="education-section">
                <div className="section-title">EDUCATION QUEST</div>
                <div className="education-item">
                  <div className="institution">GLA University, Mathura, UP</div>
                  <div className="degree">Bachelor in Technology - Computer Science Engineering</div>
                  <div className="details">
                    Expected: May 2026 | CPI: 7.63<br/>
                    Coursework: Web Development, Software Engineering, Operating Systems, Algorithms, DSA
                  </div>
                </div>
              </div>

              <div className="experience-section">
                <div className="section-title">TRAINING MISSIONS</div>
                <div className="experience-item">
                  <div className="company">Jovac's Job Oriented Value-Added Course</div>
                  <div className="position">Full Stack Web Development Intern</div>
                  <div className="details">
                    June 2024 – July 2024<br/>
                    • Developed multiple web applications with JavaScript, HTML/CSS, and Node.js<br/>
                    • Participated in code reviews and testing for quality assurance<br/>
                    • Gained experience in debugging and troubleshooting applications<br/>
                    • Collaborated with team on responsive and dynamic web solutions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;