import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PolicyManagement from './pages/PolicyManagement';
import ClaimsManagement from './pages/ClaimsManagement';
import AdminSimulator from './pages/AdminSimulator';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/policies" element={<DashboardLayout><PolicyManagement /></DashboardLayout>} />
        <Route path="/claims" element={<DashboardLayout><ClaimsManagement /></DashboardLayout>} />
        <Route path="/admin" element={<DashboardLayout><AdminSimulator /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
