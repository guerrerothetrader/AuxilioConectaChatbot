// src/App.jsx (ASÍ DEBE QUEDAR)
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // <--- YA NO IMPORTAMOS BrowserRouter AQUÍ
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ChatPage from './app/chat/Page';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

function App() {
  return (
    <> {/* <--- SIN <Router> AQUÍ, SOLO UN FRAGMENTO */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;