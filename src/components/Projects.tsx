import React from 'react';
import Link from 'next/link';

const Projects = () => {
    const projects = [
        {
            title: 'Organex',
            description: 'An Event Management System for creating events .',
            tech: ['Laravel', 'Blade', 'PHP'],
            github: 'https://github.com/Shubrathshetty/organex',
            link: null, // No demo link provided
        },
        {
            title: 'Finding Missing Person',
            description: 'AI-powered system for identifying missing persons using facial recognition with age and gender detection.',
            tech: ['Python', 'OpenCV', 'Deep Learning'],
            github: 'https://github.com/Shubrathshetty/FINDING-MISSING-PERSON-USING-AI-AND-ALSO-SHOW-THE-AGE-AND-GENDER-DETECTION',
            link: null,
        },
        {
            title: 'Frost-Cast',
            description: 'A weather forecasting application providing accurate weather data.',
            tech: ['TypeScript', 'Weather API'],
            github: 'https://github.com/Shubrathshetty/Frost-Cast',
            link: null,
        },
        {
            title: 'Lumecode',
            description: 'Tool that analyzes source code and converts it into human-readable explanations.',
            tech: ['TypeScript', 'AI'],
            github: 'https://github.com/Shubrathshetty/lumecode',
            link: null,
        },
    ];

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <h2 className="section-title">Projects</h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tech">
                                {project.tech.map((t) => (
                                    <span key={t} className="tech-tag">{t}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                {project.github && (
                                    <Link href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                                        GitHub
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
