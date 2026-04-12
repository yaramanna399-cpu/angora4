import { createContext, useState } from "react";

export let tokenContext = createContext();

export default function TokenContextProvider(props) {
    
    const [token, setToken] = useState(localStorage.getItem('userToken'));

    return <tokenContext.Provider value={{ token, setToken }}>
        {props.children}
    </tokenContext.Provider>
}