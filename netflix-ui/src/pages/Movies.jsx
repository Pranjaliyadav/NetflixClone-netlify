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
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const [isScrolled, setIsScrolled] = useState(false);
  const genres = useSelector((state) => state.netflix.genres);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
    //when scroll length is more than 0 and true then navbar background turns black from transparent
  };

  useEffect(() => {
    // console.log("in use effect")
    dispatch(getGenres());
  }, []);

  //if genres are loaded
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movies" }));
    }
  },[genresLoaded]);

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
