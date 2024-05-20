import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdPage from './pages/AdPage';
import ImagesFooter from './components/ImagesFooter';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NotFound from './pages/404';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-1" element={<AdPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <ImagesFooter />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
