import React from 'react';

interface Skill {
  name: string;
  level: string;
  icon: string;
}

const Skills: React.FC = () => {
  const technicalSkills: Skill[] = [
    { name: 'JavaScript', level: '', icon: '⚡' },
    { name: 'Python', level: '', icon: '🐍' },
    { name: 'Java', level: '', icon: '☕' },
    { name: 'C', level: '', icon: '🔧' },
    { name: 'React.js', level: '', icon: '⚛️' },
    { name: 'Node.js', level: '', icon: '🟢' },
    { name: 'MongoDB', level: '', icon: '🍃' },
    { name: 'SQL', level: '', icon: '🗃️' },
    { name: 'Git/GitHub', level: '', icon: '📚' },
    { name: 'DSA', level: '', icon: '🧮' }
  ];

  const professionalSkills: Skill[] = [
    { name: 'Communication', level: '', icon: '💬' },
    { name: 'Problem Solving', level: '', icon: '🧩' },
    { name: 'Team Management', level: '', icon: '👥' },
    { name: 'Leadership', level: '', icon: '👑' }
  ];

  const certifications = [
    'Back End Development and APIs - freeCodeCamp',
    'Full Stack Web Development - Coding Lock',
    'Quality Assurance - freeCodeCamp'
  ];

  return (
    <section id="skills" className="section">
      <div className="skills-container">
        <div className="pixel-container">
          <h2 className="skills-title">SKILL INVENTORY</h2>
          
          <div className="skills-categories">
            <div className="skill-category">
              <h3 className="category-title">TECHNICAL SKILLS</h3>
              <div className="skills-inventory">
                {technicalSkills.map(skill => (
                  <div key={skill.name} className="skill-item">
                    <span className="skill-icon">{skill.icon}</span>
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-level">LVL: {skill.level}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h3 className="category-title">PROFESSIONAL SKILLS</h3>
              <div className="skills-inventory">
                {professionalSkills.map(skill => (
                  <div key={skill.name} className="skill-item">
                    <span className="skill-icon">{skill.icon}</span>
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-level">LVL: {skill.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="certifications">
            <h3>ACHIEVEMENT UNLOCKED</h3>
            <div className="cert-list">
              {certifications.map((cert, index) => (
                <div key={index} style={{ marginBottom: '8px' }}>
                  🏆 {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;