import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './css/normalize.css';
import './css/style.css';
import { AuthProvider } from "./Contexts/contextJwt";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
  
)

