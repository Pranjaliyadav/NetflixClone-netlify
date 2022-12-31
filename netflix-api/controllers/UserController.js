// const { response } = require("express");
// const User = require("../models/UserModel");

// module.exports.getLikedMovies = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const user = await await User.findOne({ email });
//     if (user) {
//       res.json({ msg: "success", movies: user.likedMovies });
//     } else return res.json({ msg: "User with given email not found." });
//   } catch (err) {
//     return response.json({ msg: "Error fetching movie" });
//   }
// };

// module.exports.addToLikedMovies = async (req, res) => {
//   try {
//     const { email, data } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       const { likedMovies } = user;
//       const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
//       if (!movieAlreadyLiked) {
//         await User.findByIdAndUpdate(
//           user._id,
//           {
//             likedMovies: [...user.likedMovies, data],
//           },
//           { new: true }
//         );
//       } else return res.json({ msg: "Movie already added to the liked list." });
//     } else await User.create({ email, likedMovies: [data] });
//     return res.json({ msg: "Movie added successfully" });
//   } catch (error) {
//     return response.json({ msg: "Error adding movie" });
//   }
// };


// module.exports.removeFromLikedMovies = async (req, res) => {
//   try {
//     const { email, movieId } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       const movies = user.likedMovies;
//       const movieIndex = movies.findIndex(({ id }) => id === movieId);
//       if (!movieIndex) {
//         res.status(400).send({ msg: "Movie not found" });
//       }
//       movies.splice(movieIndex, 1);

//       await User.findByIdAndUpdate(
//         user._id,
//         {
//           likedMovies:movies,
//         },
//         { new: true }
//       );
//       return res.json({ msg: "Movie deleted", movies:movies });
//     }else return res.json({ msg: "User with given email not found." });
   
//   } catch (err) {
//     return res.json({ msg: "Error deleting Movie" });
//   }
// };


const User = require("../models/UserModel");

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};
/*
this unction is designed to retrieve the liked movies of a user from a
mongoDB databse. this fn exports a function that handles an HTTP GET request in node.js server
fn takes 2 args req - http request, res object - http response. req object has params property
which contains parameters from the url of the request
we get desrtuted email paramerter here
the fn then uses the mongoose findOne method to search the user model for a document
with the specified email field. if doc found the fn return json object with msg field set to succes and movies field set to 
value of likedMovies. 
we get a http response

*/

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};
/*
this code ecports a function that hanles http post request in node.js server
the function is designed to add a movie to the liked movies list of a user in mongoDBdatabase
req has a body prop that contains the requst body. from body we getting email and data
the data field is expected to contain the movie document to be added to the liked movie List
findOne which is a mongoDB method is used to search the usr model for a document with specified email
if doc found the function checks if the movie is already added in likedMovies array of doc
if not we update the doc with findByIdAndUpdate method (by mongoDB) with new movie doc
If no document is found, the function creates a new user document with the email and likedMovies fields set to the values provided in the request body.

*/

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        return res.status(400).send({ msg: "Movie not found." });
        //added this later - was causing a problem earlier
        
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};

/*
this function removes a movie from the list of liked movies for user. function receives
email and movie id as req body params 
if the movie is found the fn finds the index of movie in users list of likedmovies using findIndex method
if found then removes the movie using splice methood and updates the user object using findByIdAndUpdate method


*/