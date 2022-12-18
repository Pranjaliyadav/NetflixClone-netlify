import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate(); //useNavigate is a hook and helps in navigating thru pages, normally provide path with it

  const [showPassword, setShowPassword] = useState(false); //initially setting it to false
  const [formValues, setFormValues] = useState({  
    email: "",
    password: "",
  }); // initially setting it to blank

  const handleSignIn = async () => { //async function calls new=eds await and visavis
    // console.log(formValues)
    try { //we try then catch the error if we get any
      const { email, password } = formValues; //current setting email and password to empty formvalues previously set using useState
      await createUserWithEmailAndPassword(firebaseAuth, email, password); //we provide email and password to firebaseAuth when we click on sign up button, the user list will be updated in firebase console
    } catch (err) { 
      console.log(err);
    }
  }; //this function gets activated with onClick event on Signup button

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  }); //if we got that user already existing in firebase console then we just navigate to homepage.
  //to re-test it, just delete database from console>application>indexDB >db >delete

  return (
    <Container showPassword={showPassword}>
      {/* we set up container for react styled components.
      we are passing whether to  showPassword or not, initially its true.so hidden password */}
      <BackgroundImage /> 
      {/* its just the background image,we created a separate component for that */}
      <div className="content">
        {/* we setting up content css properties in index.css */}

        <Header login /> 
        {/* its another components containing prop that can be login or signup. we set it login here,if we remve that it'll show signup on site */}
        
        <div className="body flex column a-center j-center">
          {/* setting all of their css property in index.css */}
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more </h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart memebership
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              // giving it form values email, initially blank
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                }) 
                // ...formValues contains previous written value and then e.target gets updated with the value that contains formvalues being updated
              }
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                  // doing the same for password
                }
              />
            )}

            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          <button onClick={handleSignIn}>Sign Up</button>
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
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;

    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
          
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;

          font-weight: bolder;
          font-size: 1.05rem;
        }
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
`;
