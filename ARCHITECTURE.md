# Architecture du projet "Trading Bot ByBit"

Ce projet est structuré en microservices avec les services suivants :

## 🔹 `bot_service/`
Service de gestion des stratégies de trading (DCA, scalping...).

- Connexion à `bot_db` (PostgreSQL)
- Gestion du portefeuille, historique de trade
- Stratégies pluggables

## 🔷 `ia_service/`
Service d’analyse IA et prédiction.

- Connexion à `ia_db` (PostgreSQL)
- Récupération OHLCV
- Analyse + prédiction via modèles intégrés
- API FastAPI exposée

## 🧠 `redis`
Utilisé comme broker de communication/stockage temporaire.

## 🖥️ `frontend/`
Dashboard React pour monitoring :

- Visualisation des bots
- Statut de l’IA
- Affichage des prédictions
- Affichage des soldes

## 🔧 Fichiers utilitaires :

- `manage.sh` : script de build & démarrage séquentiel
- `export_projet.sh` : export complet (arborescence + contenu)
- `.env` : configuration globale
- `docker-compose.yml` : orchestration des services
