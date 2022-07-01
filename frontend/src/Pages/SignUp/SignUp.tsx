import React, { useEffect, useState } from "react";
import { api } from "../../constants";
import "./SignUp.scss";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        if (name == "username") {
            setName(value);
        } else if (name == "password") {
            setPassword(value);
        }
    }
    useEffect(() => {
        console.log(name);
        console.log(password);
    }, [name, password]);


    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const user = await fetch(api + "createUser", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                password,
            }),
        });
        if (user.status === 401) return console.log("User already exists");
        else if (user.ok) console.log("User was created", user);
    }
    return (
        <React.Fragment>
            <h1 className="heading"> Sign Up </h1>
            <div className="login-entries">
                <div className="login-entry">
                    <label className="login-label"> Enter username </label>
                    <input
                        className="login-input"
                        onChange={handleChange}
                        name="username"
                        value={name}
                    ></input>
                </div>
                <div className="login-entry">
                    <label className="login-label"> Enter password </label>
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
                        Create Account
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SignUpPage;