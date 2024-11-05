import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBrain, FaLightbulb, FaLanguage, FaUserShield, FaCode, FaChartLine, FaPen, FaBook, FaTools } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import TestimonialForm from '../components/TestimonialForm';


function Home() {
  //console.log("home rendered")
  const [testimonials, setTestimonials] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/testimonials`, { withCredentials: true });
        setTestimonials(response.data);
        //console.log(response.data)
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <Header />
      <motion.section
      className="hero-section container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-content">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to IntelliChat
        </motion.h1>
        <motion.p
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your AI-Powered Conversational Partner
        </motion.p>
        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/chat" style={{ textDecoration: 'none', color: 'inherit' }}>Start Chatting</Link>
        </motion.button>
      </div>
      <div className="hero-shapes">
        {/* Add multiple shape divs for the geometric effect */}
        <div className="shape" />
        <div className="shape" />
        <div className="shape" />
        
      </div>
    </motion.section>

      <section className="features-section">
    <h2>Why Choose IntelliChat?</h2>
    <div className="features-grid">
      <div className="feature-item">
        <FaBrain className="feature-icon" />
        <h3>Intelligent Conversations</h3>
        <p>Engage in natural and meaningful conversations powered by advanced AI algorithms.</p>
      </div>
      <div className="feature-item">
        <FaLightbulb className="feature-icon" />
        <h3>Creative Brainstorming</h3>
        <p>Use IntelliChat to brainstorm ideas, write content, and develop new concepts.</p>
      </div>
      <div className="feature-item">
        <FaLanguage className="feature-icon" />
        <h3>Language Translation</h3>
        <p>Communicate effortlessly across different languages with our built-in translation feature.</p>
      </div>
      <div className="feature-item">
        <FaUserShield className="feature-icon" />
        <h3>Secure and Private</h3>
        <p>Your conversations are secure, with strong privacy measures to protect your data.</p>
      </div>
      <div className="feature-item">
        <FaCode className="feature-icon" />
        <h3>Coding Assistance</h3>
        <p>Get help with coding problems, debug your code, and explore new programming concepts.</p>
      </div>
      <div className="feature-item">
        <FaChartLine className="feature-icon" />
        <h3>Data Analysis</h3>
        <p>Analyze data patterns and get insights with IntelliChat's data-driven capabilities.</p>
      </div>
      <div className="feature-item">
        <FaPen className="feature-icon" />
        <h3>Content Writing</h3>
        <p>Enhance your writing process with AI assistance for creating and editing content.</p>
      </div>
      <div className="feature-item">
        <FaBook className="feature-icon" />
        <h3>Learning Support</h3>
        <p>Get assistance on various learning topics, study guides, and practice exercises.</p>
      </div>
      <div className="feature-item">
        <FaTools className="feature-icon" />
        <h3>More Tools</h3>
        <p>Access a suite of additional tools to enhance productivity and knowledge.</p>
      </div>
    </div>
  </section>

        <section className="testimonial-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials">
          <motion.div
          className='testimonial'
          whileHover={{scale: 1.05}}>
            <p>😊</p>
            <p>"This website is created for hassle free User Experience, I tried my best to make it as minimalistic as I can. Thank you."</p>
            <span>- Ankit Singh, IntelliChat Developer</span>
          </motion.div>
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial._id}
              className="testimonial"
              whileHover={{ scale: 1.05 }}
            >
              <p>"{testimonial.content}"</p>
              <span>- {testimonial.authorName}, {testimonial.occupation}</span>
            </motion.div>
          ))}
        </div>
        <TestimonialForm />
      </section>

      <Footer />
    </>
  );
}

export default Home;
