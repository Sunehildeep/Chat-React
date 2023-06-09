import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store
import Header from './components/Header';
import Chatbox from './screens/Chatbox';
import Authentication from './screens/Authentication';

function App() {
  return (
    <Provider store={store}>
      <>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/chat" element={<Chatbox />} />
          </Routes>
        </BrowserRouter>
      </>
    </Provider>
  );
}

export default App;
