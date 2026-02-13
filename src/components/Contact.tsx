import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <div className="contact-content">
                    <p className="contact-text">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
                        I'll try my best to get back to you!
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <span className="contact-label">Email:</span>
                            <a href="mailto:subrathshetty2k06@gmail.com" className="contact-link">subrathshetty2k06@gmail.com</a>
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">Phone:</span>
                            <span className="contact-value">+91-9148777807</span>
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">Location:</span>
                            <span className="contact-value">Mangaluru, Karnataka</span>
                        </div>
                    </div>

                    <a href="mailto:subrathshetty2k06@gmail.com" className="btn btn-primary contact-btn">
                        Say Hello
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
