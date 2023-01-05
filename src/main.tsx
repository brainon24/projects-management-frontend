import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { lightTheme } from './theme/light-theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={ lightTheme }>
      <App />
      <CssBaseline />
    </ThemeProvider>
  </React.StrictMode>,
)
