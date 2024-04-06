import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { SignupView } from "../SignupView/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import "./login-view.scss";

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
    <Row className="justify-content-md-center">
      {isSigningUp ? (
        <Container className="d-flex justify-content-center">
          <Col md={6}>
            <SignupView
              onSignUp={onLoggedIn}
              onCancelSignup={() => setIsSigningUp(false)}
            />
          </Col>
        </Container>
      ) : (
        <Col md={6}>
          <Form className="login-form" onSubmit={handleSubmit}>
            <h1>Login</h1>
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
            <Button variant="primary" type="submit" style={{ width: "84px" }}>
              Submit
            </Button>
          </Form>
          <div className="sign-up-redirect">
            <p>or</p>
            <Button
              className="sign-up-button"
              variant="secondary"
              onClick={toggleSignUp}
              style={{ color: "white" }}
            >
              Sign up!
            </Button>
          </div>
        </Col>
      )}
    </Row>
  );
};
