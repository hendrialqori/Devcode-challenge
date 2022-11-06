import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ContextProvider } from './context/store'

const queryClient = new QueryClient()

const _ROOT = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
_ROOT.render(
    <QueryClientProvider client={queryClient}>
        <ContextProvider>
            <App />
        </ContextProvider>
        <ReactQueryDevtools />
    </QueryClientProvider>
)
