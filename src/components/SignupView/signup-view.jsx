import { useState } from "react";
import "./signup-view.scss";
import ModalContainer from "../styled-components/modal-container/modal-container";

export const SignupView = ({ onSignUp, onCancelSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      dob: dob,
    };
    fetch("https://my-flix-application-66e35a87937e.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok"); // Handle non-2xx responses
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response from server");
        }
        return response.json();
      })
      .then((data) => {
        if (data && !data.errors) {
          const loginData = {
            email: email,
            password: password,
          };
          fetch(
            "https://my-flix-application-66e35a87937e.herokuapp.com/login",
            {
              method: "POST",
              body: JSON.stringify(loginData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.user && data.token) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onSignUp(data.user, data.token);
              } else {
                alert(
                  "Login failed after sign up. Please try logging in manually."
                );
              }
            })
            .catch((loginError) => {
              console.error("login error after signup:", loginError);
              alert("There was a problem loggin you in after signup.");
            });
        } else {
          alert("Signup failed: " + (data.errors || "unknown error"));
        }
      })
      .catch((signupError) => {
        console.error("Signup error: ", signupError);
        alert("Signup failed: " + signupError.message);
      });
  };

  return (
    <ModalContainer className="signup-container">
      <h1>Sign Up</h1>
      <button className="back-to-login" onClick={onCancelSignup}>
        X
      </button>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            minLength="3"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </ModalContainer>
  );
};
