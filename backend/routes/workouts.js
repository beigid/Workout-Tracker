const express = require('express');

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
  getExerciseSuggestions
} = require('../controllers/workoutController');

const router = express.Router();

// GET suggestion workouts from wger API
router.get('/exercises', getExerciseSuggestions);

// GET all workouts
router.get('/',  getWorkouts);

// GET a single workouts
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout)

// DELETE a new workout
router.delete('/:id', deleteWorkout);

// UPDATE a new workout
router.patch('/:id', updateWorkout);


module.exports = router;