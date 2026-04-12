import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import '@fortawesome/fontawesome-free/css/all.min.css';


import './index.css';
import './App.css'; 


import TokenContextProvider from './Context/TokenContext';
import { CartContextProvider } from './Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TokenContextProvider>
        <CartContextProvider>
            <App />
        </CartContextProvider>
    </TokenContextProvider>
);

reportWebVitals();