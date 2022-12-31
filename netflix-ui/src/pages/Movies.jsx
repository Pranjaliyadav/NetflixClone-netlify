import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getGenres } from "../store";
import { fetchMovies } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenres from "../components/SelectGenres";

export default function Movies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  /*
  these lines of code re using the useSelector hook from react-redux lib to retrive
  data from the redux store
  useSelector hook is a way to access the state of redux store in a funtion 
  component in react. it takes a function as args and that fn recieves the current
  state of redux store as an arguement and returns a value that represents a piece 
  of data from the store
  we are retrieving the value of genresLoaded property from the netflix slice of
  the redux store. the useSelector will be called everytime gnresLoaded val chnges and then chnges re rendered

  */

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
    //when scroll length is more than 0 and true then navbar background turns black from transparent
  };
  /*
  onscroll is an event. if scroled then window.pageYoffset is true ow false. 
  window.pageYOffset is a property that returns the number of pixels that the current
  document has been scrolled vertically from the top of the window
   return () => (window.onscroll = null); its a cleanup function making sure to onscrll event
   is properly cleand up when the component is unmounted
  
  */

  useEffect(() => {
    // console.log("in use effect")
    dispatch(getGenres());
  }, []); 
  //when the component is mounted then dispatch an action to redux store for getgenres

  //if genres are loaded
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movies" }));
    }
  },[genresLoaded]);
/*
when the component rendered and genresLoaded variable changes 
if we got genresloaded then dispatcj an action to store to fetchmovies action creator
we'll get movies by genre
*/


  //   onAuthStateChanged(firebaseAuth, (currentUser) => {
  //     if (currentUser) navigate("/");
  //   }); //if we got that user already existing in firebase console then we just navigate to homepage.
  //to re-test it, just delete database from console>application>indexDB >db >delete

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="data">
        <SelectGenres genres={genres} 
        type="movie"
        />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

/*

useDispatch hook comes with dispatch function thats a crucial part of reduc
thru this w can dispatch actions to the store, the action is a javascript
object that describes an event that has occured in your application.redux store
update its state based on the action and current state of store



*/