import { useState } from "react";
import { Theme } from "./constants";

const getTheme = (): Theme => Theme[(window.localStorage.getItem("theme") ?? 'D') as 'D' | 'L'];
const useLocalStorage = (key: string, initialValue: string) => {
    const [storedValue, setStoredValue] = useState<string>(typeof window === "undefined" ? initialValue : window.localStorage.getItem(key) ?? initialValue);

    const setValue = (value: string | ((val: string) => string)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined")
                localStorage.setItem(key, valueToStore);
        } catch (e) {
            console.error(e);
        }
    };
    return [storedValue, setValue] as const;
}

export { getTheme, useLocalStorage };