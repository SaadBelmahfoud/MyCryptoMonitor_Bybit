//--- File: frontend/src/components/Sidebar.jsx ---

import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Wallet,
  Bot,
  Brain,
  LineChart,
} from "lucide-react";
import { motion } from "framer-motion";

const menu = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/bots", label: "Bots", icon: Bot },
  { to: "/ia-status", label: "IA Status", icon: Brain },
  { to: "/predictions", label: "Prédictions", icon: LineChart },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-background border-r h-screen shadow-lg sticky top-0 z-10 flex flex-col">
      <div className="p-6 text-xl font-bold text-primary flex items-center gap-2">
        <span className="text-2xl">🚀</span> <span>Crypto Monitor</span>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="px-4 space-y-2">
          {menu.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <motion.li
                key={to}
                whileHover={{ scale: 1.02 }}
                className={`rounded-xl transition-colors px-3 py-2 cursor-pointer
                  ${active
                    ? "bg-muted text-primary font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
              >
                <Link to={to} className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} MyCryptoMonitor
      </div>
    </aside>
  );
}
