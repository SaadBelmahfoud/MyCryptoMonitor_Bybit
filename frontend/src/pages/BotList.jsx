//--- File: frontend/src/pages/BotList.jsx ---

import React, { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Bot, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function BotList() {
  const [bots, setBots] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.getBots()
      .then((res) => setBots(res.data))
      .catch(() => setError(true));
  }, []);

  if (!bots && !error) return <Loader />;
  if (error)
    return (
      <div className="p-6 text-red-600">
        Erreur lors de la récupération des bots.
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold flex items-center gap-3 text-primary"
      >
        <Bot className="text-purple-500" />
        Liste des Bots actifs
      </motion.h1>

      {bots.length === 0 ? (
        <p className="text-muted-foreground">Aucun bot actif pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bots.map((bot, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🤖 {bot.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="flex items-center gap-2">
                  {bot.status === "running" ? (
                    <CheckCircle className="text-green-500 w-4 h-4" />
                  ) : (
                    <AlertCircle className="text-red-500 w-4 h-4" />
                  )}
                  <span>{bot.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
