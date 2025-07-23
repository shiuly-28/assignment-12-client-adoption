import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-loading-skeleton/dist/skeleton.css';

import { RouterProvider } from "react-router";
import { router } from './router/router.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import { ThemeProvider } from './components/TheameProvider.jsx';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <ThemeProvider >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>

  </StrictMode>,
)
