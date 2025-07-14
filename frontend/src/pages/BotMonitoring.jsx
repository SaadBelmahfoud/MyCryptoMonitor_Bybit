//--- File: frontend/src/pages/BotMonitoring.jsx ---

import { useEffect, useState } from "react";
import api from "@/services/api";
import Loader from "../components/Loader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function BotMonitoring() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getStatus()
      .then((res) => setStatus(res.data))
      .catch(() => setError("Impossible de charger le statut du bot."));
  }, []);

  if (!status && !error) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold flex items-center gap-3 text-primary"
      >
        <Cpu className="text-indigo-500" />
        Statut du bot
      </motion.h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
      )}

      {status && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(status).map(([key, value]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  {key.replace(/_/g, " ")}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg font-semibold">
                {String(value)}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
