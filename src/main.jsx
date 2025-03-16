import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


// Force dark mode on page load
document.documentElement.classList.add("dark");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/jaya-balaji-industries'>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
