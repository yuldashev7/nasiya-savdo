import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { client } from './config/data/query-client.ts';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </BrowserRouter>
);
