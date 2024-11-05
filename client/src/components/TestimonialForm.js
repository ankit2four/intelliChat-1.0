// components/TestimonialForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TestimonialForm = () => {
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [occupation, setOccupation] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/testimonials`, { content, authorName, occupation }, { withCredentials: true });
      setContent('');
      setAuthorName('');
      setOccupation('');
      alert('Testimonial submitted!');
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Testimonial*"
        required
      />
      <input
        type="text"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="Your name*"
        required
      />
      <input
        type="text"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        placeholder="Your Occupation*"
        required
      />
      <button type="submit">Submit Testimonial</button>
    </form>
  );
};

export default TestimonialForm;
