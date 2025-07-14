import React, { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BadgeDollarSign, Wallet as WalletIcon, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const COLORS = [
  '#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#2ecc71', '#3498db',
  '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6', '#34495e',
  '#1abc9c', '#2c3e50', '#16a085', '#27ae60', '#2980b9', '#8e44ad',
  '#d35400', '#c0392b', '#7f8c8d', '#bdc3c7', '#f39c12', '#e84393',
  '#fd79a8', '#00cec9', '#0984e3', '#6c5ce7', '#fab1a0', '#55efc4'
];

export default function Wallet() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.getBalances()
      .then((res) => setBalance(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error || !balance || !balance.balances || balance.balances.error)
    return (
      <div className="p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded-xl flex items-center gap-3">
          <AlertTriangle />
          <span>Erreur de récupération du portefeuille</span>
        </div>
      </div>
    );

  const coins = balance?.balances?.balances?.balances?.parsed_balances?.UNIFIED || {};
  const total = Object.values(coins).reduce((acc, c) => acc + parseFloat(c.usdValue || 0), 0);

  const chartData = Object.entries(coins)
    .map(([symbol, data]) => ({
      name: symbol,
      value: parseFloat(data.usdValue || 0),
    }))
    .filter((entry) => entry.value > 0);

  return (
    <div className="p-6 space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white flex items-center gap-3"
      >
        <WalletIcon className="text-yellow-500" /> Mon Portefeuille
      </motion.h1>

      {/* Grille 2 colonnes : Graphe / Détail */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bloc graphique + solde */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <BadgeDollarSign /> Répartition visuelle
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-4xl font-bold text-green-400">
              {total.toFixed(2)} USDT
            </p>
            <div className="h-[300px] w-full max-w-[400px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bloc tableau détaillé */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-500">Détail du portefeuille</CardTitle>
          </CardHeader>
          <CardContent className="overflow-auto max-h-[520px] text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-muted">
                  <th className="py-1">Coin</th>
                  <th className="py-1 text-right">Qté</th>
                  <th className="py-1 text-right">USDT</th>
                  <th className="py-1 text-right">%</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(coins).map(([symbol, data], index) => {
                  const quantity = parseFloat(data.total || 0);
                  const usdValue = parseFloat(data.usdValue || 0);
                  const percent = total > 0 ? (usdValue / total) * 100 : 0;

                  const isLow = usdValue < 1;
                  const rowClass = isLow
                    ? 'text-gray-500 italic bg-muted/40'
                    : 'text-white';

                  return (
                    <tr key={symbol} className={`border-b border-muted ${rowClass}`}>
                      <td className="py-1 flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full inline-block"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        {symbol}
                      </td>
                      <td className="py-1 text-right">{quantity.toFixed(6)}</td>
                      <td className="py-1 text-right">{usdValue.toFixed(2)}</td>
                      <td className="py-1 text-right">{percent.toFixed(2)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
