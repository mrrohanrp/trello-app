import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../pages/Layout';
import HomePage from '../pages/HomePage';
import BoardsPage from '../pages/BoardsPage';
import NotFoundPage from '../pages/NotFoundPage';

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="board/:bid/:boardName" element={<BoardsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
