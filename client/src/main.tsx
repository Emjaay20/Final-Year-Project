import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App'; // Replace the alias with the correct relative path
import '@/index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '@/states/api'; 

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer},
  middleware:(getDefault)=> getDefault().concat(api.middleware),
})
setupListeners(store.dispatch);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider >
);
