import './App.css'
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Table from './Table/Table'
import {store} from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'


const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
      staleTime:60
    }
  }
})

function App() { 

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Table></Table>
      </ErrorBoundary>
      </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
