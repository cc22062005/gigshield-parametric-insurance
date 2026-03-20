import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AdminSimulator from './pages/AdminSimulator';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-brand-500 selection:text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminSimulator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
