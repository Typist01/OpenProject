import React, { useState } from "react";
import { api } from "../../constants";
import "../../sass/pages/Login.scss";
import { useAppContext } from "../../Context/LoginContext";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [disableControls, setDisableControls] = useState(false);
  const [focussed, setFocussed] = useState(false);
  const [validation, setValidation] = useState({
    name: false,
    password: false,
  });
  const ctx = useAppContext();
  const [invalidLogin, setInvalidLogin] = useState(false);

  const inputValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
    const iElement = e.currentTarget.name;
    const value = e.currentTarget.value;
    switch (iElement) {
      case "username":
        setValidation(v => ({
          ...v,
          name: value !== "",
        }));
        break;
      case "password":
        setValidation(v => ({
          ...v,
          password: value !== "",
        }));
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "username") setName(value);
    else if (name === "password") setPassword(value);
    inputValidator(e);
  };

  const handleOnClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (localStorage.getItem("x")) return;
    if (name.trim() === "") return console.log("No username provided.");
    if (password.trim() === "") return console.log("No password provided.");

    setDisableControls(true);
    e.preventDefault();
    console.log("login attempted");

    const response = await fetch(
      api + `user?name=${name}&password=${password}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    );
    const data = await response.json();
    try {
      console.log(response);
      console.log(data);
      if (Object.keys(data).length === 0) return;

      const { user, allowed } = data;
      if (allowed === false) {
        setInvalidLogin(true);
        return console.log("Login prohibited.", user);
      } else if (response.status === 401) {
        setInvalidLogin(true);
        return console.log("User doesn't exist.");
      } else if (allowed === true && response.status === 200) {
        if (ctx === null) return;
        ctx!.onLogin(name);
        console.log("ctx.token" + ctx.token);
        return console.log("User logged in.", user);
      }
      setDisableControls(false);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(ctx);
  if (ctx!.token !== "") {
    return (
      <React.Fragment>
        <h1>You are already logged in</h1>
        <button
          className="logout-button"
          onClick={ctx!.onLogout}
        >
          Logout?
        </button>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <h1 className="heading"> Login </h1>
      <div className="login-entries">
        <div className="login-entry">
          <label className="login-label"> Username </label>
          <input
            className={`login-input ${validation.name || !focussed ? null : "invalid-input"
              }`}
            onChange={handleChange}
            onClick={() => setFocussed(v => !v)}
            name="username"
            value={name}
            disabled={disableControls}
          ></input>
        </div>
        <div className="login-entry">
          <label className="login-label"> Password </label>
          <input
            className={`login-input ${validation.password || !focussed ? null : "invalid-input"
              }`}
            onChange={handleChange}
            onClick={() => setFocussed(v => !v)}
            name="password"
            type="password"
            value={password}
            disabled={disableControls}
          ></input>
        </div>
        <div className="button-div">
          <h3 className={`invalid-msg ${invalidLogin ? null : "hidden"}`}>
            Invalid username or password
          </h3>
          <button
            className="login-button"
            onClick={handleOnClick}
            disabled={disableControls ? true : false}
          >
            Login
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
