import { StrictMode } from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { App } from './App'
import { AuthProvider } from './context/AuthProvider'
import './index.css'
import reportWebVitals from './utils/reportWebVitals'
import * as serviceWorkerRegistration from './utils/serviceWorkerRegistration'

const container = document.getElementById('root')
// Create a root.
const root = ReactDOMClient.createRoot(container!)
root.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
