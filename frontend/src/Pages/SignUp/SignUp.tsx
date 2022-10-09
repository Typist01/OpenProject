import React, { useState } from "react";
import { api, Codes } from "../../constants";
import "../../sass/pages/SignUp.scss";

enum Validation {
    Provided = 1,
    Start = 0,
    NotProvided = -1,

}

const SignUpPage = () => {
    const [disableControls, setDisableControls] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [validations, setValidation] = useState<Record<'name' | 'password' | 'confirmedPassword', Validation>>({
        name: Validation.Start,
        password: Validation.Start,
        confirmedPassword: Validation.Start
    });

    const [errorMessages, setErrorMessages] = useState<Record<'name' | 'password' | 'confirmedPassword', string | null>>({
        name: null,
        password: null,
        confirmedPassword: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        if (name === "username")
            setName(value);
        else if (name === "password")
            setPassword(value);
        else if (name === "confirm-password") {
            setErrorMessages(e => ({
                ...e,
                confirmedPassword: value === password ? null : "Password and confirmation must match."
            }));
            setConfirmedPassword(value);
        }
    }

    const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const iElement = e.currentTarget.name;
        const value = e.currentTarget.value;

        switch (iElement) {
            case "username":
                if (value.trim().length === 0)
                    setErrorMessages(e => ({
                        ...e,
                        name: "Username is required."
                    }))
                else
                    setErrorMessages(e => ({
                        ...e,
                        name: null
                    }))

                setValidation(v => ({
                    ...v,
                    name: value.trim().length > 0 ? Validation.Provided : Validation.NotProvided,
                }));
                break;
            case "password":
                if (value.trim().length === 0)
                    setErrorMessages(e => ({
                        ...e,
                        password: "Password is required."
                    }))
                else
                    setErrorMessages(e => ({
                        ...e,
                        password: null
                    }))

                setValidation(v => ({
                    ...v,
                    password: value.trim().length > 0 ? Validation.Provided : Validation.NotProvided,
                }));
                break;
            case "confirm-password":
                if (value.trim().length === 0)
                    setErrorMessages(e => ({
                        ...e,
                        confirmedPassword: "Password confirmation is required."
                    }))
                else
                    handleChange(e);

                setValidation(v => ({
                    ...v,
                    confirmedPassword: value.trim().length > 0 ? Validation.Provided : Validation.NotProvided,
                }));
                break;
        }
    }


    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(validations);
        if (Object.values(errorMessages).some(x => x !== null) || Object.values(validations).some(x => !x))
            return;

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
            })
        });

        if (user.status === Codes.AlreadyExists)
            return console.log("User already exists", await (await fetch(api + `user?name=${name}}&password=${password}`)).json());
        console.log("User was created", await user.json());
        setDisableControls(false);
    }

    return (
        <>
            <h1 className="heading"> Sign Up </h1>
            <div className="login-entries">
                <div className="login-entry">
                    {
                        errorMessages.name === null ? null : (
                            <>
                                <label className="error-label"> {errorMessages.name} </label>
                                <br />
                            </>
                        )
                    }
                    <label className="login-label"> Enter username </label>
                    <input
                        className={`login-input ${validations.name !== Validation.NotProvided ? null : "invalid-input"}`}
                        onChange={handleChange}
                        name="username"
                        value={name}
                        onBlur={handleValidation}
                        disabled={disableControls}
                    ></input>
                </div>
                <div className="login-entry">
                    {
                        errorMessages.password === null ? null : (
                            <>
                                <label className="error-label"> {errorMessages.password} </label>
                                <br />
                            </>
                        )
                    }
                    <label className="login-label"> Enter password </label>
                    <input
                        className={`login-input ${validations.password !== Validation.NotProvided ? null : "invalid-input"}`}
                        onChange={handleChange}
                        name="password"
                        type="password"
                        value={password}
                        onBlur={handleValidation}
                        disabled={disableControls}
                    ></input>
                </div>
                <div className="login-entry">
                    {
                        errorMessages.confirmedPassword === null ? null : (
                            <> nnv
                                <label className="error-label"> {errorMessages.confirmedPassword} </label>
                                <br />
                            </>
                        )
                    }
                    <label className="login-label"> Confirm password </label>
                    <input
                        className={`login-input ${validations.confirmedPassword !== Validation.NotProvided ? null : "invalid-input"}`}
                        onChange={handleChange}
                        name="confirm-password"
                        type="password"
                        value={confirmedPassword}
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
        </>
    );
}

export default SignUpPage;