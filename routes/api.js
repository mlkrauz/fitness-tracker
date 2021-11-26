const router = require('express').Router();
const Workout = require('../models/workout');

router.get('/workouts', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
  ])
  .then(workouts => res.json(workouts))
  .catch(error => res.status(500).json(error))
})

router.post('/workouts', async (req, res) => {
  Workout.create({})
  .then(newWorkouts => res.json(newWorkouts)) 
  .catch(error => res.status(500).json(error))
})

router.put('/workouts/:id', async (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: { exercises: req.body }
    },
    { new: true }
  )
  .then(updatedWorkout => res.json(updatedWorkout))
  .catch(error => res.status(500).json(error))
})

router.get('/workouts/range', async (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration"}
      }
    }
  ])
  .sort({ _id: -1 })
  .limit(7)
  .then(workouts => res.json(workouts))
  .catch(error => res.status(500).json(error))
})

module.exports = router