import React, { useState } from "react";
import AuthService from "../api/authService";

export default function Login({ setUserState, history }) {
  const authService = new AuthService();
  const [err, setError] = useState(null);
  const [inputFields, setUser] = useState({ username: "", password: "" });

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setUser({ ...inputFields, [name]: value });
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const user = await authService.register(inputFields);
      setUserState(user);
      history.push("/profile");
    } catch (err) {
      const { message } = err.response.data;
      setError(message);
    }
  };

  return (
    <div>
      <h1>Register!</h1>
      <form onSubmit={submitHandler}>
        <input
          onChange={onChangeHandler}
          type="text"
          name="username"
          placeholder="Your username"
        />
        <input
          onChange={onChangeHandler}
          type="password"
          name="password"
          placeholder="Your password"
        />
        <button type="submit">Register!</button>
      </form>
      {err && <p className="error">{err}</p>}
    </div>
  );
}
