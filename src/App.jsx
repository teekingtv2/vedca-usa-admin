import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdPage from './pages/AdPage';
import ImagesFooter from './components/ImagesFooter';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route path="/:adSlug" element={<AdPage />} />
          </Routes>
        </div>
        <ImagesFooter />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
