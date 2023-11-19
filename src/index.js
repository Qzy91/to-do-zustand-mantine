import React from 'react';
import ReactDOM from 'react-dom/client';
import './views/styles/reset.css';
import App from './views/Pages/App';
import { MantineProvider } from '@mantine/core';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import TaskPage from './views/Pages/TaskPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider theme={{
      fontFamily: 'Roboto'
    }}
    >
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/task/:id" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);