//--- File: frontend/src/App.jsx ---

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import IAPredictions from './pages/IAPredictions';
import IAStatus from './pages/IAStatus';
import BotList from './pages/BotList';
import BotMonitoring from './pages/BotMonitoring';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/predictions" element={<IAPredictions />} />
              <Route path="/ia-status" element={<IAStatus />} />
              <Route path="/bots" element={<BotList />} />
              <Route path="/monitoring" element={<BotMonitoring />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
