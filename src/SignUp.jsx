import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup" className="container">
      <ul>
        {errors.map((error) => (
          <li key={error} className="text-danger">
            {error}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input name="name" type="text" className="form-control" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input name="email" type="email" className="form-control" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" className="form-control" id="password" />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">Password confirmation:</label>
          <input name="password_confirmation" type="password" className="form-control" id="password_confirmation" />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Signup
        </button>
      </form>
    </div>
  );
}
