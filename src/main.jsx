import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import './styles/theme.css';
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);