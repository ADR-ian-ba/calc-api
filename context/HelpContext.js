const mongoose = require('mongoose');

const helpContextSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    required: true,
    enum: ['General', 'Bug'],
  },
  description: {
    type: String,
    required: false, 
    trim: true
  }
});

// Create the model
const HelpContext = mongoose.model('HelpContext', helpContextSchema);

module.exports = HelpContext;