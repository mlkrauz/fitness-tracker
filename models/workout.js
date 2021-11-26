const mongoose = require('mongoose')

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
  day: {
    type: Date,
    required: true,
    default: Date.now
  },
  exercises: [{
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    weight: {
      type: Number
    },
    sets: {
      type: Number
    },
    reps: {
      type: Number
    },
    duration: {
      type: Number
    },
    distance: {
      type: Number
    }
  }]
})

const Workout = mongoose.model("Workout", exerciseSchema)

module.exports = Workout
