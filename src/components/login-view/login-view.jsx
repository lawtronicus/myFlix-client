import { useState, useEffect } from "react";
import "./login-view.scss";

export const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      access: email,
      secret: password,
    };

    fetch("https://my-flix-application-66e35a87937e.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };
  return (
    <>
      <div className="login-container">
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
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
