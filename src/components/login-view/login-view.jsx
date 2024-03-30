import { useState } from "react";
import "./login-view.scss";
import ModalContainer from "../styled-components/modal-container/modal-container";
import { SignupView } from "../SignupView/signup-view";

export const LoginView = ({ onLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    fetch("https://my-flix-application-66e35a87937e.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        console.error("Error: ", e);
        alert("Something went wrong");
      });
  };

  // Toggle between Login and SignUp views
  const toggleSignUp = () => {
    setIsSigningUp(!isSigningUp);
  };

  return (
    <>
      {isSigningUp ? (
        <SignupView
          onSignUp={onLoggedIn}
          onCancelSignup={() => setIsSigningUp(false)}
        />
      ) : (
        <ModalContainer className="login-container">
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="email-label" htmlFor="email">
              Email:
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email"
                required
              />
            </label>
            <label className="password-label" htmlFor="password">
              Password:
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password"
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          <p>or</p>
          <button onClick={toggleSignUp}>Sign up!</button>
        </ModalContainer>
      )}
    </>
  );
};
