const mongoose = require('mongoose')
const { isEmail } = require('validator')

const { Schema, model } = mongoose

const user = new Schema({
  full_name: { type: String, required: true, maxlength: 100 },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 35,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: [isEmail, 'invalid email'],
  },
  avatar: { data: Buffer, contentType: String },
  attempts: { type: Number, default: 0 },
  locked_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
},
{ timestamps: true })

module.exports = model('user', user)
