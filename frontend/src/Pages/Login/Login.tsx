import React, { useState } from "react";
import { api } from "../../constants";
import "./Login.scss";
import { useAppContext } from "../../Context/LoginContext";

const LoginPage = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [disableControls, setDisableControls] = useState(false);
    const [focussed, setFocussed] = useState(false);
    const [validation, setValidation] = useState({
        name: false,
        password: false
    });
    const ctx = useAppContext();

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
    }


    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (name.trim() === "") return console.log("No username provided.");
        if (password.trim() === "") return console.log("No password provided.");
        setDisableControls(true);
        e.preventDefault();
        console.log(
            "login attempted",
            api + `user?name=${name}&password=${password}`
        );
        const response = await fetch(api + `user?name=${name}&password=${password}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            mode: "no-cors",
        });
        try {
            const responseText = await response.text();
            const json = responseText === "" ? {} : JSON.parse(responseText);
            console.log(json, responseText);
            // {} && '' let's continue tmrw. u can rewrite this using axios, but I won't. i've to work on smth else
            // okay
            if (Object.keys(json).length === 0) return;
            const { user, allowed } = json;
            if (allowed === '0') return console.log("Login prohibited.", user);
            else if (response.status === 401) return console.log("User doesn't exist.");
            else if (allowed === "1" && response.ok)
                return console.log("User logged in.", user);
            setDisableControls(false);
        }
        catch (err) {
            console.log(err);
        }

        // call ctx.onLogin(username) on successful login
    }
    if (ctx?.user.isLoggedIn) {
        return (
            <React.Fragment>
                <h1>You are already logged in</h1>
            </React.Fragment>
        )
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
}

export default LoginPage;