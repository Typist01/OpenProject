import React, { useEffect, useState } from "react";
import { api } from "../../constants";
import "./Login.scss";

const LoginPage = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        if (name == "username") setName(value);
        else if (name == "password") setPassword(value);
    }
    useEffect(() => {
        console.log(name);
        console.log(password);
    }, [name, password]);


    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const data = await fetch(api + `user?name=${name}&password=${password}`);
        const { user, allowed } = await data.json();
        if (allowed === '0') return console.log("Login prohibited.", user);
        else if (data.status === 401) return console.log("User doesn't exist.");
        else if (allowed === '1' && data.ok) console.log("User logged in.", user);
    }
    return (
        <React.Fragment>
            <h1 className="heading"> Login </h1>
            <div className="login-entries">
                <div className="login-entry">
                    <label className="login-label"> Username </label>
                    <input
                        className="login-input"
                        onChange={handleChange}
                        name="username"
                        value={name}
                    ></input>
                </div>
                <div className="login-entry">
                    <label className="login-label"> Password </label>
                    <input
                        className="login-input"
                        onChange={handleChange}
                        name="password"
                        type="password"
                        value={password}
                    ></input>
                </div>
                <div className="button-div">
                    <button
                        className="login-button"
                        onClick={handleOnClick}
                    >
                        Login
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default LoginPage;