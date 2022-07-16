import React, { createContext, useContext, useEffect, useState } from "react";

interface AppContextInterface {
    user: {
        token: string,
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
        token: "",
    });

    useEffect(() => {
        if (user.token !== null) {
            window.localStorage.setItem("token", JSON.stringify(user.token));
            console.log("local storage updated");
        } else {
            window.localStorage.removeItem("token");
            console.log("user not logged in");
        }
    }, [user.token]); // we also need to check in the backend if the token is right to make sure heis rly logged in
    // we can do that in loginHandler
    // then some kind of function that checks every now and then
    // maybe like authenticateAccess here, so ctx.authenticateAccess() returns true/false yes, but the token is stored nowhere
    // but if we want to check if the user is logged in we need to check if the token is right yes idk imma watch a video about that. will take some time ok
    // it is stored in local storage. yeah we need to also generate it in the backend. 
    // so when we send a login request and backend approves the login it should also sned out a temporary token
    // so one of the json elements received needs to be a token that is saved in some kind of a login sessions database or with the user?
    // shall we take a break? come back maybe in 1/2 hrs? yes, just gonna commit this 
    // on login calls this function
    function loginHandler(token: string) {
        setUser(_ => ({
            token //this should work? idk
        }));
        window.localStorage.setItem("thisuser", JSON.stringify(user));
    }

    function logoutHandler() {
        window.localStorage.removeItem("thisuser");
        setUser({
            token: ""
        });
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

