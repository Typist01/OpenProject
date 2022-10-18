import React from "react";
import { api } from "../../constants";

export default function TokenStorage() {
    return (
        <><div onLoad={() => localStorage.getItem("username") && localStorage.getItem("token") ? setInterval(() =>
            fetch(api + "upateToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: localStorage.getItem("username"), token: localStorage.getItem("token") })
            }).then(x => x.json()).then(console.log), 60000) : null}></div>
        </>
    );
}
