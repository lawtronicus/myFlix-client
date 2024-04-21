import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import "./signup-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

export const SignupView = ({ onLoggedIn }) => {
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
          throw new Error("Network response was not ok");
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
              console.log(data);
              if (data.user && data.token) {
                onLoggedIn(data.user, data.token);
              } else {
                alert(
                  "Login failed after sign up. Please try logging in manually."
                );
              }
            })
            .catch((loginError) => {
              console.error("login error after signup:", loginError);
              alert("There was a problem login you in after signup.");
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
    <Row className="justify-content-md-center">
      <Col md={6}>
        <Form className="signup-form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <Link to="/login">
            <Button variant="warning" className="back-to-login">
              Back
            </Button>
          </Link>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type your Username"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ width: "84px" }}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
