import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import BoardsPage from './pages/BoardsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="board/:bid" element={<BoardsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
