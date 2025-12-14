import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/contextJwt.jsx";

export function AdminRoutes( { children } ) {

    const { logued,changeToTrue,changeToFalse } = useContext(AuthContext);


    return(
        <>
        
        {
            logued ? children : <h1>No estas logueado</h1> 
        }
        
        </>
    );

}