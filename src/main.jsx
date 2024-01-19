import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Context_Provider from './services/Context.jsx'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Context_Provider>
    <App/>
    <ToastContainer/>
    </Context_Provider>
  </BrowserRouter>
,
)
