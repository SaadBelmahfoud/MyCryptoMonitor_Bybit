//--- File: frontend/src/pages/Dashboard.jsx ---

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import Loader from '../components/Loader';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57'];

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
      .catch(() => setErrors((e) => ({ ...e, wallet: 'Erreur solde' })));

    api.getIaStatus()
      .then((res) => setStatus(res.data))
      .catch(() => setErrors((e) => ({ ...e, status: 'Erreur IA' })));

    api.getBots()
      .then((res) => setBots(res.data))
      .catch(() => setErrors((e) => ({ ...e, bots: 'Erreur Bots' })));

    api.getPredictions()
      .then((res) => setPredictions(res.data))
      .catch(() => setErrors((e) => ({ ...e, predictions: 'Erreur Prédictions' })));
  }, []);

  const parsed = wallet?.balances?.balances?.parsed_balances?.UNIFIED || {};

  const pieData = Object.entries(parsed).map(([symbol, obj]) => ({
    name: symbol,
    value: parseFloat(obj?.usdValue || 0),
  }));

  const totalUSD = pieData.reduce((acc, curr) => acc + curr.value, 0).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Solde global */}
      <div
        className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
        onClick={() => navigate('/wallet')}
      >
        <h3 className="text-xl font-semibold mb-2">💰 Solde total</h3>
        {errors.wallet ? (
          <p className="text-red-500">{errors.wallet}</p>
        ) : (
          <>
            <p className="text-3xl font-bold mb-4">${totalUSD}</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={80} label>
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </div>

      {/* Statut IA */}
      <div
        className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
        onClick={() => navigate('/ia-status')}
      >
        <h3 className="text-xl font-semibold mb-2">📡 État du service IA</h3>
        {errors.status ? (
          <p className="text-red-500">{errors.status}</p>
        ) : (
          <>
            <p className={`text-2xl font-bold ${status?.status === 'ok' ? 'text-green-600' : 'text-red-500'}`}>
              {status?.status === 'ok' ? '✅ Fonctionnel' : '❌ Injoignable'}
            </p>
            <p className="text-sm text-gray-500 mt-2">Ping : {new Date(status?.timestamp).toLocaleString()}</p>
          </>
        )}
      </div>

      {/* Statut Bots */}
      <div
        className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
        onClick={() => navigate('/bots')}
      >
        <h3 className="text-xl font-semibold mb-2">🤖 Bots actifs</h3>
        {errors.bots ? (
          <p className="text-red-500">{errors.bots}</p>
        ) : (
          <>
            <p className="text-3xl font-bold mb-4">{bots.length}</p>
            <p className="text-gray-600">Cliquer pour voir la liste</p>
          </>
        )}
      </div>

      {/* Prédictions IA */}
      <div
        className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
        onClick={() => navigate('/predictions')}
      >
        <h3 className="text-xl font-semibold mb-2">🔮 Prédictions IA</h3>
        {errors.predictions ? (
          <p className="text-red-500">{errors.predictions}</p>
        ) : (
          <ul className="text-gray-700 space-y-1">
            {predictions.slice(0, 4).map((p, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{p.symbol}</span>
                <span className={p.prediction === 'UP' ? 'text-green-600' : 'text-red-500'}>
                  {p.prediction}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
