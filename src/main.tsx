import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { CategoryProvider } from './context/CategoryContext';
import AuthContextProvider from "./context/authContext"; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <Provider store={store}>
    <AuthContextProvider>
      <CategoryProvider>
        <App />
      </CategoryProvider>
    </AuthContextProvider>
  </Provider>
</React.StrictMode>

);
