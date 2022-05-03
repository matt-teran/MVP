import axios from "axios";
import React, { useState } from "react";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const changeHandler = (ev) => {
    if (ev.target.id === "username") {
      setUsername(ev.target.value);
    } else if (ev.target.id === "email") {
      setEmail(ev.target.value);
    } else if (ev.target.id === "password") {
      setPassword(ev.target.value);
    }
  };

  const submitHandler = () => {
    // validate inputs

    axios
      .post("/api/login", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input
        placeholder="Email Address"
        id="email"
        onChange={changeHandler}
        value={email}
      />
      <input
        placeholder="Username"
        id="username"
        value={username}
        onChange={changeHandler}
      />
      <input
        placeholder="Password"
        id="password"
        onChange={changeHandler}
        value={password}
      />
      <button type="button" onClick={submitHandler}>
        login
      </button>
    </div>
  );
}
