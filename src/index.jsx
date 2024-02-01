import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { UserProvider } from './contexts/User.context';
import { CategoriesProvider } from './contexts/Categories.context';

import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <CategoriesProvider>
        <App />
      </CategoriesProvider>
    </UserProvider>
  </React.StrictMode>
);