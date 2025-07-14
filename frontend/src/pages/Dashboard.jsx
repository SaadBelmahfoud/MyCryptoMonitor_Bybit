//--- File: frontend/src/pages/Dashboard.jsx ---

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import Loader from '../components/Loader';
import { BadgeDollarSign, Bot, LineChart, Cpu, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [status, setStatus] = useState(null);
  const [bots, setBots] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.getBalances()
      .then((res) => setWallet(res.data))
      .catch(() => setErrors((e) => ({ ...e, wallet: 'Erreur de récupération du solde' })));

    api.getIaStatus()
      .then((res) => setStatus(res.data))
      .catch(() => setErrors((e) => ({ ...e, status: "Erreur de récupération de l'état IA" })));

    api.getBots()
      .then((res) => setBots(res.data))
      .catch(() => setErrors((e) => ({ ...e, bots: 'Erreur récupération bots' })));

    api.getPredictions()
      .then((res) => setPredictions(res.data))
      .catch(() => setErrors((e) => ({ ...e, predictions: 'Erreur récupération prédictions' })));
  }, []);

  const coins = wallet?.balances?.balances?.balances?.parsed_balances?.UNIFIED || {};
  const totalUSD = Object.values(coins).reduce(
    (acc, c) => acc + parseFloat(c.usdValue || 0),
    0
  ).toFixed(2);

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white flex items-center gap-3"
      >
        <BadgeDollarSign className="text-green-400" /> Tableau de bord
      </motion.h1>

      {Object.keys(errors).length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl flex items-center gap-3">
          <AlertTriangle />
          <span>Erreur(s) détectée(s) : {Object.values(errors).join(' | ')}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <BadgeDollarSign /> Solde total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalUSD} USDT</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-500">
              <Cpu /> IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{status?.status || 'Inconnu'}</p>
            <p className="text-sm text-muted-foreground">{status?.details}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-500">
              <Bot /> Bots actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {bots.map((bot, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{bot.name}</span>
                  <span className="font-medium text-green-600">{bot.status}</span>
                </li>
              ))}
              {bots.length === 0 && <li className="text-muted-foreground">Aucun bot actif</li>}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-500">
              <LineChart /> Prédictions du marché
            </CardTitle>
          </CardHeader>
          <CardContent>
            {predictions.length === 0 ? (
              <p className="text-muted-foreground">Aucune prédiction disponible</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {predictions.map((pred, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b border-muted py-1"
                  >
                    <span>{pred.symbol}</span>
                    <span className="font-semibold">{pred.prediction}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => navigate('/wallet')}>Voir mon portefeuille</Button>
      </div>
    </div>
  );
}
