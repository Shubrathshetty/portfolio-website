import React from 'react';

const Skills = () => {
    const technicalSkills = {
        Languages: ['Java', 'C', 'C++', 'Python', 'TypeScript', 'SQL'],
        Frameworks: ['Next.js', 'React', 'Laravel', 'FastAPI'],
        Databases: ['MySQL', 'PostgreSQL', 'Supabase', 'Firebase'],
        Tools: ['Docker', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Eclipse', 'Cisco Packet Tracer', 'Power BI'],
    };

    const softSkills = [
        'Time Management',
        'Adaptability',
        'Problem Solving',
        'Active Listening',
        'Communication',
        'Teamwork',
    ];

    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <h2 className="section-title">Skills</h2>

                <div className="skills-grid">
                    {Object.entries(technicalSkills).map(([category, skills]) => (
                        <div key={category} className="skill-category">
                            <h3 className="skill-category-title">{category}</h3>
                            <div className="skill-tags">
                                {skills.map((skill) => (
                                    <span key={skill} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="skill-category">
                        <h3 className="skill-category-title">Soft Skills</h3>
                        <div className="skill-tags">
                            {softSkills.map((skill) => (
                                <span key={skill} className="skill-tag soft-skill">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
