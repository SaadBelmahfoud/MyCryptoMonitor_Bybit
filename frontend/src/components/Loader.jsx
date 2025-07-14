//--- File: frontend/src/components/Loader.jsx ---

import React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-primary">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 className="w-8 h-8 animate-spin" />
      </motion.div>
      <p className="mt-4 text-sm font-medium">Chargement des données...</p>
    </div>
  );
}
