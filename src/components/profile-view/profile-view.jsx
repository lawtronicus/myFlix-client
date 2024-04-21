import { useEffect } from "react";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import "./profile-view.scss";
import { useNavigate } from "react-router-dom";

export const ProfileView = ({ user, token, movies, onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: user.email,
    password: "",
    username: user.username,
    dob: user.dob.split("T")[0],
  });

  const [show, setShow] = useState(false);

  const handleDeregister = () => {
    fetch(
      `https://my-flix-application-66e35a87937e.herokuapp.com/users/${user._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Your account has been successfully deleted.");
          onLogout();
          navigate("/signup");
        } else {
          alert("There was a problem deleting your account.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user._id;
    const dobISO = new Date(formData.dob).toISOString();
    const updatedFormData = {
      ...formData,
      dob: dobISO,
    };
    console.log(updatedFormData);
    fetch(
      `https://my-flix-application-66e35a87937e.herokuapp.com/users/${userId}/`,
      {
        method: "PUT",
        body: JSON.stringify(updatedFormData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Something went wrong with your fetch operation: " +
              response.statusText
          );
        }
      })
      .then((data) => {
        console.log("Success", data);
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error updating profile: " + error.message);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center" id="profile-container">
        <Col id="greeting" md={12} lg={6} className="p-4">
          <div className="circle">
            <h1>Hi</h1>
            <h1>{user.username}!</h1>
          </div>
        </Col>
        <Col md={12} lg={6}>
          <Form id="profile-info" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                name="email"
                type="text"
                value={formData.email}
                className="profile-input"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={formData.password}
                placeholder="Enter your password to change your information"
                className="profile-input"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                name="username"
                type="text"
                value={formData.username}
                className="profile-input"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                name="dob"
                type="date"
                value={formData.dob}
                className="profile-input"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: "8rem" }}>
              Submit
            </Button>
            <Button
              variant="danger"
              onClick={() => setShow(true)}
              style={{ width: "8rem" }}
            >
              Deregister
            </Button>
          </Form>
        </Col>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deregistration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to deregister your account? This action cannot
            be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeregister}>
              Deregister
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container>
  );
};
