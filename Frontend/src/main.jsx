import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './authContext';


import { SubscriptionProvider } from './Pages/EmployerDashboard/SubscriptionContext'; // ✅

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
            <SubscriptionProvider>
               <App />
            </SubscriptionProvider>
       
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);