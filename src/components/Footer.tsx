import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-socials">
                    <a href="https://github.com/Shubrathshetty" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/shubrath-shetty-014019330/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        LinkedIn
                    </a>
                    <a href="mailto:subrathshetty2k06@gmail.com" aria-label="Email">
                        Email
                    </a>
                </div>
                <p className="footer-copyright">
                    © {currentYear} Shubrath Shetty. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
