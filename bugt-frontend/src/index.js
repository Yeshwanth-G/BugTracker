import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContextWrapper from './config/useContext';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, ColorModeProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './config/ProtectedRoute';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='body'>
  <ChakraProvider>
    <BrowserRouter>
    <ColorModeProvider>
    <ContextWrapper>
    <App />
    </ContextWrapper>
    </ColorModeProvider>
    </BrowserRouter>
  </ChakraProvider>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
