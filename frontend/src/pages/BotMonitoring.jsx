// File: frontend/src/pages/BotMonitoring.jsx
// 🤖 Affiche le statut de fonctionnement du bot_service (stratégie, état…)

import { useEffect, useState } from 'react';
import api from '@/services/api';
import Loader from '../components/Loader';

export default function BotMonitoring() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getStatus()
      .then((res) => setStatus(res.data))
      .catch(() => setError('Impossible de charger le statut du bot.'));
  }, []);

  if (!status && !error) return <Loader />;

  return (
    <div>
      <h2 className="text-2xl mb-4">📊 Statut du bot</h2>
      {error && <div className="text-red-500">{error}</div>}
      {status && (
        <ul className="bg-white rounded shadow p-4 space-y-2">
          {Object.entries(status).map(([k, v]) => (
            <li key={k}>
              <strong>{k.replace(/_/g, ' ')} :</strong> {String(v)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
