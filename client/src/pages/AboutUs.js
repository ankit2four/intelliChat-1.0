import React from 'react';
import './AboutUs.css';
import { FaBrain, FaUserFriends, FaLock, FaCogs } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <section className="aboutus">
      <div className="aboutus-header">
        <h1>About IntelliChat</h1>
        <p>Redefining how you engage, create, and communicate with cutting-edge AI.</p>
      </div>

      <div className="aboutus-content">
        <div className="aboutus-card">
          <FaBrain className="aboutus-icon" />
          <h3>Our Vision</h3>
          <p>We aim to bridge the gap between technology and human creativity, enabling everyone to harness the power of AI.</p>
        </div>

        <div className="aboutus-card">
          <FaUserFriends className="aboutus-icon" />
          <h3>Our Community</h3>
          <p>Our platform empowers creators, thinkers, and learners around the globe. Join us to be part of a thriving AI community.</p>
        </div>

        <div className="aboutus-card">
          <FaLock className="aboutus-icon" />
          <h3>Our Commitment to Privacy</h3>
          <p>Your data security is our top priority. We implement strong privacy measures to ensure your information is safe.</p>
        </div>

        <div className="aboutus-card">
          <FaCogs className="aboutus-icon" />
          <h3>Innovation Driven</h3>
          <p>We constantly evolve to deliver the latest AI technology, making it accessible and impactful for everyone.</p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
