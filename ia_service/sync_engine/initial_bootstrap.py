# File: ia_service/sync_engine/initial_bootstrap.py

# ia_service/sync_engine/initial_bootstrap.py

from database.session import engine, SessionLocal
import database.models           # ← pour que SQLAlchemy connaisse tous les modèles
import database.crud as crud

def run():
    # Création de TOUTES les tables déclarées sous database/models.py
    from database.models import Base
    Base.metadata.create_all(bind=engine)

    # Initialisation / peuplement éventuel de la DB
    crud.init_db(SessionLocal())

    print("✅ Initial bootstrap terminé : tables créées et données initiales.")


# ✅ Ajout de l’alias attendu par main.py
initialize_service = run