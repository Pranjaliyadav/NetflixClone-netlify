import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";
import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};
//initial state of redux store with three properties- 2 arrays and 1 boolean

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=c4f79a656174a40d7584098be8efeb0e"
  );
  //console.log(data);
  return genres;
}); //this function is for getting genres
/* this fucntion is a async thunk action creator
takes a string thats the action - netflix/genres, and a function that returns a promise
we make a http request using axios to moviedb to get genre. fetches list of movie and genres and 
return data
statur cant be pending, fulfilled or rejected
*/

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      //getting the genres_ids
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      //if movie has a poster then only we want this movie and push it in array
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
        //we only need frst three genre for each movie and movies tends to have many genres
      });
    }
  });
};
/* 
this function takes three args - movie(raw data), movieData(processed data will be stored here)
genres(genres data)
the fucntion iterates over the movie array and process each movie object
it extracts genre_ids for each movie and uses the find method to find the corres genre name
in the genres 
some movie genre doesnt have name so if theres name then we store it to movieGenres array
 
then we check if moviesposter is there(backdrop) if yes then only we
we push to moviesArray a new object including movie id, name, image and genre
if movie name to movie original name , and if that not exist then original title
genres property is set to frst three genres in movieGenre array using slice

*/

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    //we need minimum sixty movies.
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    //we first get all raw data and store it in data-results
    createArrayFromRawData(results, moviesArray, genres);
    //now we send this empty moviesArray and results and the genres we got earlier
  }
  return moviesArray;
}; //this function gets the raw data of movies based on genres
/*
gets three args - api (api endpoint for making http request to fetch movie data)
genres(genre data array),paging(boolean indicator to whether the api data supports pagination i.e, have multiple pages of data)
we make multiple http request using axios , we get 60 movies total from 10 iterations
we process the data using createArrayFroRawData fn
return moviesArray when finished , it has processed data 
*/

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/3/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
    //console.log(data);
  }
);
/*
creating a async thunk action creator , passing an action string netflix/trending
and function that returns a promise. takes 2 args - object called type and a thunk api object
uses a getState() method of thunk abpi to get current state of redux store and extract genres property from sate
thencalls function getRawData funcion with api endpoint , genres and pagnation set to true


*/

export const fetchDataByGenre = createAsyncThunk(
  "netflix/moviesByGenres",
  async ({ genre, type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=c4f79a656174a40d7584098be8efeb0e&with_genres=${genre}`,
      genres
    );
    //console.log(data);
  }
); 
/*
same as above just with small tweaks it process movie data by genre

*/


export const getUserLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  }
); 
/*
getUserLikedMovies function is an async thunk action creator that can be used to fetch a list of movies that a user has liked from a server and update the state of a Redux store.


*/

export const removeFromLikedMovies = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put(`http://localhost:5000/api/user/remove`, {
      email,
      movieId,
    });
    return movies;
  }
);
// removeFromLikedMovies function is an async thunk action creator that can be used to remove a movie from a list of liked movies on a server and update the state of a Redux store.


const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
}); //we got the movies from api and now its stored in our redux store
/*
uses createSlice fn from redux toolkit library to craete a redux slice for managing states 
of a netflx application. 
a slice is a reducer fn thats resposnsible for managing a specific part of global state
name is name of slice which is used as a namespace for action types
itialstate is initialstae of action types
extraReducers property is an object that defines aditional reducers for handling specific action
extraReducers object in this code defines reducers for handling the fulfilled state of each
of the async thunk action creators that were imported at the top of the file
each reducer uodate the state of slice with actions

*/

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
/*
reducer property is an objet that maps slice name to slice reducers
neflix slice defined to NeflixSlice.reducer for global state


*/





/*
index.js store

we import 3 function from redux toolkit -
configureStore - this function creates a new redux store. it takes an object 
with configuration optios as an arguement, such as root reducer, middle, and initial state.
the state is then used to manage the applications state and dispatch actions 
to update the state.

createAysncThunk - this function creates a redux action creator that can be used
to perform asychronous operations, such as making API call.
it takes a function that return promise as an argument, and returns a thunk
action tht can be dispatched to the store.

createSlice - creates new reduc reducer and action creators for a slice of the state.
takes an object wih initial state, reducer fn, action creators as args and return
object with reducer and action creators.

Overall, these functions from the @reduxjs/toolkit library provide a convenient way to configure and manage the Redux store, perform asynchronous actions, and create reducers and action creators for slices of the state. They can help you write more maintainable and scalable Redux code.

thunk returns a function, often used to perform async oprn, like making API call
slice - piece of redux state managed by specific reducer, can epresent specifi feature
or data model in application, such as list of users or form. eeach slice 
as thier own reducer function thats used to update state on the actions that are
dispatched to the store
reducer - pure function that takes actions and state and then return new state
used to update redux store
action creator - returns an action object, make it easier to dispath action to store
root reducer - top level reducer for redux storecombine all reducers 
overall , these are all used to update state and ui. 

axios is js library for handling http requst, get, put, delet, post and other types of request, handling responses and errors
has clean and moder api, feature like automatic transformation of JSON data, support for interceptors
automatic hadling of CRSF tokens
make api, make request to a server from node.js app. used with react or angular to handle http request in client side app


Redux is a useful tool for managing the state of complex applications. It provides a predictable and simple way to manage state and enforce a unidirectional data flow, which can make it easier to develop and maintain applications.


*/ 