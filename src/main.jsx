import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/tailwind.css'; 
import { BrowserRouter } from 'react-router-dom'; // Import ini wajib

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Bungkus App dengan BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

//import React from 'react'
//import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
//import { BrowserRouter } from 'react-router-dom'

//ReactDOM.createRoot(document.getElementById('root')).render(
//<BrowserRouter>
//<App />
//</BrowserRouter>
//);