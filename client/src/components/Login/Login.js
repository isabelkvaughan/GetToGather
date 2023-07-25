import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

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

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setEmailTouched(true);
      setPasswordTouched(true);
      return;
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: "",
      password: "",
    });
    setEmailTouched(false);
    setPasswordTouched(false);
  };

  return (
    <>
      <form className="auth-form">
        <h2>Login</h2>
        {showAlert && (
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            variant="danger"
          >
            Something went wrong with your login credentials!
          </Alert>
        )}
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3 form-div">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              onChange={handleInputChange}
              onBlur={handleEmailBlur}
              value={userFormData.email}
              required
            />
            {emailTouched && (
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
            {passwordTouched && (
              <Form.Control.Feedback type="invalid" className="form-feedback">
              Valid password required!
            </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
            variant="success"
          >
            Submit
          </Button>
        </Form>
        <p>
          Don't have an account? <Link to="/signup">Sign up instead</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
