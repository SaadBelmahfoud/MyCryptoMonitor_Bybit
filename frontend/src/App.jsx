// frontend/src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BotList from './pages/BotList';
import IAStatus from './pages/IAStatus';
import IAPredictions from './pages/IAPredictions';
import Wallet from './pages/Wallet'; // ✅ nouveau composant
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-4 flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/wallet" element={<Wallet />} /> 
              <Route path="/bots" element={<BotList />} />
              <Route path="/ia-status" element={<IAStatus />} /> 
              <Route path="/predictions" element={<IAPredictions />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
