

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

/*
this code is defining a mongoose schema for a user model in node.js
appn. moongoose is a popular library for interacting with mongoDB databases in node.js

a schema in mongoose defines the shape of documents that will be stored in mongoDB collection
in this case we need email and likedMovies field
email type is string, required,unique and max 50 len
likedMovies is an array
this schema is then used to create a mongoose model , which is a class that
represnts a collection in the mongoDB database. mongoose.mdel is an function that takes two arguements
name of collection that the model represnts and the schema that defines the shape of documents in the collection

*/