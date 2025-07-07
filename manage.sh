#!/usr/bin/env bash
set -e

# Détecte docker-compose ou docker compose
if command -v docker-compose &>/dev/null; then
  DC="docker-compose"
elif docker compose version &>/dev/null; then
  DC="docker compose"
else
  echo "❌ ni 'docker-compose' ni 'docker compose' introuvable. Installez Docker Compose."
  exit 1
fi

case "$1" in
  build)
    echo "📦 Reconstruction des conteneurs..."
    $DC down --volumes --remove-orphans
    $DC build

    echo "🚀 Démarrage des services de base..."
    $DC up -d bot_db ia_db redis
    echo "⏳ Attente de l'initialisation des bases..."
    sleep 10

    echo "🧠 Lancement de ia_service..."
    $DC up -d ia_service
    echo "⏳ Attente IA service..."
    sleep 10

    echo "🤖 Lancement de bot_service..."
    $DC up -d bot_service
    echo "⏳ Attente Bot service..."
    sleep 10

    echo "🖥️ Lancement du frontend..."
    $DC up -d frontend

    echo "✅ Tous les services sont lancés."
    ;;
  start)
    echo "🚀 Démarrage des services..."
    $DC up -d
    ;;
  stop)
    echo "🛑 Arrêt des services..."
    $DC down
    ;;
  logs)
    echo "📄 Suivi des logs…"
    $DC logs -f
    ;;
  *)
    echo "Usage: manage.sh {build|start|stop|logs}"
    exit 1
    ;;
esac
