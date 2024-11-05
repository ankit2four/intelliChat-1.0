import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-links">
        <a href="/aboutus">About Us</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/privacy">Terms of Service</a>
        <a href="mailto:mail2ankit1234@gmail.com">Contact Us</a>
      </div>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
         <FaTwitter/>
        </a>
        <a href="https://www.linkedin.com/in/ankit-singh-638733243/" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
        <a href="https://www.instagram.com/abhi.singh.ankit/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://github.com/ankit2four" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
