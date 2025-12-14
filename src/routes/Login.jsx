import { PanelLogin } from "../components/components_login/PanelLogin";
import backroundStyle from '../css/login_styles/style_background_login.module.css';

export function LoginController() {
    return (
        //este div es para aplicarle un fondo especifico al login nada mas
        <div className={backroundStyle.background_div}>
            <PanelLogin />
        </div>
        
    )
}