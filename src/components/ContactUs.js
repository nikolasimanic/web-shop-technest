import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../styles/ContactUs.scss';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const response = await axios.post('http://localhost:4000/send-email', formData);
            if (response.data.success) {
                setStatus('Message sent successfully! 🎉');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('Failed to send message. Try again.');
            }
        } catch (error) {
            setStatus('Error sending message. Please try later.');
        }
    };

    return (
        <div className="contact-container">
            <motion.div className="glow-effect glow1"></motion.div>
            <motion.div className="glow-effect glow2"></motion.div>

            <motion.h1 
                className="title"
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1 }}
            >
                Contact TechNest
            </motion.h1>

            <motion.p className="description">
                Got questions? Need support? We're here to help!
            </motion.p>

            <motion.form 
                className="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5, duration: 1 }}
            >
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>

                <motion.button whileHover={{ scale: 1.05 }} type="submit">
                    Send Message
                </motion.button>
            </motion.form>

            {status && <motion.p className="status">{status}</motion.p>}
        </div>
    );
};

export default ContactUs;
