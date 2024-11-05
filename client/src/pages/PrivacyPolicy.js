import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <section className="privacypolicy">
      <div className="privacypolicy-header">
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us. Here’s how we handle your data with care and responsibility.</p>
      </div>

      <div className="privacypolicy-content">
        <div className="privacypolicy-section">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly, such as when you register, use our services, or communicate with us. This may include your name, email address, and any other details required for using our platform.</p>
        </div>

        <div className="privacypolicy-section">
          <h2>2. How We Use Your Information</h2>
          <p>Your information is used to improve your experience with IntelliChat. This includes customizing content, improving features, and providing customer support. We may also use your information for analytical purposes to enhance our service.</p>
        </div>

        <div className="privacypolicy-section">
          <h2>3. Data Sharing & Disclosure</h2>
          <p>We do not sell or share your personal information with third parties for their marketing purposes. We may share your data with trusted partners to operate our platform, in compliance with data protection regulations.</p>
        </div>

        <div className="privacypolicy-section">
          <h2>4. Data Security</h2>
          <p>We take the security of your data seriously. We use advanced encryption, secure servers, and regular audits to protect your information from unauthorized access, alteration, or disclosure.</p>
        </div>

        <div className="privacypolicy-section">
          <h2>5. Cookies & Tracking Technologies</h2>
          <p>Our site uses cookies to remember your preferences and improve your experience. You may choose to disable cookies in your browser settings, but this may affect functionality.</p>
        </div>

        <div className="privacypolicy-section">
          <h2>6. Your Rights & Choices</h2>
          <p>You have the right to access, update, or delete your personal data. Contact us at any time to exercise these rights. You can also opt out of marketing communications or deactivate your account if desired.</p>
        </div>

        <div className="privacypolicy-section">
          <h2>7. Policy Updates</h2>
          <p>We may update this policy periodically to reflect changes in our practices or for legal reasons. We encourage you to review this page regularly. Continued use of our platform implies acceptance of our updated terms.</p>
        </div>

        <div className="privacypolicy-contact">
          <h2>Contact Us</h2>
          <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at <a href='mailto:mail2ankit1234@gmail.com' style={{color:'#f5c518'}}>mail2ankit1234@gmail.com</a></p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
