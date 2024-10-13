// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  //TODO: Test strict mode on again with new BE-Cors-Setting
  // <StrictMode>
    <App />
  // </StrictMode>,
)
