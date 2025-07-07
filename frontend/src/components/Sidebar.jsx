// File: frontend/src/components/Sidebar.jsx
// 📚 Menu latéral avec navigation (React Router)

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <aside className="w-64 bg-white border-r h-screen shadow sticky top-0">
    <div className="p-4 font-bold text-xl text-blue-700">🚀 Crypto Monitor</div>
    <nav className="p-4">
      <ul className="space-y-4">
        <li><Link to="/" className="text-gray-700 hover:text-blue-600">🏠 Accueil</Link></li>
        <li><Link to="/wallet" className="text-gray-700 hover:text-blue-600">💰 Wallet</Link></li>
        <li><Link to="/bots" className="text-gray-700 hover:text-blue-600">🤖 Bots</Link></li>
        <li><Link to="/ia-status" className="text-gray-700 hover:text-blue-600">🧠 IA Status</Link></li>
        <li><Link to="/predictions" className="text-gray-700 hover:text-blue-600">📈 Prédictions</Link></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
