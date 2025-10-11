const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

  email: { 
    type: String, 
    required: true,  
    unique: true,
    trim:true,
    lowercase:true
 },
  password: { 
    type: String, 
    required: true 
},
  role: { 
    type: String, 
    enum: ['user', 'admin','superadmin'], 
    default: 'user' 
},
  department : {
    type : String,
    default : ""
  },
  resetToken: String,
  resetTokenExpiration: Date
},{timestamps : true});


module.exports = mongoose.model('User', userSchema);
