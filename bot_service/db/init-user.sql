-- 🔐 Création du rôle userbot si non existant
DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles WHERE rolname = 'userbot'
   ) THEN
      CREATE ROLE userbot LOGIN PASSWORD 'passbot';
   END IF;
END
$$;

-- 🗃️ Création de la base bot_db si non existante
DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database WHERE datname = 'bot_db'
   ) THEN
      CREATE DATABASE bot_db OWNER userbot;
   END IF;
END
$$;
