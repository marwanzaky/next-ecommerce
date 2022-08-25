import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './js/cart'
import './js/products'

import 'bootstrap/dist/css/bootstrap.css';
import './css/styles.css';
import '@ionic/react/css/core.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);