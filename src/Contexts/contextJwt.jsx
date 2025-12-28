import { createContext, useState, useEffect } from "react";

export const AuthContext  = createContext();

export function AuthProvider({ children }) {
    const[logued, setLoged] = useState(false);
    
    

    useEffect(()=>{

        async function checkFetch() {
        
            const res = await fetch("https://api-gestor-tareas-postgresql.onrender.com/home",{
                method:"GET",
                credentials: "include"
            })

            if (res.status == 200) {
                changeToTrue()
            } else if (res.status == 401) {
                changeToFalse()
            }


        }

        checkFetch();
    },[]);
    

    const changeToTrue = () =>{
        setLoged(true);
    }

    const changeToFalse = () =>{
        setLoged(false);
    }

    return(
        <AuthContext.Provider value={{ logued, changeToTrue, changeToFalse }}>{ children }</AuthContext.Provider>
    );
}