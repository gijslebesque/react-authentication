import React, { useReducer } from "react";
import AuthService from "../api/authService";
import { authFormReducer as reducer } from "../reducers";

export default function Login({ setUserState, history }) {
  const authService = new AuthService();

  const [state, dispatch] = useReducer(reducer, {
    err: null,
    username: "",
    password: ""
  });

  const onChangeHandler = e => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const user = await authService.login(state);
      setUserState(user);
      history.push("/profile");
    } catch (err) {
      const { message } = err.response.data;
      dispatch({ type: "error", payload: message });
    }
  };
  return (
    <div>
      <h1>Login!</h1>
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
        <button type="submit">Login!</button>
      </form>
      {state.err && <p className="error">{state.err}</p>}
    </div>
  );
}
