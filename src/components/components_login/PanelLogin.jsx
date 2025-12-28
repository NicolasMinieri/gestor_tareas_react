import { useState } from "react";
import styles from '../../css/login_styles/style_login_page.module.css';
import styles1 from '../../css/login_styles/style_register_form.module.css';
import { useContext } from "react";
import { AuthContext } from "../../Contexts/contextJwt.jsx";
import { useNavigate } from "react-router-dom";

export function PanelLogin() {
    const [panelsSwich, setPanelsSwich] = useState(true);
    
    const changePanel = (e) => {
        setPanelsSwich(!panelsSwich);
        console.log(e);
    }

    
    
    return (
        <>
            <main className={styles.main_login}>
                <div className={styles.container_login}>
                    <div className={styles.container_form}>
                        {panelsSwich ? <FormLogin changePanel={changePanel}/>:<FormRegister changePanel={changePanel}/>}
                    </div>
                </div>
            </main>
        </>
    )

}

function FormLogin({ changePanel, sendInformationLogin }) {  

    const [contentEmail, setContentEmail] = useState("");
    const [contentPasword, setContentPasword] = useState("");
    const { changeToTrue } = useContext(AuthContext);

    //suamos navegate para despues redirijir al home cuando nos logueamos
    const navegate = useNavigate();
    
    const handleChangeVlueInputEmail = (e) =>{
        setContentEmail(e.target.value);
    }

    const handleChangeVlueInputPassword = (e) =>{
        setContentPasword(e.target.value);
    }

    const handleLoginButtonSend = (e) => {
        e.preventDefault()
    } 

    const loginFetch = async(e) => {
        e.preventDefault()
        const loginJson = {
            user:contentEmail,
            password:contentPasword
        }


        const res = await fetch('https://api-gestor-tareas-postgresql.onrender.com/login/send_login',{
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(loginJson),
            headers:{
                "Content-Type": "application/json"
            }    
        });


        if (res.ok) {
            console.log("LOGUEADO")
            changeToTrue();
            navegate("/home");
        }

    }

    return (
        <>
            <form className={styles.form_login}>
                <label>Email</label>
                <input type="text" className={styles.input_email} value={contentEmail} onChange={handleChangeVlueInputEmail}/>
                <label>Contraseña</label>
                <input type="password" value={contentPasword} onChange={handleChangeVlueInputPassword} className={styles.input_password} />
                <button type="submit" className={`${styles.button_submit_login} ${styles.buttons_form}`}  onClick={loginFetch}>login</button>
                <div className="container_button_register">
                    <p>¿no tienes una cuenta?</p>
                    <button type="submit" className={styles.button_register} onClick={changePanel}>Registrar</button>
                </div>
            </form>
        </>
    )
}

function FormRegister({ changePanel }) {
    return (
        <>
            <form action="" className={styles1.form_register}>
                <label for="">Email</label>
                <input type="text" className={styles1.input_email_register}/>
                <label for="">Contraseña</label>
                <input type="text" className={styles1.input_password_register}/>
                <label for="">Repetir Contraseña</label>
                <input type="text" className={styles1.input_password_register_repeat}/>
                <label for="">Usuario</label>
                <input type="text" className={styles1.input_user_register}/>
                <button type="submit" className={`${styles1.button_submit_register} ${styles.buttons_form}`} onClick={changePanel}>Registrar</button>
            </form>
        </>
    )
}