import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({
    user: {
        id: "",
        isLoggedIn: false,
    }
});

export default function AuthContextProvider({ children }) {
    useEffect(() => {
        console.log("use effect from auth context")
        getLocalData()
    }, []);

    const [user, setUser] = useState({
        id: "",
        isLoggedIn: false,
    });
    const admin = ""

    useEffect(() => {
        if (user.isLoggedIn) {
            window.localStorage.setItem("thisuser", JSON.stringify(user))
            console.log("local storage updated")
        } else {
            // window.localStorage.removeItem("thisuser", user)
            console.log("user not logged in")
        }
    }, [user.isLoggedIn])



    async function loginHandler(username) {
        setUser(prevValue => {
            return {
                ...prevValue,
                isLoggedIn: true,
                id: username,
            }
        })
    }


    function logoutHandler() {
        window.localStorage.removeItem("thisuser")
        setUser(prevValue => {
            return {
                ...prevValue,
                isLoggedIn: false,
                id: "",
                type: ""
            }
        })
    }


    function getLocalData() {
        const localUserState = window.localStorage.getItem("thisuser", user)
        const userState = JSON.parse(localUserState)

        setUser(prevValue => {
            return {
                ...userState,
            }
        })
    }
    return (
        <AppContext.Provider value={{ user: user, onLogin: loginHandler, onLogout: logoutHandler, onStart: getLocalData }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}

