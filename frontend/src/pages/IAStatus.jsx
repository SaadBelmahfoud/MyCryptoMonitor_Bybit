//--- File: frontend/src/pages/IAStatus.jsx ---

import React, { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function IAStatus() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.getIaStatus()
      .then((res) => setStatus(res.data))
      .catch(() => setError(true));
  }, []);

  if (!status && !error) return <Loader />;
  if (error)
    return (
      <div className="p-6 text-red-600">
        Erreur lors de la récupération de l'état de l'IA.
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold flex items-center gap-3 text-primary"
      >
        <Brain className="text-pink-500" />
        État de l'IA
      </motion.h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600">Statut actuel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <span className="font-semibold">Status :</span>{" "}
            <span className="text-green-600">{status.status}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Timestamp : {status.timestamp || "Non disponible"}
          </p>
          {status.details && (
            <p className="text-sm">{status.details}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
