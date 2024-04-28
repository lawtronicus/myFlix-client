import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./login-view.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const LoginView = ({ onLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <Row className="justify-content-md-center">
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
          <Link to="/signup">
            <Button
              className="sign-up-button"
              variant="dark"
              style={{ color: "white" }}
            >
              Sign up!
            </Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
