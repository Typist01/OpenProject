import React, { useEffect, useState } from "react";
import { api } from "../../constants";
import "./SignUp.scss";

const SignUpPage = () => {
    const [disableControls, setDisableControls] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState({
        name: true,
        password: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        if (name === "username")
            setName(value);
        else if (name === "password")
            setPassword(value);
    }
    useEffect(() => {
        console.log(name);
        console.log(password);
    }, [name, password]);

    const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const iElement = e.currentTarget.name;
        const value = e.currentTarget.value;
        console.log("handleValidation");
        switch (iElement) {
            case "username":
                setValidation(v => ({
                    ...v,
                    name: value.length > 0,
                }));
                break;
            case "password":
                setValidation(v => ({
                    ...v,
                    password: value.length > 0,
                }));
                break;
        }
    }


    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setDisableControls(true);
        e.preventDefault();
        const user = await fetch(api + "createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            password,
          }),
          mode: "no-cors",
        });
        if (user.status === 401) return console.log("User already exists");
        else if (user.ok) console.log("User was created", await user.json());
        setDisableControls(false);
    }
    return (
        <React.Fragment>
            <h1 className="heading"> Sign Up </h1>
            <div className="login-entries">
                <div className="login-entry">
                    <label className="login-label"> Enter username </label>
                    <input
                        className={`login-input ${validation.name ? null : "invalid-input"}`}
                        onChange={handleChange}
                        name="username"
                        value={name}
                        onBlur={handleValidation}
                        disabled={disableControls}

                    ></input>
                </div>
                <div className="login-entry">
                    <label className="login-label"> Enter password </label>
                    <input
                        className={`login-input ${validation.name ? null : "invalid-input"}`}
                        onChange={handleChange}
                        name="password"
                        type="password"
                        value={password}
                        onBlur={handleValidation}
                        disabled={disableControls}

                    ></input>
                </div>
                <div className="button-div">
                    <button
                        className="login-button"
                        onClick={handleOnClick}
                        disabled={disableControls}

                    >
                        Create Account
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SignUpPage;