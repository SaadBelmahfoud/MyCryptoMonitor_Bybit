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

  const coins = balance?.balances?.balances?.balances?.parsed_balances?.UNIFIED || {};
  const total = Object.values(coins).reduce((acc, c) => acc + parseFloat(c.usdValue || 0), 0);

  const coinRows = Object.entries(coins).map(([symbol, data]) => {
    const usdValue = parseFloat(data.usdValue || 0);
    const percent = total > 0 ? ((usdValue / total) * 100).toFixed(2) : "0.00";
    return {
      symbol,
      quantity: parseFloat(data.total || 0).toFixed(6),
      usdValue: usdValue.toFixed(2),
      percent,
    };
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🧮 Détail du Wallet</h2>

      <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
        <p className="text-base md:text-lg font-medium text-gray-700">
          🔢 Nombre de coins : <span className="font-bold text-gray-900">{coinRows.length}</span>
        </p>
        <p className="text-base md:text-lg font-medium text-gray-700 mt-2 md:mt-0">
          💰 Total du wallet : <span className="font-bold text-green-600">{total.toFixed(2)} USDT</span>
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full bg-white text-sm text-gray-800">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Coin</th>
              <th className="px-4 py-3 text-right">Quantité</th>
              <th className="px-4 py-3 text-right">Valeur (USDT)</th>
              <th className="px-4 py-3 text-right">% du Wallet</th>
            </tr>
          </thead>
          <tbody>
            {coinRows.map((coin) => (
              <tr key={coin.symbol} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium">{coin.symbol}</td>
                <td className="px-4 py-3 text-right">{coin.quantity}</td>
                <td className="px-4 py-3 text-right">{coin.usdValue}</td>
                <td className="px-4 py-3 text-right">{coin.percent}%</td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-100 border-t border-gray-300">
              <td className="px-4 py-3 text-right" colSpan={2}>Total</td>
              <td className="px-4 py-3 text-right text-green-600">{total.toFixed(2)} USDT</td>
              <td className="px-4 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
