import { createContext, useState, useEffect } from "react";

export const AuthContext  = createContext();

export function AuthProvider({ children }) {
    const[logued, setLoged] = useState(false);
    const [loading, setLoading] = useState(true);
    
    

    useEffect(()=>{

        async function checkFetch() {
            try {
                const res = await fetch("https://api-gestor-tareas-postgresql.onrender.com/home",{
                    method:"GET",
                    credentials: "include"
                })
    
                if (res.status == 200) {
                    changeToTrue()
                } else if (res.status == 401) {
                    changeToFalse()
                }
                
            } catch (error) {
                changeToFalse();
            } finally {
                setLoading(false);
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
        <AuthContext.Provider value={{ setLoading,loading,logued, changeToTrue, changeToFalse }}>{ children }</AuthContext.Provider>
    );
}