import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import authSlice from './components/redux/Auth';
import expSlice from './components/redux/Exp';
import premSlice from './components/redux/prem';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: {
    auth: authSlice,
    expenses: expSlice,
    prem:premSlice,
  },
});



root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App  />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
