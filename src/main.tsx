import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/index.tsx'
import './styles/index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from 'react-redux'
import store from './store/index.ts'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </StrictMode>,
)
