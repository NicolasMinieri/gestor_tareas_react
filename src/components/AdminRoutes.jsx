import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/contextJwt.jsx";

export function AdminRoutes( { children } ) {

    const { loading,logued,changeToTrue,changeToFalse } = useContext(AuthContext);


    if (loading) {
        return <h1>Chequeando sesión...</h1>;
    }

    return(
        <>
        
        {
            logued ? children : <h1>No estas logueado</h1> 
        }
        
        </>
    );

}