import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import AiRecommend from './pages/AiRecommend';
import Call from './pages/Call';
import Menu from './pages/Menu';
import ReserveComfirm from './pages/ReserveComfirm';
import ReserveHistory from './pages/ReserveHistory';

function App() {
  const location = useLocation();
  const isCall = location.pathname === '/call';
  const headerVisible = !isCall;
  return (
    <div className="App">
      {headerVisible && <Header />}
      <div style={{ paddingTop: headerVisible ? 64 : 0, paddingBottom: isCall ? 0 : 'var(--footer-height)' }}>
        <Routes>
          <Route path="/call" element={<Call />} />
          <Route path="/ai" element={<AiRecommend />} />
          <Route path="/reservecomfirm" element={<ReserveComfirm />} />
          <Route path="/reservehistory" element={<ReserveHistory />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<Navigate to="/call" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
