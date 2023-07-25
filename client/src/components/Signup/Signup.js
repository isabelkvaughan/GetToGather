// Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

const Signup = () => {
  const [formState, setFormState] = useState({ email: '', password: '', username: '' });
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      localStorage.setItem('id_token', data.addUser.token);
      // Redirect to the home page after successful signup
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      {error && <div>{error.message}</div>}
      <form onSubmit={handleFormSubmit}>
        <div className="form-div">
          <label>Username</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <div className="form-div">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <label className="form-div">Password</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login instead</Link>
      </p>
    </div>
  );
};

export default Signup;
