import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { lightTheme } from './theme/light-theme';
import './index.css';
import {Provider as ReduxProvider} from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={ store }>
        <ThemeProvider theme={ lightTheme }>
          <App />
          <CssBaseline />
        </ThemeProvider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
