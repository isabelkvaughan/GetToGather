import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

const Signup = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleUsernameBlur = () => {
    setUsernameTouched(true);
    setUsernameValid(userFormData.username !== "");
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailValid(userFormData.email !== "");
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setPasswordValid(userFormData.password !== "");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      // Mark all fields as touched to show feedback
      setUsernameTouched(true);
      setEmailTouched(true);
      setPasswordTouched(true);
      setValidated(true);
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    // Clear form values and reset states
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
    setUsernameTouched(false);
    setEmailTouched(false);
    setPasswordTouched(false);
    setUsernameValid(true);
    setEmailValid(true);
    setPasswordValid(true);
    setValidated(false);
  };

  return (
    <>
      <form className="auth-form">
        <h2>Sign Up</h2>
        {/* This is needed for the validation functionality above */}
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {/* show alert if server response is bad */}
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            Something went wrong with your signup!
          </Alert>

          <Form.Group className="mb-3 form-div">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleInputChange}
              onBlur={handleUsernameBlur}
              value={userFormData.username}
              required
            />
            {usernameTouched && !usernameValid && (
              <Form.Control.Feedback type="invalid" className="form-feedback">
                Username is required!
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3 form-div">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleInputChange}
              onBlur={handleEmailBlur}
              value={userFormData.email}
              required
            />
            {emailTouched && !emailValid && (
              <Form.Control.Feedback type="invalid" className="form-feedback">
                Email is required!
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3 form-div">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleInputChange}
              onBlur={handlePasswordBlur}
              value={userFormData.password}
              required
            />
            {passwordTouched && !passwordValid && (
              <Form.Control.Feedback type="invalid" className="form-feedback">
                Valid password required!
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button
            disabled={
              !(
                userFormData.username &&
                userFormData.email &&
                userFormData.password
              )
            }
            type="submit"
            variant="success"
          >
            Sign Up
          </Button>
        </Form>
        <p>
          Already have an account? <Link to="/login">Log in instead</Link>
        </p>
      </form>
    </>
  );
};

export default Signup;
