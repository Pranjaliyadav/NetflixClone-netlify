const { addToLikedMovies, getLikedMovies, removeFromLikedMovies } = require("../controllers/UserController")

const router = require("express").Router()

router.get("/liked/:email",getLikedMovies)
router.post("/add",addToLikedMovies)
router.put("/remove",removeFromLikedMovies)
module.exports = router

/*
above code defines a set of routes for a user in the mongoDB database using the mongoose ODM object document mapping lib
The three routes defined in the router object are:

A GET route to retrieve the liked movies of a user with a given email. This route is handled by the getLikedMovies function from the UserController.
A POST route to add a movie to the liked movies of a user. This route is handled by the addToLikedMovies function from the UserController.
A PUT route to remove a movie from the liked movies of a user. This route is handled by the removeFromLikedMovies function from the UserController.
These routes are then exported from the file and can be used in the main application.

*/