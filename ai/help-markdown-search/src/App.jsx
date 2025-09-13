import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HelpCenter from './pages/HelpCenter';
import 'antd/dist/reset.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HelpCenter />} />
      </Routes>
    </Router>
  );
}

export default App;
