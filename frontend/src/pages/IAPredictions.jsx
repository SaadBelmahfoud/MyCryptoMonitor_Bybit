//--- File: frontend/src/pages/IAPredictions.jsx ---

import React, { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

export default function IAPredictions() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.getPredictions()
      .then((res) => setData(res.data))
      .catch(() => setError(true));
  }, []);

  if (!data && !error) return <Loader />;
  if (error)
    return (
      <div className="p-6 text-red-600">
        Erreur lors de la récupération des prédictions IA.
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold flex items-center gap-3 text-primary"
      >
        <BrainCircuit className="text-pink-500" />
        Prédictions IA
      </motion.h1>

      {data.length === 0 ? (
        <p className="text-muted-foreground">Aucune prédiction disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-blue-600">
                  {item.symbol}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  <strong>Prédiction :</strong> {item.prediction}
                </p>
                <p className="text-xs text-muted-foreground">
                  Dernière mise à jour : {item.timestamp || "—"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
