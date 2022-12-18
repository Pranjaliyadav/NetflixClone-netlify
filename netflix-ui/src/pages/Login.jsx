import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); //useNavigate is a hook and helps in navigating thru pages, normally provide path with it

  // const [showPassword, setShowPassword] = useState(false); //initially setting it to false
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  }); // initially setting it to blank

  const handleLogIn = async () => {
    //async function calls new=eds await and visavis
    // console.log(formValues)
    try {
      //we try then catch the error if we get any
      const { email, password } = formValues; //current setting email and password to empty formvalues previously set using useState
      await signInWithEmailAndPassword(firebaseAuth, email, password); //we provide email and password to firebaseAuth when we click on sign up button, the user list will be updated in firebase console
    } catch (err) {
      console.log(err);
    }
  }; //this function gets activated with onClick event on Signup button

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  }); //if we got that user already existing in firebase console then we just navigate to homepage.
  //to re-test it, just delete database from console>application>indexDB >db >delete

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header></Header>
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                // giving it form values email, initially blank
                onChange={
                  (e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  // ...formValues contains previous written value and then e.target gets updated with the value that contains formvalues being updated
                }
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={
                  (e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  // doing the same for password
                }
              />

              <button onClick={handleLogIn}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}



const Container = styled.div`

// thats how we make container for react styled components
  //setting up css properties here for full container


  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;
