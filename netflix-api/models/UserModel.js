

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true,
        max:50,
       
    },
    likedMovies: Array,
     //arry of liked movies
})

module.exports = mongoose.model("users",userSchema)