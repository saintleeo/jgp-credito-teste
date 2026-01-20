# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Caminho do banco (SQLite cria o arquivo automaticamente se não existir)
SQLALCHEMY_DATABASE_URL = "sqlite:///../data/jgp_credito.db"

# O engine é quem manda os comandos para o arquivo .db
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# A SessionLocal é a fábrica de conexões que usaremos nas rotas
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)