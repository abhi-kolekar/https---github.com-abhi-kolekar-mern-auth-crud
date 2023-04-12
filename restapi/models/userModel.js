const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    name:{type: String, required: true},
    email:{type: String, required: false},
    password:{type: String, required: false},
    address:{type: String, required: false},
    mobile:{type: Number, required: false},
    photo:{type: String, required: false},
},{
    collection:'users'
})
module.exports  = mongoose.model("User", User)