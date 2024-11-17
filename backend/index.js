const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');


dotenv.config();
const app = express();
connectDB();

app.use(cookieParser());
 console.log(process.env.FRONTEND_URL || "nothing");
 // credentials: true,
// CORS Configuration
const corsOptions = {
 
  origin: 'https://intelli-chat-1-0-68aw.vercel.app', // Use environment variable for frontend URL in production
  credentials: true,
 
};
app.use(cors(corsOptions));

app.use(express.json()); 



// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Use the same MongoDB connection URI
      ttl: 14 * 24 * 60 * 60, // Session expiration time in seconds (14 days)
    }),
    cookie: {
     maxAge: 1000 * 60 * 60 * 24,
      secure: 'true', // process.env.NODE_ENV === 'production',  // Set secure cookies in production
      httpOnly: true,
      sameSite: 'None',//process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    },
  })
);

// Routes
app.use('/test', (req, res)=> {
  res.json({ message: "testing"});
});
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));

app.use('/', (req, res)=> {
  res.json({ message: "server is running for testing"});
});


// Start HTTP server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
