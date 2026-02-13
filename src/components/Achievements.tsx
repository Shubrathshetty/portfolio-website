import React from 'react';

const Achievements = () => {
    const achievements = [
        {
            title: 'IEEE Member',
            description: 'Active member of the Institute of Electrical and Electronics Engineers.',
            icon: '🏆',
        },
        {
            title: '2nd Prize in District Drama Competition',
            description: 'Awarded for outstanding performance in a district-level drama competition.',
            icon: '🎭',
        },
    ];

    return (
        <section id="achievements" className="section achievements-section">
            <div className="container">
                <h2 className="section-title">Achievements</h2>
                <div className="achievements-grid">
                    {achievements.map((item, index) => (
                        <div key={index} className="achievement-card">
                            <div className="achievement-icon">{item.icon}</div>
                            <h3 className="achievement-title">{item.title}</h3>
                            <p className="achievement-description">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
