// React
import React, { useState } from 'react';
// Styles
import styles from './ContactPage.module.css';

export const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return (
        <div className={styles.contactPage}>
            <section className={styles.contactSection}>
                <h2 className={styles.contactTitle}>Contact Us</h2>
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Send Message</button>
                </form>
                <div className={styles.contactNote}>
                    We'll get back to you within 24 hours.
                </div>
            </section>
        </div>
    );
};
