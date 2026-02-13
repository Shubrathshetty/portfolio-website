'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Achievements', href: '#achievements' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link href="/" className="nav-logo">
                    Shubrath Shetty
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links desktop-only">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="nav-link">
                            {link.name}
                        </Link>
                    ))}
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <span className={`hamburger ${isOpen ? 'open' : ''}`}></span>
                </button>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="nav-link"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button onClick={toggleTheme} className="theme-toggle mobile" aria-label="Toggle Theme">
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
