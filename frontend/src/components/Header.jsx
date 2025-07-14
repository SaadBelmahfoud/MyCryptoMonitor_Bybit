//--- File: frontend/src/components/Header.jsx ---

import React from "react";
import { LineChart } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="bg-background border-b px-6 py-4 shadow-sm sticky top-0 z-20">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-primary flex items-center gap-3"
      >
        <LineChart className="text-blue-500" />
        Dashboard de Trading
      </motion.h1>
    </header>
  );
}
