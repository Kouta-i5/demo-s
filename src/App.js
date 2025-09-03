import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Call from './pages/Call';
import Menu from './pages/Menu';
import ReserveComfirm from './pages/ReserveComfirm';
import ReserveHistory from './pages/ReserveHistory';

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ paddingTop: 64, paddingBottom: 80 }}>
        <Routes>
          <Route path="/call" element={<Call />} />
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
