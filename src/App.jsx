import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeReturn } from './routes/Home'
import { LoginController } from './routes/Login';
import { AdminRoutes } from "./components/AdminRoutes";


export function App() {
    
    return(
        
        <BrowserRouter>
                
            <Routes>
                <Route path="/" element={<LoginController />} />
                <Route path='home' element={<AdminRoutes>
                        <HomeReturn />
                    </AdminRoutes>}></Route>
            </Routes>
        </BrowserRouter>
        
    )

}