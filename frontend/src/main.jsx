import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'


const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
    
    <StrictMode>
        
        <QueryClientProvider client={queryClient}>

            <BrowserRouter>
                
                <App />
            
            </BrowserRouter>

        </QueryClientProvider>

    </StrictMode>
)
