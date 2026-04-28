const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
const axios = require('axios');

// get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({error: 'Workout does not exist'});
  }

  const workout = await Workout.findById(id)

  if(!workout){
      return res.status(404).json({error: 'Workout not found'})
  }
  res.status(200).json(workout);
}

const getExerciseSuggestions = async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(200).json([]);
  const options = {
    method: 'GET',
    url: `https://exercisedb.p.rapidapi.com/exercises/name/${name}`,
    headers: {
      'X-RapidAPI-Key': process.env.EXERCISE_DB_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    const cleanedData = response.data.map(ex => ({
      name: ex.name.charAt(0).toUpperCase() + ex.name.slice(1), // Proper casing
      gifUrl: ex.gifUrl,
      bodyPart: ex.bodyPart
    }));

    res.status(200).json(cleanedData);
  } catch (error) {
    console.error("RapidAPI Error:", error.message);
    res.status(500).json({ error: 'Failed to fetch pro exercise list' });
  }
}

// create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = []

  if(!title) {
    emptyFields.push('title');
  }

  if(!load) {
    emptyFields.push('load');
  }

  if(!reps) {
    emptyFields.push('reps');
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
  }

  // add doc to db
  try {
    const workout = await Workout.create({title, load, reps});
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({error: 'Workout not found'})
  }

  const workout = await Workout.findByIdAndDelete({_id: id })

  if(!workout){
    return res.status(404).json({error: 'Workout not found'})
  }
  res.status(200).json(workout);
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({error: 'Workout not found'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if(!workout) {
    res.status(200).json({error: 'Workout not found'})
  }
}

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
  getExerciseSuggestions
}