import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Routes'
import AuthProvider from './providers/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import 'aos/dist/aos.css';
import Aos from 'aos'

Aos.init();
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
       <Toaster position='top-right' reverseOrder={false} />
    </AuthProvider>
    </QueryClientProvider>
    
  </StrictMode>,
)
