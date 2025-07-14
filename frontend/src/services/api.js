//--- File: frontend/src/services/api.js ---

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
});

export default {
  // 🔮 Prédictions générées par l’IA
  getPredictions: () => api.get('/predictions'),

  // ✅ Statut du service IA (version simple)
  getStatus: () => api.get('/status'),

  // ✅ Statut du service IA (version détaillée/health)
  getIaStatus: () => api.get('/status/health'),

  // 🧮 Solde des wallets (exchange)
  getBalances: () => api.get('/assets/balance'),

  // 🤖 Liste des bots de trading
  getBots: () => api.get('/bots'),
};
