const Joi = require('joi');
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  miner: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true
  },
  type: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  block: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true
  },
});

const Activity = mongoose.model('User', activitySchema);

function validateActivity(activity) {
  const schema = Joi.object({
    miner: Joi.string().min(5).max(1024).required(),
    type: Joi.string().min(5).max(255).required(),
    time: Joi.date().required(),
    block: Joi.string().min(1).max(255).required()
  });

  return schema.validate(activity);
}

exports.activitySchema = activitySchema;
exports.Activity = Activity;
exports.validateActivity = validateActivity;