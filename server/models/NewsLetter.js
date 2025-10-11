const mongoose = require('mongoose');

const newsLetterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required : true
  },
  content: {
    type: String,
    required: true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  email: {
   type: String
  },
  media: [
  {
    url: String,            // Cloudinary/media URL
    cloudinary_id: String,  // Cloudinary public ID for deletion
    type: {                 // 'image' | 'video'
      type: String,
      enum: ['image', 'video'],
      required: true
    }
  }
],

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  department : {
    type : String,
    required : true
  }
},{timestamps : true});

module.exports = mongoose.model('NewsLetter',newsLetterSchema);