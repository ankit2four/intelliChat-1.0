// Backend: server.js
const cors = require('cors');

const fs = require('fs');
const https = require('https');
const express = require('express');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();
const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'https://localhost:3000', // Update to HTTPS for your frontend's origin
  credentials: true,
};
app.use(cors(corsOptions));

const sslOptions = {
  key: fs.readFileSync('../cert/localhost+2-key.pem'),  // Replace with the path to your .key file
  cert: fs.readFileSync('../cert/localhost+2.pem')  // Replace with the path to your .crt file
};

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// SSE route
app.get('/api/stream', async (req, res) => {
  const prompt = req.query.prompt || "Write a story about a magic backpack.";

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const result = await model.generateContentStream(prompt);

  // Send each chunk to the client as it's received
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
  }

  res.write("event: end\n");  // Notify frontend that streaming is complete
  res.end();
});

const PORT = process.env.PORT || 5000;
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Secure server started on https://localhost:${PORT}`);
});
