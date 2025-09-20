import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { client } from './config/data/query-client.ts';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
);
