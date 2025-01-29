// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // require('dotenv').config();

// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // mongoose.connect(process.env.MONGODB_URI)
// //   .then(() => console.log('Connected to MongoDB Atlas'))
// //   .catch(err => console.error('MongoDB connection error:', err));

// //   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const PORT = process.env.PORT || 5000; // Default to 5000 if not specified in .env

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import your routes
const timeslotRoutes = require('./routes/timeslotRoutes');
// const userRoutes = require('./routes/userRoutes'); // If you have user routes

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use(timeslotRoutes);  // Register your timeslot routes here

// Auth routes (if you have a user.js file for authentication routes)
// app.use(userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
