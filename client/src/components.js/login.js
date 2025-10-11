import React, { useState, useRef } from "react";
import Header from "./Header";
import {
  Formvalidation,
  FormNameValidation,
  FormPassValidation,
} from "../utils.js/validateform";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils.js/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adduser } from "../utils.js/userSlice";
import { toast } from "react-toastify";
import { Profile_Image } from "../utils.js/constents";

const Login = () => {
  
  const [isSignIn, setIsSignIn] = useState(true);
  // const [signincode, setSignincode] = useState(true);
  const [errmessage, setErrmessage] = useState("");
  const [errpassmessage, setErrpassmessage] = useState("");
  const [nameerrmessage, setNameerrmessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const funcsignIN = () => {
    setIsSignIn(!isSignIn);
    setErrmessage("");
    setErrpassmessage("");
    setNameerrmessage("");
  };


  const handleFormData = (e) => {
    e.preventDefault();

    const emailError = Formvalidation(email.current.value);
    setErrmessage(emailError);

    const passwordError = FormPassValidation(password.current.value);
    setErrpassmessage(passwordError);

    const fullNameValue = fullName.current ? fullName.current.value : "";
    const nameError = FormNameValidation(fullNameValue);
    setNameerrmessage(nameError);

    // Stop form submission if there are validation errors
    if (emailError || passwordError || (fullNameValue && nameError)) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log(user);
          
          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL:"https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg"
          }).then(() => {
            const { uid, email, displayName, photoURL} = user;
            dispatch(adduser({ uid: uid, email: email, displayName: displayName, photoURL:photoURL }));
            toast.success("Successfully Signed Up!!")
            navigate("/browser");
          }).catch((error) => {
            toast.error("Error While Signing Up");
            // console.error("Error updating profile:", error);
          });
        })
        .catch((error) => {
          toast.error("Error While Signing Up");
          // console.error("Error signing up:", error);
          setErrpassmessage(error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(() => {
          toast.success("User Sign In!!")
          navigate("/browser");
        })
        .catch((error) => {
          toast.error("Error While Signing In");
          console.error("Error signing in:", error);
          setErrpassmessage(error.message);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8728e059-7686-4d2d-a67a-84872bd71025/e90516bd-6925-4341-a6cf-0b9f3d0c140a/IN-en-20240708-POP_SIGNUP_TWO_WEEKS-perspective_WEB_34324b52-d094-482b-8c2a-708dc64c9065_large.jpg"
          alt="background"
        />
      </div>
      <form className="absolute p-12 bg-black w-3/12 my-40 mx-auto right-0 left-0 rounded-lg bg-opacity-65 text-white">
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign-In" : "Sign-Up"}
        </h1>
        {!isSignIn && (
          <>
            <input
              ref={fullName}
              type="text"
              placeholder="Full name"
              className="p-2 mt-6 w-full bg-gray-500"
            />
            <p className="text-red-600">{nameerrmessage}</p>
          </>
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email"
          className="p-2 mt-6 w-full bg-gray-500"
        />
        <p className="text-red-600">{errmessage}</p>
          <>
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-2 mt-6 w-full bg-gray-500"
            />
            <p className="text-red-600">{errpassmessage}</p>
          </>
        <button
          type="submit"
          className="p-4 mt-6 bg-red-700 w-full rounded-lg"
          onClick={handleFormData}
        >
          {isSignIn ? "Sign-In" : "Sign-Up"}
        </button>
        <h1 className="my-4">
          {isSignIn ? "New to Netflix?" : "Already have an account?"}
          <span
            className="underline cursor-pointer font-bold text-1xl"
            onClick={funcsignIN}
          >
            {isSignIn ? "Sign-Up" : "Sign-In"} now.
          </span>
        </h1>
      </form>
    </div>
  );
};

export default Login;
