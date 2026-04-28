require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});
const cors = require("cors")

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts')

// express app
const app = express();

// middleware
app.use(express.json());

// cross-origin error solution
const origins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://workout-app.dbeigi.com",
  "https://www.workout-app.dbeigi.com",
  "https://your-workout-tracker.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (origins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use((req, res, next) => {
  next()
})

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => {
    // listen for requests
    console.log(`Connected to ${process.env.NODE_ENV || 'development'} database`)
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    })
  })
  .catch(err => console.log(err));



