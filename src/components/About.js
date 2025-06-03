import React from 'react';
import { motion } from 'framer-motion';
import '../styles/AboutUs.scss';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <motion.h1 
                className="title"
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1 }}
            >
                Welcome to TechNest
            </motion.h1>

            <motion.p 
                className="description"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5, duration: 1 }}
            >
                **TechNest isn't just a tech store—it’s an ecosystem built for tech enthusiasts, professionals, and businesses.**  
                We provide cutting-edge **technology, expert guidance, and premium support** to ensure you always stay ahead.  
                With a passion for innovation and excellence, TechNest redefines how you experience technology.
            </motion.p>

            <motion.div className="image-section">
                <img src="/images/techstore.jpg" alt="TechNest Store" />
            </motion.div>

            <motion.div className="vision-section">
                <h2>Our Vision</h2>
                <p>
                    At TechNest, we believe in **technology without limits**. Our goal is to provide **unparalleled innovation, unmatched quality, and future-proof products** 
                    that empower individuals and businesses alike. Whether you're a gamer, a creative professional, or an entrepreneur, 
                    we offer solutions that maximize your potential.
                </p>
            </motion.div>

            <motion.div className="mission-section">
                <h2>Why TechNest?</h2>
                <ul>
                    <li><strong>📱 Unrivaled Selection:</strong> From flagship smartphones to high-performance gaming PCs.</li>
                    <li><strong>✅ Rigorous Quality Control:</strong> Every product is **tested for excellence** before reaching our shelves.</li>
                    <li><strong>🚀 Expert Support:</strong> A team of specialists dedicated to **helping you make the best choice**.</li>
                    <li><strong>💰 Competitive Pricing:</strong> Premium tech at **reasonable prices**—because quality shouldn’t break the bank.</li>
                    <li><strong>📦 Fast & Secure Delivery:</strong> Get your favorite tech **quickly and safely**.</li>
                    <li><strong>🔄 Hassle-Free Returns:</strong> Because we believe in **100% customer satisfaction**.</li>
                </ul>
            </motion.div>

            <motion.div className="values-section">
                <h2>Our Core Values</h2>
                <p>
                    **At TechNest, our values drive every decision we make.**  
                    We are committed to providing the highest standard of **integrity, quality, and innovation** in everything we do.
                </p>
                <ul>
                    <li><strong>🔹 Innovation:</strong> Staying ahead of trends to bring you the **latest advancements**.</li>
                    <li><strong>🔹 Integrity:</strong> Transparency and trust are the foundation of our business.</li>
                    <li><strong>🔹 Customer-Centricity:</strong> Your satisfaction is our **top priority**.</li>
                    <li><strong>🔹 Sustainability:</strong> We promote **eco-friendly tech and responsible recycling**.</li>
                </ul>
            </motion.div>

            <motion.div className="team-section">
                <h2>Meet the TechNest Team</h2>
                <p>
                    **Our team is composed of dedicated tech enthusiasts, engineers, and customer support experts** who share one mission:  
                    **To make high-quality technology accessible, reliable, and easy to understand.**  
                    Whether you need product recommendations, troubleshooting, or the latest insights, our specialists are here to help.
                </p>
            </motion.div>

            <motion.div className="future-section">
                <h2>The Future of TechNest</h2>
                <p>
                    TechNest is **more than a store—it’s a revolution in how people connect with technology**.  
                    We are constantly expanding, bringing new features, **AI-powered recommendations**, and **personalized tech solutions** to enhance your experience.  
                    Join us on this journey, and be part of a future where innovation meets accessibility.
                </p>
            </motion.div>
        </div>
    );
};

export default AboutUs;
