require('dotenv').config();
const cors = require("cors")

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts')

// express app
const app = express();

// middleware
app.use(express.json());

// cross-origin error solution
app.use(cors("http://localhost:4000"))

app.use((req, res, next) => {
  next()
})

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    })
  })
  .catch(err => console.log(err));



