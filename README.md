✅ README.md — Projet trading-bot-bybit

📌 Présentation
Ce projet est une suite d'applications modulaires :
- ia_service : moteur d’analyse technique + prédiction
- bot_service : bots de trading autonome
- frontend : dashboard React
- docker-compose : orchestration

📦 Structure
├── bot_service/
├── ia_service/
├── frontend/
├── docker-compose.yml
├── manage.sh
├── .env

⚙️ Prérequis
- Docker ≥ v28
- Docker Compose Plugin ≥ v2.36

🔧 Configuration
1. Copier `.env`
2. Renseigner API Bybit, BDD, paires…

🚀 Lancement
./manage.sh build  
./manage.sh start  

🛠️ Utilitaires
- ./manage.sh stop
- ./manage.sh logs

📬 API IA dispo sur :
http://localhost:8000/docs

Endpoints utiles :
- GET /status
- GET /predictions/{pair}
- GET /models
