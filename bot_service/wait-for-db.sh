#!/usr/bin/env bash
set -e

HOST="$1"
shift

echo "⏳ Waiting for PostgreSQL at $HOST:5432..."
until nc -z "$HOST" 5432; do
  echo "⏱️  Still waiting..."
  sleep 1
done

echo "✅ PostgreSQL is up! Continuing..."
exec "$@"
