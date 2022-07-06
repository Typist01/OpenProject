import React, { createContext, useContext, useEffect, useState } from "react";

interface AppContextInterface {
    user: {
        id: string,
        isLoggedIn: boolean,
    },
    onLogin: (username: string) => void,
    onLogout: () => void,
    onStart: () => void
}


// const AppContext = createContext({
//     user: {
//         id: "",
//         isLoggedIn: false,
//     },
//     onLogin: (username: string) => { },
//     onLogout: () => { },
//     onStart: () => { }
// });

const AppContext = createContext<AppContextInterface | null>(null);

interface Props {
    children: JSX.Element[] | JSX.Element
}

const AuthContextProvider = (props: Props) => {
    useEffect(() => {
        console.log("use effect from auth context");
        getLocalData();
    }, []);

    const [user, setUser] = useState({
        id: "",
        isLoggedIn: false,
        onLogin: () => { },
    });

    useEffect(() => {
        if (user.isLoggedIn) {
            window.localStorage.setItem("thisuser", JSON.stringify(user));
            console.log("local storage updated");
        } else {
            window.localStorage.removeItem("thisuser");
            console.log("user not logged in");
        }
    }, [user.isLoggedIn]);

    function loginHandler(username: string) {
        setUser(prevValue => ({
            ...prevValue,
            isLoggedIn: true,
            id: username,
        }));
        window.localStorage.setItem("thisuser", JSON.stringify(user));
    }

    function logoutHandler() {
        window.localStorage.removeItem("thisuser");
        setUser(prevValue => ({
            ...prevValue,
            isLoggedIn: false,
            id: "",
        }));
    }

    function getLocalData() {
        const localUserState = window.localStorage.getItem("thisuser");
        if (localUserState !== null) {
            const userState = JSON.parse(localUserState);
            setUser(() => {
                return {
                    ...userState,
                };
            });
        }
    }

    const myAppContext: AppContextInterface = {
        user,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onStart: getLocalData,
    }

    return (
        <AppContext.Provider
            value={
                myAppContext
            }
        >
            {props.children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}

export default AuthContextProvider;

