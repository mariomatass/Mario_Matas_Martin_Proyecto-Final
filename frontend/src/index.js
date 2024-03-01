//Mario Matas Martin
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux'
import store from './store/index'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff7f50',
      light: '#ffdab9',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    secondary: {
      main: '#8a2be2',
    },
    background: {
      default: '#f0f8ff',
      paper: '#f0f8ff',
    },
    text: {
      disabled: 'rgba(128,128,128,0.5)',
      secondary: 'rgba(100,149,237,0.7)',
    },
    error: {
      main: '#dc143c',
    },
    warning: {
      main: '#ffd700',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    info: {
      main: '#00ced1',
    },
    success: {
      main: '#32cd32',
    },
  },

  typography: {
    fontSize: 15,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 400,
    fontWeightBold: 600,
    htmlFontSize: 12,
    h1: {
      fontWeight: 400,
      fontSize: '7rem',
    },
    fontFamily: 'Montserrat',
    h6: {
      fontSize: '2.6rem',
      fontWeight: 500,
      lineHeight: 1.78,
    },
    h5: {
      fontSize: '2.6rem',
      lineHeight: 1.32,
    },
    h4: {
      fontSize: '3.1rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '3.4rem',
    },
    h2: {
      fontSize: '4.1rem',
    },
    subtitle1: {
      fontSize: '2rem',
    },
    button: {
      fontSize: '1.5rem',
      lineHeight: 2.04,
    },
    caption: {
      fontSize: '1.8rem',
    },
  },
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
