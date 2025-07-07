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
  if (!balance)
    return <p className="text-red-500">Erreur de récupération</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🧮 Solde du Wallet</h2>
      <ul className="space-y-2">
        {Object.entries(balance.balances).map(([symbol, amount]) => (
          <li key={symbol} className="bg-white p-2 rounded shadow">
            <strong>{symbol}:</strong> {amount}
          </li>
        ))}
      </ul>
    </div>
  );
}