//--- File: frontend/src/pages/Wallet.jsx ---

import React, { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";

export default function Wallet() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBalances()
      .then((res) => setBalance(res.data))
      .catch(() => setBalance(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (!balance || !balance.balances || balance.balances.error)
    return <p className="text-red-500">Erreur de récupération</p>;

  const coins = balance?.balances?.balances?.parsed_balances?.UNIFIED || {};
  const total = Object.values(coins).reduce((acc, c) => acc + parseFloat(c.usdValue || 0), 0).toFixed(2);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🧮 Détail du Wallet</h2>

      {Object.keys(coins).length === 0 ? (
        <p>Aucun coin détecté</p>
      ) : (
        <ul className="space-y-2">
          {Object.entries(coins).map(([symbol, data]) => (
            <li key={symbol} className="bg-white p-3 rounded shadow flex justify-between items-center">
              <span className="font-semibold">{symbol}</span>
              <span>
                {parseFloat(data.total).toFixed(6)} pièces ≈ ${parseFloat(data.usdValue || 0).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 text-xl font-bold text-right">
        ✅ Total: ${total}
      </div>
    </div>
  );
}
