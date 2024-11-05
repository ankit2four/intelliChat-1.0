// routes/testimonials.js
const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/authMiddleware');

// Submit a testimonial
router.post('/', auth, async (req, res) => {
  const { userId, content, authorName, occupation } = req.body;
  const newTestimonial = new Testimonial({ userId, content, authorName,occupation});
  
  try {
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get the latest 12 testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .limit(14);
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
