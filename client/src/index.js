import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './userContest';
import ChatProvider from './Context/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
        <ChatProvider>
        <App />
        </ChatProvider>

</UserProvider>,
);

reportWebVitals();
