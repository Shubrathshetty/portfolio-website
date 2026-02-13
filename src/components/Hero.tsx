import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <h1 className="hero-name">Shubrath Shetty</h1>
                <h2 className="hero-tagline">AI & Data Science Student</h2>
                <p className="hero-description">
                    Passionate about building intelligent systems and solving real-world problems.
                    Based in Mangaluru, Karnataka.
                </p>
                <div className="hero-actions">
                    <Link href="#contact" className="btn btn-primary">
                        Contact Me
                    </Link>
                    <Link href="#projects" className="btn btn-outline">
                        View Work
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
