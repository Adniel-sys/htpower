import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// dist/index.html already contains the pre-rendered page (see scripts/prerender.mjs); React attaches to it.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>,
)
